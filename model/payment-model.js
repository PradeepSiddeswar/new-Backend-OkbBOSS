const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

	orderId: {
		type: String,
		required: true
	},
	receiptId: {
		type: String
	},
	paymentId: {
		type: String,
	},
	signature: {
		type: String,
	},
	amount: {
		type: Number
	},
	currency: {
		type: String
	},
	createdAt: {
		type: Date
	},
	status: {
		type: String
	},
	email:{
		type:String
	},
	phone:{
		type:String
	}
})

const paymentDetail = mongoose.model('paymentdetail', paymentSchema)
module.exports=paymentDetail