const mongoose = require("mongoose")
const schema = mongoose.Schema



function Coupon() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return ((c == 'x' ? r : (r & 0x1 | 0x6))).toString(16);
    });
    return uuid.substring(0, 8).toUpperCase();
}

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const loginSchema = new schema({


    image: {
        type: String,

    },
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        // unique: true,

        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        message: "Email Already Exist"


    },
    describes: {
        type: String,
        required: true,

    },
    user_id: {
        type: String,
        unique:true,
        required:true,
    },
    createdAt: {
        type: Date,
        deafault: Date.now(),
    },
    updatedAt: {
        type: Date,
        deafault: Date.now(),
    },

    Coupon: { type: String, unique: true, default: Coupon },
},
    { timestamps: true },
)


const loginDB = mongoose.model("login", loginSchema)

module.exports = loginDB

