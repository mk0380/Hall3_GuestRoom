const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const moment = require('moment')
const bookingSchema = require('./models/guestRoom')
const userSchema = require('./models/userSchema')
const { emailToIndentorForOTP } = require('./mailing/emailToIndentForOTP')
const validEmail = require('./important_data/validEmailLogin')
const { sendForgetPasswordMail } = require('./mailing/sendForgetPasswordMail')
const { emailToNotifyWarden } = require('./mailing/emailToNotifyWarden')
const emailOwner = require('./important_data/emailOwner')
const roomRates = require('./important_data/roomRates')
const { rejectionEmail } = require('./mailing/rejectionEmail')
const { approvalEmail } = require('./mailing/approvalEmail')

// git add . git commit -m "" git push 


const app = express();
env.config({})

app.use(cors())

// Without `express.json()`, `req.body` is undefined.
app.use(express.json())

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started...");
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected...");
}).catch((err) => {
    console.log("Error occured while connecting to Database :" + err.message);
})


app.post('/checkDates', async (req, res) => {
    try {

        const arrivalDate = moment(req.body.arrivalDate);
        const departureDate = moment(req.body.departureDate);

        var colorList = []

        var dates = []

        // const allBookings = await bookingSchema.find({});

        const allBookings = [{ arrivalDate: "08/12/2023", approvalLevel: "1", departureDate: "15/12/2023", roomDetails: { roomNo: "112" } }, { arrivalDate: "15/12/2023", approvalLevel: "3", departureDate: "16/12/2023", roomDetails: { roomNo: "113" } }]

        const arrivalDates = allBookings.map(booking => booking.arrivalDate);
        const departureDates = allBookings.map(booking => booking.departureDate);
        const roomNos = allBookings.map(booking => booking.roomDetails.roomNo);
        const approvalLevel = allBookings.map(booking => booking.approvalLevel);

        console.log(arrivalDates)
        console.log(departureDates)
        console.log(roomNos)
        console.log(approvalLevel)

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
                                color[0] = 0
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[0] = -1
                            }
                        }

                        if(roomNos[index] == "110"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[1] = 0
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[1] = -1
                            }
                        }

                        if(roomNos[index] == "111"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[2] = 0
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[2] = -1
                            }
                        }

                        if(roomNos[index] == "112"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[3] = 0
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[3] = -1
                            }
                        }

                        if(roomNos[index] == "113"){
                            if(approvalLevel[index]=="1" || approvalLevel[index]=="2"){
                                color[4] = 0
                            }
                            else if(approvalLevel[index]=="3" || approvalLevel[index]=="4"){
                                color[4] = -1
                            }
                        }
                    }
            }
            // console.log(date+"--"+color);
            colorList.push(color)
            arrivalDate.add(1, 'day');
        }

        console.log(dates);

        for (let index = 0; index < 7-dates.length; index++) {
            dates.push(["1","1","1","1","1"])
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
})


app.post('/details', async (req, res) => {
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
})

app.post('/checkOTP', async (req, res) => {
    try {

        const { otp_password, requestId } = req.body
        const checkData = await bookingSchema.findById(requestId)

        if (checkData) {
            if (checkData.OTP.value === otp_password) {
                const time1 = new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZZ"))
                const time2 = new Date(moment(checkData.OTP.expiryTime).format("YYYY-MM-DDTHH:mm:ssZZ"))
                if (time2 >= time1) {

                    checkData.approvalLevel = "1"
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
})

const checkValidEmailLogin = (email) => {
    var res = false;

    validEmail.map((mail) => {
        if (mail === email) {
            res = true
        }
    })

    return res
}

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (checkValidEmailLogin(email)) {

            const ifSignUp = await userSchema.findOne({ email: email })

            if (ifSignUp) {

                if (ifSignUp.password === password) {

                    res.json({
                        success: true,
                        message: "Login successfully",
                        id: ifSignUp._id,
                        role: ifSignUp.role
                    })
                } else {
                    res.json({
                        success: false,
                        message: "Invalid credentials"
                    })
                }

            } else {


                if (password.trim().length < 6) {
                    return res.json({
                        success: false,
                        message: "Choose another password with minumum length of"
                    })
                }

                var role = ""

                if (email === emailOwner[0].email) {
                    role = "warden"
                }

                if (email === emailOwner[1].email) {
                    role = "hall_office"
                }

                const data = new userSchema({ email, password, role })
                const result = await data.save()

                res.json({
                    success: true,
                    message: "Login successfully",
                    id: result._id,
                    role: result.role
                })

            }

        } else {
            res.json({
                success: false,
                message: "Email not authorised"
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})

app.post('/forgetPasword', async (req, res) => {
    try {

        const { email } = req.body;

        if (checkValidEmailLogin(email)) {

            const result = await userSchema.findOne({ email: email })

            if (result) {

                result.OTP.value = Math.floor(100000 + Math.random() * 900000)
                result.OTP.expiryTime = moment(Date.now()).add(10, 'm').toDate();

                const newData = await result.save()

                if (newData) {

                    sendForgetPasswordMail(newData.OTP.value, email)

                    res.json({
                        success: true,
                        message: "Please check your email for OTP"
                    })

                } else {
                    res.json({
                        success: false,
                        message: "Error Occured"
                    })
                }

            } else {
                res.json({
                    success: false,
                    message: "Email not registered"
                })
            }

        } else {
            res.json({
                success: false,
                message: "Email not authorised"
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})

app.post('/validateOTP', async (req, res) => {
    try {

        const { otp, email } = req.body;

        const userExist = await userSchema.findOne({ email });

        if (userExist) {

            if (userExist.OTP.value === otp) {
                const time1 = new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZZ"))
                const time2 = new Date(moment(userExist.OTP.expiryTime).format("YYYY-MM-DDTHH:mm:ssZZ"))
                if (time2 >= time1) {

                    userExist.OTP.value = null
                    userExist.OTP.expiryTime = null

                    await userExist.save()

                    res.json({
                        success: true,
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
                message: "Unauthorised User"
            })
        }


    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})

app.post('/passwordChange', async (req, res) => {
    try {

        const { newPassword, email } = req.body;

        if (newPassword.trim().length < 6) {
            return res.json({
                success: false,
                message: "Choose another password with minumum length of 6 with no spaces"
            })
        }

        const userExist = await userSchema.findOne({ email })

        if (userExist) {

            userExist.password = newPassword

            await userExist.save();

            res.json({
                success: true,
                message: "Password changed successfully"
            })

        } else {
            res.json({
                success: false,
                message: "Unauthorised User"
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})


app.post('/setPassword', async (req, res) => {
    try {

        const { newPassword, id } = req.body;

        if (newPassword.trim().length < 6) {
            return res.json({
                success: false,
                message: "Choose another password with minumum length of 6 with no spaces"
            })
        }

        const userExist = await userSchema.findById(id)

        if (userExist) {

            userExist.OTP.value = Math.floor(100000 + Math.random() * 900000)
            userExist.OTP.expiryTime = moment(Date.now()).add(10, 'm').toDate();

            const newData = await userExist.save();

            sendForgetPasswordMail(newData.OTP.value, newData.email)

            res.json({
                success: true,
                message: "Please check your email for OTP"
            })

        } else {
            res.json({
                success: false,
                message: "Unauthorised User"
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})


app.post('/setPasswordValidateOTP', async (req, res) => {
    try {

        const { otp, id, newPassword } = req.body;

        const userExist = await userSchema.findById(id);

        if (userExist) {

            if (userExist.OTP.value === otp) {
                const time1 = new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZZ"))
                const time2 = new Date(moment(userExist.OTP.expiryTime).format("YYYY-MM-DDTHH:mm:ssZZ"))
                if (time2 >= time1) {

                    userExist.OTP.value = null
                    userExist.OTP.expiryTime = null
                    userExist.password = newPassword

                    await userExist.save()

                    res.json({
                        success: true,
                        message: "Password Changed Successfully"
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
                message: "Unauthorised User"
            })
        }


    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})

app.post('/fetchData', async (req, res) => {
    try {

        var allData = await bookingSchema.find({})

        for (let index = 0; index < allData.length; index++) {
            allData[index].totalCost = "₹" + parseInt(Math.ceil(allData[index].totalCost * 0.1)) + " + " + "₹" + parseInt(allData[index].totalCost - parseInt(Math.ceil(allData[index].totalCost * 0.1)))

            allData[index].status = allData[index].approvalLevel === "-1" ? "Rejected" : allData[index].approvalLevel === "2" ? "" : allData[index].approvalLevel === "3" ? "Payment 1 Done" : allData[index].approvalLevel === "4" ? "Paid" : ""
        }

        console.log(allData);

        if (allData) {
            res.json({
                success: true,
                allData: allData
            })
        } else {
            res.json({
                success: false,
                message: "Some error occured fetching data"
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})

app.post('/wardenApproval', async (req, res) => {
    try {

        const { booking_id } = req.body;

        const bookingData = await bookingSchema.findOneAndUpdate({ bookingId: booking_id }, { approvalLevel: "2" })

        if (bookingData) {

            approvalEmail(bookingData.indentorDetails.email, parseInt(Math.ceil(bookingData.totalCost * 0.1)), bookingData.indentorDetails.name, bookingData.bookingId)

            res.json({
                success: true,
                message: "Request approved"
            })
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
})

app.post('/wardenRejection', async (req, res) => {
    try {

        const { booking_id, reason } = req.body;

        const bookingData = await bookingSchema.findOneAndUpdate({ bookingId: booking_id }, { approvalLevel: "-1", rejectionReason: reason })

        if (bookingData) {

            rejectionEmail(bookingData.indentorDetails.email, reason, bookingData.indentorDetails.name, bookingData.bookingId)

            res.json({
                success: true,
                message: "Request rejected"
            })
        } else {
            res.json({
                success: false,
                meessage: "Some error occured"
            })
        }


    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
})

app.post('/hallApproval', async (req, res) => {
    try {

        const { booking_id } = req.body;

        const extractData = await bookingSchema.findOne({ bookingId: booking_id })

        console.log(extractData);
        console.log("BKJBMJNKJ");

        var bookingData = null

        if (extractData.approvalLevel === "2") {
            console.log(extractData.approvalLevel);
            bookingData = await bookingSchema.findOneAndUpdate({ bookingId: booking_id }, { approvalLevel: "3" })
        } else {
            console.log(extractData.approvalLevel);
            bookingData = await bookingSchema.findOneAndUpdate({ bookingId: booking_id }, { approvalLevel: "4", paid: true })
        }

        if (bookingData) {
            res.json({
                success: true,
                message: "Payment Updated"
            })
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
})





