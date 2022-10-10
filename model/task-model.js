const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const schema = mongoose.Schema
// function Token() {
//     var dt = new Date().getTime();
//     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         var r = (dt + Math.random() * 16) % 16 | 0;
//         dt = Math.floor(dt / 16);
//         return ((c == 'x' ? r : (r & 0x1 | 0x6)));
//     });
//     return "OKB-" + uuid.substring(0, 4);
// }

const bookingShema = new schema({
    // _id:{
    //     type:ObjectId
    // },
    category: {
        type: String
    },
    parent_sub_category: {
        type: String
    },
    child_sub_category: {
        type: String
    },
    booking_id: { type: String },

    phone: {
        type: Number
    },

    address: {
        type: String
    },
    pickup_address:{
        type:String
    },
    drop_address:{
        type:String
    },
   
    date :{
        type: String,
    },
    time: {
        type: String,

    },
    description:{
        type:String
    },
    audio:{
        type:String
    },
    user: { type: schema.Types.ObjectId, ref: 'login' },
    
    user_id:{type:String},

    status:{
        type:String,
        enum:["summary","accepted","ongoing","completed","cancelled","rejected","booked"],
        default:"summary",

    },
    payment_status:{
           type:String,
           default:"not_paid",
           enum:["paid","not_paid"]
    },
  
    user_latlong: {
        lon: Number,
        lat: Number
    },
    tasker: { type: schema.Types.ObjectId, ref: 'tasker' },
    
},
     { timestamps: true }
)



bookingShema.pre("save",async function(next) {
    const body=this
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return ((c == 'x' ? r : (r & 0x1 | 0x6)));
    });
    body.booking_id= "OKB-" + uuid.substring(0, 6);
    next()
})
const bookingDB = mongoose.model("task", bookingShema)



module.exports = bookingDB