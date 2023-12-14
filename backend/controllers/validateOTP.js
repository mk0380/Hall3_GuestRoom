const userSchema = require('../models/userSchema')
const moment = require('moment')

exports.validateOTP = async(req,res)=>{
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
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}