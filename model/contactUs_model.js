const mongoose = require("mongoose")
const schema = mongoose.Schema

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

const contactSchema = new schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        lowercase:true,
        // unique:true,
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    mobile: {
        type: Number,
        required:true
    },
    message: {
        type: String,
    },
    Useremail:{
        type:String
    },
    createdAt: {
        type: Date,
        deafault: Date.now(),
    },
    updatedAt: {
        type: Date,
        deafault: Date.now(),
    }
},
    { timestamps: true }
)

const contactUsDB = mongoose.model("contactus", contactSchema)
module.exports = contactUsDB