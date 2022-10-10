const contactUsDB = require("../model/contactUs_model")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
dotenv.config({ path: '.env' })
//create and Save the contact //
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send("Content cannot be empty")
        return
    }
console.log(req.body,"req")
    var transporter = nodemailer.createTransport({
        service: process.env.SENDER_EMAIL_PROVIDER,
        auth: {
          user: process.env.SENDER_EMAIL, // e-mail id
          pass: process.env.SENDER_EMAIL_APP_PASSWORD // e-mail password
        }
    });
 
    var mailOptions = {
        from: process.env.SENDER_EMAIL,// sender E-mail address
        to: process.env.RECEIVER_EMAIL, // receiver E-mail Address
        subject : "okboss-complaint", // Subject 
        html:`<h4>Name: ${req.body.name}</h4><p>Email: ${req.body.email}</p><p>Mobile: ${req.body.mobile}</p><p>Message: ${req.body.message}</p>`,
        
    };
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.status(400).json({status: false, message: 'try again later',data:{}})
          return
        } 
        else
        {
        //   res.json({status: true, respMesg: 'Email Sent Successfully'})
          const contact = new contactUsDB({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            message: req.body.message
        })
        
    
        contact.save(contact)
            .then(data => {
                res.status(200).send({status:true, message:"email send successfully",data:data})
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message
                })
            })

        }
     
      })

   

    
}
// find user
exports.find = (req, res) => {
    if (req.params.email) {
        const email = req.params.email
        contactUsDB.findOne({ email: email }
        ).then(data => {
            if (!data) {
                res.status(400).send("User not found")
            } else {
                res.send(data)
            }
        })
            .catch(err => {
                res.status(500).send(err)
            })
    }
    else
        contactUsDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send(err)
            })
}
// update user

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send("User Address not found")
    }
    const id = req.params.id
    contactUsDB.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data) {
                res.status(400).send(`Can not found user Address with ${id}`)
            } else {
                res.send(data)
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}
// Delete user
exports.delete = (req, res) => {
    const id = req.params.id

    contactUsDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`User not Found with ${id}`)
            } else {
                res.send("user deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}
// mobile user
exports.mobile = (req, res) => {
    if (req.body.mobile) {
        const mobile = req.body.mobile
        console.log(mobile, 'fdasdvdfv')
        contactUsDB.find({ mobile: mobile }
        ).then(data => {
            if (!data) {
                res.status(400).send("User not found")
            } else {
                res.send(data)
            }
        })
            .catch(err => {
                res.status(500).send(err)
            })
    }
    else
        contactUsDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send(err)
            })
}