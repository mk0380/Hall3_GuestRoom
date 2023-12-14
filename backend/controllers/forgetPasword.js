const validEmail = require('../important_data/validEmailLogin');
const { sendForgetPasswordMail } = require('../mailing/sendForgetPasswordMail');
const userSchema = require('../models/userSchema')
const moment = require('moment')


const checkValidEmailLogin = (email) => {
    var res = false;

    validEmail.map((mail) => {
        if (mail === email) {
            res = true
        }
    })

    return res
}

exports.forgetPasword = async(req,res)=>{
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
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}