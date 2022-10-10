const express = require("express")
const route = express.Router()
const rateController = require("../controller/rateUs_controller")

route.post("/", rateController.create)
route.put("/update/:id", rateController.update)
route.get("/get/:comments", rateController.find)
route.get("/get", rateController.find)
route.get("/get/star/:star", rateController.star)
route.get("/show", rateController.findAll),
    // route.get('/sort', rateController.sort)

    route.delete("/delete/:id",rateController.delete)

module.exports = route