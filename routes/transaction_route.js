const express = require("express")
const route = express.Router()




const transactionController = require("../controller/transaction_controller")

//Create a new user in booking page
route.post("/",transactionController.create)

module.exports = route
