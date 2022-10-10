const express = require("express")
const route = express.Router()

const newCategorycontroller = require("../controller/newcategory_controller")




//To find all categories and sub categories
route.get("/getmain", newCategorycontroller.findMainCategory)
route.get("/getsub",newCategorycontroller.findsubCategory)
route.get("/getpersona",newCategorycontroller.persona)



module.exports = route