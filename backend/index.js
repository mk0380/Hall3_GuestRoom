const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const moment = require('moment')
const bookingSchema = require('./models/guestRoom')

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

        if(isRoomsAvailable){
            res.json({
                success:true,
                
            })
        }
    
        // const readable_arrivalDate = moment(arrivalDate).format('DD/MM/YYYY')
        // const readable_departureDate = moment(departureDate).format('DD/MM/YYYY')
    } catch (error) {
        res.json({
            success:false,
            message:"Some error occured"
        })
    }
})





