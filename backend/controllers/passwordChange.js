const userSchema = require('../models/userSchema')
const bcrypt = require('bcryptjs')

const bcryptPassword = async (password)=>{
    return await bcrypt.hash(password,10)
}

exports.passwordChange =async (req,res)=>{
    try {

        const { newPassword, email } = req.body;

        if (newPassword.trim().length < 6) {
            return res.json({
                success: false,
                message: "Choose another password with minumum length of 6"
            })
        }

        const userExist = await userSchema.findOne({ email })

        if (userExist) {

            userExist.password = await bcryptPassword(newPassword)

            await userExist.save();

            res.json({
                success: true,
                message: "Password changed successfully"
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