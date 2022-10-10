const personaDB = require("../model/persona-model")

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send("can't be empty")
        return
    }


    const persona = new personaDB({
        name: req.body.name,
        description: req.body.description,
        categories: req.body.categories
    })

    persona.save(persona)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send(error)
        })
}


exports.find = (req, res) => {
    if (req.params.id) {
        const id = req.params.id
        personaDB.findById(id
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
        personaDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send(err)
            })
}


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send("User Not found")
    }
    const id = req.params.id
    personaDB.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data) {
                res.status(400).send(`Can not found category with ${id}`)
            } else {
                res.send(data)
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}


exports.delete = (req, res) => {
    const id = req.params.id
    personaDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`category not found with ${id}`)
            } else {
                res.send("category deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}