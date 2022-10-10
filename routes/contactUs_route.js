const express = require("express")
const route = express.Router()
const contactController = require("../controller/contactUs-controller")



//Create the user contact us details
route.post("/", contactController.create)
//Get all details sorted by email
route.get("/get/:email", contactController.find)
route.get("/get/:mobile", contactController.find)
route.get("/get", contactController.find)
route.put("/update/:id", contactController.update)
route.delete("/delete/:id", contactController.delete)
//Get all the details in DB


module.exports = route