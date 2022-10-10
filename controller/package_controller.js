const packageDB = require("../model/package")
const ObjectId = require('mongodb').ObjectId

//create and Save the contact //

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send("Content connt be empty")
        return
    }
    const package = new packageDB({
        package: req.body.package,
        purchased_on: req.body.purchased_on,
        offer_valid_till: req.body.offer_valid_till,
       description:req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory
    })
    package.save()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message
            })
        })
}
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send("User Address not found")
    }
    const id = req.params.id
    packageDB.findByIdAndUpdate(id, req.body, { new: true })
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
exports.post_exp = async (req, res) => {
    if (!req.body) {
        res.status(400).send("User Address not found")
    }
    const id = req.params.id
    const exp = req.body

    console.log(id, 'sadcsddf')

    // const ObjectId= req.params.ObjectId

    packageDB.findOneAndUpdate({ '_id': ObjectId(id) }, { $push: { 'subCategory.subCategory1': exp } }
    )
        .then((data) => {
            console.log(data, "data")
            if (!data) {
                res.status(400).send("User not in this data")
            }
            else {
                res.status(201).send(data)
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id)
    packageDB.updateOne({ 'subCategory.subCategory1._id': ObjectId(id) }, { $pull: { 'subCategory.subCategory1': { '_id': ObjectId(id) } } })
        .then(data => {
            if (!data) {
                res.status(400).send("User not found");
            }
            else {
                res.status(200).send("User deleted Successfully");
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err })
        })
}

exports.find = async (req, res) => {
    packageDB.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}