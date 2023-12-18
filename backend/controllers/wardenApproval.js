const { approvalEmail } = require("../mailing/approvalEmail");
const bookingSchema = require('../models/guestRoom')
const percentageCharged = 0.1

 exports.wardenApproval = async(req,res)=>{ 
      try {

        const { booking_id } = req.body;

        const bookingData = await bookingSchema.findOneAndUpdate({ bookingId: booking_id }, { approvalLevel: "2" })

        if (bookingData) {

            approvalEmail(bookingData.indentorDetails.email, parseInt(Math.ceil(bookingData.totalCost * percentageCharged)), bookingData.indentorDetails.name, bookingData.bookingId)

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
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}