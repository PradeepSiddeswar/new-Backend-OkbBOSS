const mongoose = require("mongoose")
const schema = mongoose.Schema



const TransactionSchema = new schema({
    user: { type: schema.Types.ObjectId, ref: 'login' },
	tasker: { type: schema.Types.ObjectId, ref: 'tasker' },
	task: { type: schema.Types.ObjectId, ref: 'task' },
	type: String,
    razorpay_payment_id:{
        type:String
    },
    amount: Number,


},
    { timestamps: true }
)

const contactUsDB = mongoose.model("transaction", TransactionSchema)
module.exports = contactUsDB