const rateUsDB = require("../model/rateUs_model")

//create and Save the contact //

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send("Content connt be empty")
        return
    }
    const rate = new rateUsDB({
        star: req.body.star,
        comments: req.body.comments,
    })
    rate.save(rate)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message
            })
        })
}
// update user//
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send("User Address not found")
    }
    const id = req.params.id
    rateUsDB.findByIdAndUpdate(id, req.body, { new: true })
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
// GET user on 
exports.find = (req, res) => {
    if (req.params.comments) {
        const comments = req.params.comments
        rateUsDB.find({ comments: comments }
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
        rateUsDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send(err)
            })
}
// star user
exports.star = (req, res) => {
    if (req.params.star) {
        const star = req.params.star
        rateUsDB.find({ star: star }
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
        rateUsDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send(err)
            })
}
exports.findAll = async (req, res) => {
    if (req.params.id) {
        const id = req.params.id;
        rateUsDB.findById(id
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

        rateUsDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send(err)
            })
}
// exports.sort = (req, res) => {
//     if (req.query.id) {
//         const star = req.query.id
//         rateUsDB.find({ id: star }
//         ).then(data => {
//             if (!data) {
//                 res.status(400).send("User not found")
//             } else {
//                 res.send(data)
//             }
//         })
//             .catch(err => {
//                 res.status(500).send(err)
//             })
//     }
//     else
//         rateUsDB.find()
//             .then(user => {
//                 res.send(user)
//             })
//             .catch(err => {
//                 res.status(500).send(err)
//             })
// }

exports.delete=(req,res)=>{
    const id =req.params.id
    rateUsDB.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(400).send(`User not found with Id ${id}`)
        }else{
            res.send("user deleted successfully")
        }
    })
 .catch(error=>{
    res.status(500).send(error)
 })
}