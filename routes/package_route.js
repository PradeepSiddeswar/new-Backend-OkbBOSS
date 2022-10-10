const express = require("express")
const route = express.Router()

const packageController = require("../controller/package_controller")

//Posting New packages by admin
route.post("/", packageController.create)

route.get("/get", packageController.find)
//Updating packages with sub category id for admin
route.put('/update/:id', packageController.update)
//Inserting subcategories in packages by (Main category id) for admin
route.put('/insert/:id', packageController.post_exp)
//Deleting one of the existing sub category with (Subcategory id)
route.delete('/delete/:id', packageController.delete)



module.exports = route;