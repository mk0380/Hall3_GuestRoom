const mongoose  = require('mongoose')

const gusetRoomSchema  = mongoose.Schema({
    requestedAt:{
        type:Date,
        default:Date.now
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
    },
    numberOfPersons:{
        type:String
    },
    totalCost:{
        type:String
    },
    paid:{
        type:Boolean,
        default:false
    },
    purposeOfVisit:{
        type:String
    },
    arrivalDate:{
        type:String
    },
    departureDate:{
        type:String
    },
    roomDetails:{
        roomNo:{
            type:String
        },
        roomType:{
            type:String
        }
    },
    indentorDetails:{
        name:{
            type:String
        },
        roll:{
            type:String
        },
        email:{
            type:String
        },
        phone:{
            type:String
        }
    },
    visitorDetails:[
        {
            name:{
                type:String
            },
            relationship:{
                type:String
            },
            phone:{
                type:String
            }
        }
    ]
})

const guestRoom = mongoose.model('Detail',gusetRoomSchema)

module.exports = guestRoom