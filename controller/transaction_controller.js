const transaction_model = require("../model/transaction_model")


//create and Save the booking //

exports.create = async (req, res,) => {
    if (!req.body) {
        res.status(400).send("Content cannot be empty")
        return
    }

    const booking = new transaction_model({
      user:req.body.user,
      task:req.body.task,
      type:req.body.type,
      razorpay_payment_id:req.body.razorpay_payment_id,
      amount:req.body.amount  
       
    })
    booking.save(booking)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message
            })
        })

}




