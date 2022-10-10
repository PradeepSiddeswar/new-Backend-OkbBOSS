// const express = require("express")
// const route = express.Router()

// const homeCategorycontroller = require("../controller/homeCategory-controller")



// //Create all categories and sub categories and which can controlled by admin
// route.post("/",  homeCategorycontroller.create)
// //To find all categories and sub categories
// route.get("/getall", homeCategorycontroller.find)
// // route.get("/find", homeCategorycontroller.findcat)

// route.get('/get/:category',homeCategorycontroller.findCategory);
// route.get('/getfilter/:category', homeCategorycontroller.filterCategory);
// route.put('/update/:id', homeCategorycontroller.update);

// //Insert new sub category by (main category id)
// route.post('/insert/:id', homeCategorycontroller.post_exp)
// //Delete one of the subcategory by (subcategory id)
// route.delete('/delete/:id', homeCategorycontroller.delete)

// ////http://localhost:4000/homecategory/find



// module.exports = route