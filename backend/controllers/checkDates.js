const bookingSchema = require('../models/guestRoom')
const moment = require('moment')

exports.checkDates = async(req,res)=>{
    try {

        const arrivalDate = moment(req.body.arrivalDate);
        const departureDate = moment(req.body.departureDate);

        var colorList = []

        var dates = []

        // const allBookings = await bookingSchema.find({});

        const allBookings = [{ arrivalDate: "12/12/2023", approvalLevel: "1", departureDate: "17/12/2023", roomDetails: { roomNo: "112" } }, { arrivalDate: "16/12/2023", approvalLevel: "3", departureDate: "18/12/2023", roomDetails: { roomNo: "113" } }]

        const arrivalDates = allBookings.map(booking => booking.arrivalDate);
        const departureDates = allBookings.map(booking => booking.departureDate);
        const roomNos = allBookings.map(booking => booking.roomDetails.roomNo);
        const approvalLevel = allBookings.map(booking => booking.approvalLevel);

        while (arrivalDate.isSameOrBefore(departureDate)) {
            const date = arrivalDate.format("DD/MM/YYYY");
            var color = ["1", "1", "1", "1", "1"]

            dates.push(date.substring(0,date.length-4)+date.substring(date.length-2,date.length))

            for (let index = 0; index < arrivalDates.length; index++) {

                const formattedArrivalDate = moment(arrivalDates[index], 'DD/MM/YYYY', true);
                const formattedDepartureDate = moment(departureDates[index], 'DD/MM/YYYY', true);
                const formattedDate = moment(date, 'DD/MM/YYYY', true);
                
                const isWithinRange = formattedArrivalDate.isValid() && formattedDate.isValid() && formattedDepartureDate.isValid() && formattedArrivalDate.isSameOrBefore(formattedDate) && formattedDepartureDate.isSameOrAfter(formattedDate);

                    // console.log(isWithinRange1);

                    if(isWithinRange){
                        if(roomNos[index] == "109"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[0] = "0"
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[0] = "-1"
                            }
                        }

                        if(roomNos[index] == "110"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[1] = "0"
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[1] = "-1"
                            }
                        }

                        if(roomNos[index] == "111"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[2] = "0"
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[2] = "-1"
                            }
                        }

                        if(roomNos[index] == "112"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[3] = "0"
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[3] = "-1"
                            }
                        }

                        if(roomNos[index] == "113"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[4] = "0"
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[4] = "-1"
                            }
                        }
                    }
            }
            colorList.push(color)
            arrivalDate.add(1, 'day');
        }

        res.json({
            success: true,
            arrivalDate: moment(req.body.arrivalDate).format("DD/MM/YYYY"),
            departureDate: moment(req.body.departureDate).format("DD/MM/YYYY"),
            color:colorList,
            dates
        })

    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}