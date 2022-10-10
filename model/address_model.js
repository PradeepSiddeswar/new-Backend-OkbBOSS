const mongoose = require("mongoose")
const schema = mongoose.Schema



const AddressSchema = new schema({
    label: {
        type: String,
        required:true
    },
   
    address: {
        type: String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"inactive"
    },
    count:{
        type:Number
    }
   
},
    { timestamps: true }
)

const contactUsDB = mongoose.model("address", AddressSchema)
module.exports = contactUsDB