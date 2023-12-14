const userSchema = require('../models/userSchema')

exports.passwordChange =async (req,res)=>{
    try {

        const { newPassword, email } = req.body;

        if (newPassword.trim().length < 6) {
            return res.json({
                success: false,
                message: "Choose another password with minumum length of 6 with no spaces"
            })
        }

        const userExist = await userSchema.findOne({ email })

        if (userExist) {

            userExist.password = newPassword

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