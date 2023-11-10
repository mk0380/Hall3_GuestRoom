const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const moment = require('moment')
const bookingSchema = require('./models/guestRoom')
const { emailToIndentorForOTP } = require('./mailing/emailToIndentForOTP')

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


app.post('/checkDates',async (req,res)=>{
    try {
        const arrivalDate = req.body.arrivalDate
        const departureDate = req.body.departureDate

        console.log(arrivalDate);
        console.log(departureDate);

        // check dates if available
        const allBookings = await bookingSchema.find({})

        var isRoomsAvailable = true;

        allBookings.map((eachBooking)=>{
            if(arrivalDate>eachBooking.checkArrivalDate && arrivalDate<eachBooking.checkDepartureDate){
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
            success:true,
            arrivalDate:readable_arrivalDate,
            departureDate:readable_departureDate
        })

    } catch (error) {
        res.json({
            success:false,
            message:"Some error occured"
        })
    }
})


app.post('/details',async(req,res)=>{
    try {

        const { name, phone, roll, email, no_person_global,name1_global, name2_global, name3_global, mobile1_global, mobile2_global, mobile3_global,purpose_global,relationship1_global,relationship2_global,relationship3_global, room_type_global, room_no_global, checkArrivalDate,checkDepartureDate} = req.body

        var data = new bookingSchema ({
            indentorDetails:{
                name,roll,email,phone
            },
            numberOfPersons:no_person_global,
            totalCost:"100",
            purposeOfVisit:purpose_global,
            arrivalDate:checkArrivalDate,
            departureDate:checkDepartureDate,
            roomDetails:{
                roomNo:room_no_global,
                roomType:room_type_global
            },
            visitorDetails:[
                {name:name1_global,
                relationship:relationship1_global,
                phone:mobile1_global},{
                name:name2_global,
                relationship:relationship2_global,
                phone:mobile2_global
                },{
                name:name3_global,
                relationship:relationship3_global,
                phone:mobile3_global
                }
            ]
        })
        const res = await data.save()

        if(res){
            const otp = Math.floor(100000 + Math.random() * 900000)
            const expiry_time = moment(Date.now()).add(10, 'm').toDate();  // 10 minutes for otp entry

            data.OTP.value = otp
            data.OTP.expiryTime = expiry_time

            const newData = await data.save()

            if(newData){

                emailToIndentorForOTP()

            }else{
                res.json({
                    success:false,
                    message:"Some Error Occured"
                }) 
            }
        }else{
            res.json({
                success:false,
                message:"Some Error Occured"
            })
        }
        
    } catch (error) {
        res.json({
            success:false,
            message:"Some error occured"
        })  
    }
})





