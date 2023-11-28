const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const moment = require('moment')
const bookingSchema = require('./models/guestRoom')
const userSchema = require('./models/userSchema')
const { emailToIndentorForOTP } = require('./mailing/emailToIndentForOTP')
const validEmail  = require('./important_data/validEmailLogin')
const { sendForgetPasswordMail } = require('./mailing/sendForgetPasswordMail')
const { emailToNotifyWarden } = require('./mailing/emailToNotifyWarden')
const emailOwner = require('./important_data/emailOwner')

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
        const arrivalDate = req.body.arrivalDate
        const departureDate = req.body.departureDate

        console.log(arrivalDate);
        console.log(departureDate);

        // check dates if available
        const allBookings = await bookingSchema.find({})

        var isRoomsAvailable = true;

        allBookings.map((eachBooking) => {
            if (arrivalDate > eachBooking.checkArrivalDate && arrivalDate < eachBooking.checkDepartureDate) {
                isRoomsAvailable = false
            }
        })

        // if(isRoomsAvailable){
        //     res.json({
        //         success:true,

        //     })
        // }

        const readable_arrivalDate = moment(arrivalDate).format('DD/MM/YYYY')
        const readable_departureDate = moment(departureDate).format('DD/MM/YYYY')


        res.json({
            success: true,
            arrivalDate: readable_arrivalDate,
            departureDate: readable_departureDate
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

        var data = new bookingSchema({
            indentorDetails: {
                name, roll, email, phone
            },
            numberOfPersons: no_person_global,
            totalCost: "100",
            bookingId: Math.floor(100000 + Math.random() * 900000),
            purposeOfVisit: purpose_global,
            arrivalDate: checkArrivalDate,
            departureDate: checkDepartureDate,
            roomDetails: {
                roomNo: room_no_global,
                roomType: room_type_global==="R2"?"Double Bed":"Triple Bed"
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

                emailToIndentorForOTP(name, otp, email)

                res.json({
                    success: true,
                    id:newData._id,
                    message:"Please check your email, for OTP"
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

app.post('/checkOTP', async(req,res)=>{
    try {

        const { otp_password, requestId } = req.body
        const checkData = await bookingSchema.findById(requestId)

        if(checkData){
            if(checkData.OTP.value===otp_password){
                const time1 = new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZZ"))
                const time2 = new Date(moment(checkData.OTP.expiryTime).format("YYYY-MM-DDTHH:mm:ssZZ"))
                if(time2>=time1){

                    console.log(emailOwner);

                    emailToNotifyWarden(emailOwner[0].email)

                    res.json({
                        success: true,
                        message: "Your request is pending for warden approval. Once approved you will be notified via email."
                    })

                }else{
                    res.json({
                        success: false,
                        message: "Time for the OTP expired"
                    })
                }
            }else{
                res.json({
                    success: false,
                    message: "Incorrect OTP"
                })
            }
        }else{
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

const checkValidEmailLogin = (email) =>{
    var res = false;

    validEmail.map((mail)=>{
        if(mail===email){
            res = true
        }
    })

    return res
}

app.post('/login',async (req,res)=>{
    try {
        const { email, password } = req.body;

        if(checkValidEmailLogin(email)){

            const ifSignUp = await userSchema.findOne({email:email})

            if(ifSignUp){

                if(ifSignUp.password===password){

                    res.json({
                        success:true,
                        message:"Login successfully",
                        id:ifSignUp._id,
                        role:ifSignUp.role
                    })
                }else{
                    res.json({
                        success:false,
                        message:"Invalid credentials"
                    }) 
                }

            }else{


                if(password.trim().length<6){
                    return res.json({
                        success:false,
                        message:"Choose another password with minumum length of"
                    })
                }

                var role = ""

                if(email === emailOwner[0].email){
                    role = "warden"
                }

                if(email === emailOwner[1].email){
                    role = "hall_office"
                }

                const data = new userSchema({email,password,role})
                const result =  await data.save()

                res.json({
                    success:true,
                    message:"Login successfully",
                    id:result._id,
                    role:result.role
                })

            }

        }else{
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

app.post('/forgetPasword',async (req,res)=>{
    try {

        const {email} = req.body;

        // console.log(req.body);

        if(checkValidEmailLogin(email)){

            const result = await userSchema.findOne({email:email})

            // console.log(result);

            if(result){
        
                result.OTP.value = Math.floor(100000 + Math.random() * 900000)
                result.OTP.expiryTime = moment(Date.now()).add(10, 'm').toDate();

                const newData = await result.save()

                if(newData){
                    
                    sendForgetPasswordMail(newData.OTP.value,email)

                    res.json({
                        success:true,
                        message:"Please check your email for OTP"
                    })

                }else{
                    res.json({
                        success: false,
                        message: "Error Occured"
                    })
                }

            }else{
                res.json({
                    success: false,
                    message: "Email not registered"
                })
            }

        }else{
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

app.post('/validateOTP',async(req,res)=>{
    try {

        const {otp,email} = req.body;

        const userExist = await userSchema.findOne({email});

        if(userExist){

            if(userExist.OTP.value===otp){
                const time1 = new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZZ"))
                const time2 = new Date(moment(userExist.OTP.expiryTime).format("YYYY-MM-DDTHH:mm:ssZZ"))
                if(time2>=time1){

                    userExist.OTP.value = null
                    userExist.OTP.expiryTime = null

                    await userExist.save()

                    res.json({
                        success: true,
                    })

                }else{
                    res.json({
                        success: false,
                        message: "Time for the OTP expired"
                    })
                }
            }else{
                res.json({
                    success: false,
                    message: "Incorrect OTP"
                })
            }

        }else{
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

app.post('/passwordChange',async(req,res)=>{
    try {

        const {newPassword,email} = req.body;

        if(newPassword.trim().length<6){
            return res.json({
                success:false,
                message:"Choose another password with minumum length of 6 with no spaces"
            })
        }

        const userExist = await userSchema.findOne({email})

        if(userExist){

            userExist.password = newPassword

            await userExist.save();

            res.json({
                success: true,
                message: "Password changed successfully"
            })

        }else{
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


app.post('/setPassword',async(req,res)=>{
    try {

        const {newPassword, id} = req.body;

        if(newPassword.trim().length<6){
            return res.json({
                success:false,
                message:"Choose another password with minumum length of 6 with no spaces"
            })
        }

        const userExist = await userSchema.findById(id)

        if(userExist){

            userExist.OTP.value = Math.floor(100000 + Math.random() * 900000)
            userExist.OTP.expiryTime = moment(Date.now()).add(10, 'm').toDate();

            const newData =  await userExist.save();

            sendForgetPasswordMail(newData.OTP.value,newData.email)

            res.json({
                success: true,
                message: "Please check your email for OTP"
            })

        }else{
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


app.post('/setPasswordValidateOTP',async(req,res)=>{
    try {

        const {otp,id, newPassword} = req.body;

        const userExist = await userSchema.findById(id);

        if(userExist){

            if(userExist.OTP.value===otp){
                const time1 = new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZZ"))
                const time2 = new Date(moment(userExist.OTP.expiryTime).format("YYYY-MM-DDTHH:mm:ssZZ"))
                if(time2>=time1){

                    userExist.OTP.value = null
                    userExist.OTP.expiryTime = null
                    userExist.password = newPassword

                    await userExist.save()

                    res.json({
                        success: true,
                        message:"Password Changed Successfully"
                    })

                }else{
                    res.json({
                        success: false,
                        message: "Time for the OTP expired"
                    })
                }
            }else{
                res.json({
                    success: false,
                    message: "Incorrect OTP"
                })
            }

        }else{
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

app.post('/fetchData',async(req,res)=>{
    try {

        const allData = await bookingSchema.find({})

        if(allData){
            res.json({
                success: true,
                allData: allData
            })
        }else{
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




