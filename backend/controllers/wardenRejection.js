const { rejectionEmail } = require('../mailing/rejectionEmail');
const bookingSchema = require('../models/guestRoom')


exports.wardenRejection =async (req,res)=>{
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
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}