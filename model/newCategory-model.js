const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const schema = mongoose.Schema



const newCategoryschema = new schema({
    name:{
    type:String
    },
    slug:{
        type:String
    },
    status:{
        type:Number
    },
icon:{
    type:String
},
activeicon:{
    type:String
},
image:{
    type:String
},
other:{
    type:String
},
purchase:{
    type:String
},
pickupdrop:{
    type:String
},
skills:{
    type:Array
},
ratetype:{
    type:String
},
parent:{
    type:ObjectId
},
hours:{
    type:Number
},
sucatetypeone:{
    type:String
},
sucatetype1:{
    type:String
},
sucatetype2:{
    type:String
},
sucatetype3:{
    type:String
},
sucatetype:{
    type:Number
},
priority:{
    type:Number
},
otherpare:{
    type:Object
},
service_status:{
    type:String
},
seo:{
    type:Object
},
hours:{
    type:Number
},
createdAt: {
    type: Date
},
updatedAt: {
    type: Date
},

   
})

const newcategoryDB = mongoose.model("categories", newCategoryschema)

module.exports = newcategoryDB

