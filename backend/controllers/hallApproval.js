const bookingSchema = require('../models/guestRoom')

exports.hallApproval = async (req,res) =>{
    try {

        const { booking_id } = req.body;

        const extractData = await bookingSchema.findOne({ bookingId: booking_id })

        var bookingData = null

        if (extractData.approvalLevel === "2") {
            bookingData = await bookingSchema.findOneAndUpdate({ bookingId: booking_id }, { approvalLevel: "3" })
        } else {
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
}