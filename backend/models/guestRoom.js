const mongoose  = require('mongoose')

const gusetRoomSchema  = mongoose.Schema({
    requestedAt:{
        type:Date,
        default:Date.now
    },
    confirmedAt:{
        type:Date
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
    checkArrivalDate:{
        type:Date
    },
    checkDepartureDate:{
        type:Date
    },
    roomDetails:{
        roomNo:{
            type:String
        },
        arrivalDate:{
            type:String
        },
        departureDate:{
            type:String
        }
    },
    indentorDetails:{
        name:{
            type:String
        },
        rollNo:{
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