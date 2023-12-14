const validEmail = require("../important_data/validEmailLogin");
const userSchema = require('../models/userSchema')

const checkValidEmailLogin = (email) => {
    var res = false;

    validEmail.map((mail) => {
        if (mail === email) {
            res = true
        }
    })

    return res
}

exports.login = async(req,res)=>{
    try {
        const { email, password } = req.body;

        if (checkValidEmailLogin(email)) {

            const ifSignUp = await userSchema.findOne({ email: email })

            if (ifSignUp) {

                if (ifSignUp.password === password) {

                    res.json({
                        success: true,
                        message: "Login successfully",
                        id: ifSignUp._id,
                        role: ifSignUp.role
                    })
                } else {
                    res.json({
                        success: false,
                        message: "Invalid credentials"
                    })
                }

            } else {


                if (password.trim().length < 6) {
                    return res.json({
                        success: false,
                        message: "Choose another password with minumum length of"
                    })
                }

                var role = ""

                if (email === emailOwner[0].email) {
                    role = "warden"
                }

                if (email === emailOwner[1].email) {
                    role = "hall_office"
                }

                const data = new userSchema({ email, password, role })
                const result = await data.save()

                res.json({
                    success: true,
                    message: "Login successfully",
                    id: result._id,
                    role: result.role
                })

            }

        } else {
            res.json({
                success: false,
                message: "Email not authorised"
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