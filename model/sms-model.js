
const mongoose = require("mongoose")
const schema = mongoose.Schema

const smsSchema = new schema({
    number: {
        type: Number
    },
    otp: {
        type: String
    },
    status: {
        type: String,
        default: "not verified",
        enum: ["verified", "not verified"]
    }
})


const smsDb = mongoose.model("sms", smsSchema)
module.exports = smsDb