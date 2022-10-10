const express = require("express")
const route = express.Router()
const personaController = require("../controller/persona-controller")


route.post("/", personaController.create)
route.get("/get", personaController.find)
route.get("/gets/:id", personaController.find)
route.put("/update/:id", personaController.update)
route.delete("/delete/:id", personaController.delete)

module.exports = route