const { emailToNotifyWarden } = require("../mailing/emailToNotifyWarden")
const bookingSchema = require('../models/guestRoom')
const moment = require('moment')
const emailOwner = require('../important_data/emailOwner')

exports.checkOTP = async (req, res) => {
    try {

        const { otp_password, requestId, room_no_global, arrivalDate, departureDate } = req.body

        const checkData = await bookingSchema.findById(requestId)

        if (checkData) {
            if (checkData.OTP.value === otp_password) {
                const time1 = new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZZ"))
                const time2 = new Date(moment(checkData.OTP.expiryTime).format("YYYY-MM-DDTHH:mm:ssZZ"))
                if (time2 >= time1) {

                    const arrival_date = moment(arrivalDate, 'DD/MM/YYYY')
                    const departure_date = moment(departureDate, 'DD/MM/YYYY')

                    const allBookings = await bookingSchema.find({}).select(['arrivalDate', 'departureDate', 'roomDetails', 'approvalLevel']);


                    const arrivalDates = allBookings.map(booking => booking.arrivalDate);
                    const departureDates = allBookings.map(booking => booking.departureDate);
                    const roomNos = allBookings.map(booking => booking.roomDetails.roomNo);
                    const approvalLevel = allBookings.map(booking => booking.approvalLevel);

                    while (arrival_date.isSameOrBefore(departure_date)) {
                        const date = arrival_date.format("DD/MM/YYYY");
                        for (let index = 0; index < arrivalDates.length; index++) {

                            const formattedArrivalDate = moment(arrivalDates[index], 'DD/MM/YYYY', true);
                            const formattedDepartureDate = moment(departureDates[index], 'DD/MM/YYYY', true);
                            const formattedDate = moment(date, 'DD/MM/YYYY', true);

                            const isWithinRange = formattedArrivalDate.isValid() && formattedDate.isValid() && formattedDepartureDate.isValid() && formattedArrivalDate.isSameOrBefore(formattedDate) && formattedDepartureDate.isSameOrAfter(formattedDate) && roomNos[index] === room_no_global && (approvalLevel[index] === '1' || approvalLevel[index] === '2' || approvalLevel[index] === '3' || approvalLevel[index] === '4');

                            if (isWithinRange) {
                                return res.json({
                                    success: false,
                                    message: "Dates already booked by someone else. Please choose another"
                                })
                            }

                        }
                        arrival_date.add(1, 'day');
                    }

                    checkData.approvalLevel = "1"
                    checkData.OTP.value = null,
                    checkData.OTP.expiryTime = null

                    await checkData.save()

                    emailToNotifyWarden(emailOwner[0].email)

                    res.json({
                        success: true,
                        message: "Your request is pending for warden approval. Once approved you will be notified via email."
                    })

                } else {
                    res.json({
                        success: false,
                        message: "Time for the OTP expired"
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Incorrect OTP"
                })
            }
        } else {
            res.json({
                success: false,
                message: "Some error occured"
            })
        }


    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}