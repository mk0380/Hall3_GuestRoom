const roomRates = require("../important_data/roomRates");
const { emailToIndentorForOTP } = require("../mailing/emailToIndentForOTP");
const bookingSchema = require('../models/guestRoom')
const moment = require('moment')


exports.details = async(req,res)=>{
    try {

        const { name, phone, roll, email, no_person_global, name1_global, name2_global, name3_global, mobile1_global, mobile2_global, mobile3_global, purpose_global, relationship1_global, relationship2_global, relationship3_global, room_type_global, room_no_global, checkArrivalDate, checkDepartureDate } = req.body

        const roomPrice = roomRates.filter((room) => room.roomNo === room_no_global)

        const date1 = moment(checkArrivalDate, 'DD/MM/YYYY').toISOString();
        const date2 = moment(checkDepartureDate, 'DD/MM/YYYY').toISOString();
        const numOfDaysStay = moment(date2).diff(moment(date1), 'days') + 1;

        var data = new bookingSchema({
            indentorDetails: {
                name, roll, email, phone
            },
            numberOfPersons: no_person_global,
            totalCost: roomPrice[0].roomPrice * numOfDaysStay,
            bookingId: Math.floor(100000 + Math.random() * 900000),
            purposeOfVisit: purpose_global,
            arrivalDate: checkArrivalDate,
            departureDate: checkDepartureDate,
            roomDetails: {
                roomNo: room_no_global,
                roomType: room_type_global === "R2" ? "Double Bed" : "Triple Bed"
            },
            visitorDetails: [
                {
                    name: name1_global,
                    relationship: relationship1_global,
                    phone: mobile1_global
                }, {
                    name: name2_global,
                    relationship: relationship2_global,
                    phone: mobile2_global
                }, {
                    name: name3_global,
                    relationship: relationship3_global,
                    phone: mobile3_global
                }
            ]
        })

        const result = await data.save()

        if (result) {
            const otp = Math.floor(100000 + Math.random() * 900000)
            const expiry_time = moment(Date.now()).add(10, 'm').toDate();  // 10 minutes for otp entry

            data.OTP.value = otp
            data.OTP.expiryTime = expiry_time

            const newData = await data.save()

            if (newData) {

                emailToIndentorForOTP(name, otp, email, bookingId)

                res.json({
                    success: true,
                    id: newData._id,
                    message: "Please check your email, for OTP"
                })

            } else {
                res.json({
                    success: false,
                    message: "Some Error Occured"
                })
            }
        } else {
            res.json({
                success: false,
                message: "Some Error Occured"
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}