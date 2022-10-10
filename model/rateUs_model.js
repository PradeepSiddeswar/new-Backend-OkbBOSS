const mongoose = require("mongoose")
const schema = mongoose.Schema

const rateSchema = new schema({
    star: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        // default: 5,
        required:true,
    },
    comments: {
        type: String,
        required:true
    },

    createdAt: {
        type: Date,
        deafault: Date.now(),
    },
    updatedAt: {
        type: Date,
        deafault: Date.now(),
    },
},
    { timestamps: true }
)



const rateUsDB = mongoose.model("rateus", rateSchema)
module.exports = rateUsDB