const mongoose = require("mongoose")
const schema = mongoose.Schema

const packageSchema = new schema({
    package: {
        type: String,

    },
    purchased_on: {
        type: String,
        // require: true
    },
    offer_valid_till: {
        type: String,
        // require: true
    },
    description:{
      type:String,
    },
    category: {

        type: String
    },
    subCategory: {
        subCategory1: [{
            sub: String
        }]
    },
    // createdAt: {
    //     type: Date,
    //     deafault: Date.now(),
    // },
    // updatedAt: {
    //     type: Date,
    //     deafault: Date.now(),
    // },


}, {timestamps:true}
)

const packageDB = mongoose.model("package", packageSchema)

module.exports = packageDB