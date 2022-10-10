const loginDB = require("../model/login-model")
const path = require("path")
const fs = require('fs');
const jwt = require("jsonwebtoken")

// create and save new user //


exports.create = async (req, res) => {


    console.log(req.body);
    console.log(req.protocol + "://" + req.get("host"), "url")
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    // const verifyEmail = await loginDB.findOne({ email: req.body.email })

    // if (verifyEmail) {
    //     res.status(409).send("Email Already Exists")
    //     return
    // }

    

    
    // const paths = req.file.path
    // const pathindex = paths.indexOf("/")
    // const optpath = paths.slice(pathindex)
    // console.log(optpath, "immmmmm")
    const user = new loginDB({

        image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+ "/images/" + req.file.filename : "",
        fullname: req.body.fullname,
        phone: req.body.phone,
        dob: req.body.dob,
        email: req.body.email,
        describes: req.body.describes,
        user_id: req.body.user_id,
        Coupon: req.body.Coupon,
    })
    await user.save(user)
        .then(data => {
            res.status(200).send(data)
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message
            })
        })
    
}



// update the user //

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data to update can not be empty" })
    }
    const user_id = req.params.user_id
    loginDB.findOneAndUpdate({ user_id: user_id }, {
        $set: {
            email: req.body.email,
            fullname: req.body.fullname,
            phone: req.body.phone,
            dob: req.body.dob,
            describes: req.body.describes,
            image: req.file ? "https" + "://" + "3.109.3.181:4000" + "/images/" + req.file.filename : req.body.image
            

        }
    },{new:true})
        .then(data => {
            
                res.send(data)
            
        })
        .catch(err => {
            res.status(500).send({ message: "" })
        })
}

// Delete the use //

exports.delete = async (req, res) => {

    const id = req.params.id
    loginDB.findByIdAndDelete(id)
        .then(data => {

            let url = data.image;
            imagess = new URL(url).pathname.split('/').pop()
            fs.unlink(`./upload/images/${imagess}`, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
            if (!data) {
                res.status(400).send("User not Found")
            } else {
                res.send("User was deleted successfully")
            }
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })

}

// Get user //

exports.find = (req, res) => {
    if (req.params.user_id) {
        const user_id = req.params.user_id
        loginDB.findOne({ user_id: user_id }
        ).then(data => {
            if (!data) {
                res.status(400).send("User not found")
            } else {
                res.status(200).send("User is Exists")
            }
        })
            .catch(err => {
                res.status(500).send(err)
            })
    }

}


exports.findUser = (req, res) => {
    if (req.params.user_id) {
        const user_id = req.params.user_id
        loginDB.findOne({ user_id: user_id }
        ).then(data => {
            console.log(data)
            if(data){
                res.status(200).send(data)

            }
           
        })
            .catch(err => {
                res.status(500).send({
                    message:err.message
                })
            })
    }
   
}


