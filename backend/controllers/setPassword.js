const { sendForgetPasswordMail } = require("../mailing/sendForgetPasswordMail");
const userSchema = require('../models/userSchema')
const moment = require('moment')

exports.setPassword = async(req,res)=>{
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
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}