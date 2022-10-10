const { Router } = require("express")
const express = require("express")
const route = express.Router()
const taskmulter=require("../config/audiomulter")



const taskController = require("../controller/task-controller")

//Create a new user in booking page
route.post("/",taskmulter.single("audio"),taskController.create)
//Finding all booked users in DB
//Find all booked users sorted by id
route.get("/get_order", taskController.find)
//As due to changing of state of uuid in booking not added update option. Only delete and create option
//implemented.
route.put("/checkout", taskController.update)
route.delete("/delete/:id", taskController.delete)
route.get("/getall/status",taskController.getallbystatus)
route.post("/updatestatus",taskController.statusupdate)
route.get("/history",taskController.history)
route.get("/historydetails",taskController.historydetails)


module.exports = route
