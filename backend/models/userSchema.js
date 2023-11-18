const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    OTP:{
        value:{
            type:String,
            default:null
        },
        expiryTime:{
            type:Date,
            default:null
        }
    }
})

const userModel = mongoose.model("User",userSchema)

module.exports = userModel