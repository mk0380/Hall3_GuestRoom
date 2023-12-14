const { emailToNotifyWarden } = require("../mailing/emailToNotifyWarden")
const bookingSchema = require('../models/guestRoom')
const moment = require('moment')

exports.checkOTP = async(req,res)=>{
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
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}