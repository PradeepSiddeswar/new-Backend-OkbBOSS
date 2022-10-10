var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');
const paymentDetail = require('../model/payment-model');
const dotenv = require("dotenv")


let razorPayInstance = new Razorpay({
    key_id: 'rzp_test_bIofsOaWi83JHO',
    key_secret: 'jtgTBuOmlBm1FnaQDhh0eIUE'
})

function nanoid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return ((c == 'x' ? r : (r & 0x1 | 0x6))).toString(16);
    });
    return uuid.substring(0, 8);
}

router.get('/get', function (req, res, next) {
   
    paymentDetail.find()
        .then(user => {
            res.send(user)
        }).catch(error => {
            res.status(500).send(error)
        })
    
    
});


// 
//  * Checkout Page
//  * 
//  */
router.post('/order', function (req, res, next) {
    params = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: nanoid(),
        payment_capture: "1",


    }
    razorPayInstance.orders.create(params)
        .then(async (response) => {
            const razorpayKeyId = process.env.RAZORPAY_KEY_ID
            // Save orderId and other payment details
            const paymentreport = new paymentDetail({
                orderId: response.id,
                receiptId: response.receipt,
                amount: response.amount / 100,
                currency: response.currency,
                createdAt: response.created_at,
                status: response.status,
                email: req.body.email,
                phone: req.body.phone

            })
            try {
                // Render Order Confirmation page if saved succesfully
                await paymentreport.save()
                res.send({
                    title: "Confirm Order",
                    razorpayKeyId: razorpayKeyId,
                    paymentDetail: paymentreport,

                })
            } catch (err) {
                // Throw err if failed to save
                if (err) throw err;
            }
        }).catch((err) => {
            // Throw err if failed to create order
            if (err) throw err;
        })
});

/**
 * Verify Payment
 * 
 */
router.post('/verify', async function (req, res, next) {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    let crypto = require("crypto");
    let expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    // Compare the signatures
    if (expectedSignature === req.body.razorpay_signature) {
        // if same, then find the previosuly stored record using orderId,
        // and update paymentId and signature, and set status to paid.
        await paymentDetail.findOneAndUpdate(
            { orderId: req.body.razorpay_order_id },
            {
                paymentId: req.body.razorpay_payment_id,
                signature: req.body.razorpay_signature,
                status: "paid"
            },
            { new: true },
            function (err, doc) {
                // Throw er if failed to save
                if (err) {
                    throw err
                }
                // Render payment success page, if saved succeffully
                // res.render('pages/payment/success', {
                // 	title: "Payment verification successful",
                // 	paymentDetail: doc
                // })
                res.send("Payment Successfull")
            }
        );
    } else {
        // res.render('pages/payment/fail', {
        // 	title: "Payment verification failed",
        // })
        res.send("Payment is failed")
    }
});

module.exports = router;