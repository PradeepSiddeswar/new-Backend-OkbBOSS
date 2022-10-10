const express = require("express")
const route = express.Router()
const smsController = require("../controller/sms-controller")

route.post("/", smsController.create)
route.put("/verify/:number", smsController.update)

module.exports = route

