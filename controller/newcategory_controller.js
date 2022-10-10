const newcategoryDB = require("../model/newCategory-model")
// const categoryDB = require("../model/homeCategory-model")
const ObjectId = require('mongodb').ObjectId
const personaDB = require("../model/persona-model")
const loginDB = require("../model/login-model")
const { route } = require("../routes/newcategory-route")



exports.findMainCategory = (req, res) => {
     

        newcategoryDB.find({ parent: {$exists:false} }).then
            (data => {

                    res.status(200).json(data)
              
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    
        
}

exports.findsubCategory = (req, res) => {
     console.log(req.query.parent,"hi")

          const parent=req.query.parent
    newcategoryDB.find( {parent:parent} ).then
        (data => {

                res.status(200).json(data)
          
        })
        .catch(err => {
            res.status(500).send(err.message)
        })

    
}



exports.persona = async (req, res) => {
   
    try {
        var result = await loginDB.aggregate(
            [
                {
                    $match: { user_id:req.query.user_id }
                },

                {
                    $lookup: {
                        from: "categories",
                        foreignField: "name",
                        localField: "describes",
                        as: "userCategory",

                    },
                },

                // {
                //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$userCategory", 0 ] }, "$$ROOT" ] } }
                //  },

                //   { $unwind : "$userCategory" } 

            ]
        )
        console.log(result,"jjdd")
        const favcategory = result.map(item => item.describes)
        const userCategory = result.map(item => item.userCategory[0])

        console.log(favcategory, "favvvv")
        const allcat = await newcategoryDB.find({ parent: {$exists:false} })

        var remcat = []
        allcat.filter(item => {
            if (!favcategory.includes(item.name)) {
                remcat.push(item)
            }

        })

        // console.log(remcat, "cattttt")
        res.status(200).send([
            userCategory, remcat
        ]
        )
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        })
    }


}


// exports.update = async (req, res) => {
//     if (!req.body) {
//         res.status(400).send("User Address not found")
//     }
//     const id = req.params.id


//     // const ObjectId= req.params.ObjectId
//     console.log(id, "id")
//     categoryDB.findOneAndUpdate({ 'subCategory.subCategory1._id': ObjectId(id) },
//         {
//             $set: {
//                 'subCategory.subCategory1.$.sub': req.body.sub,

//             }
//         })
//         .then((data) => {
//             console.log(data, "data")
//             if (!data) {
//                 res.status(400).send("User not in this data")
//             }
//             else {
//                 res.status(201).send("User save Successfully")
//             }
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         })
// }

// exports.post_exp = async (req, res) => {
//     if (!req.body) {
//         res.status(400).send("User Address not found")
//     }
//     const id = req.params.id
//     const exp = req.body

//     console.log(id, 'sadcsddf')

//     // const ObjectId= req.params.ObjectId

//     newcategoryDB.findOneAndUpdate({ '_id': ObjectId(id) }, { $push: { 'subCategory.subCategory1': exp } }
//     )
//         .then((data) => {
//             console.log(data, "data")
//             if (!data) {
//                 res.status(400).send("User not in this data")
//             }
//             else {
//                 res.status(201).send(data)
//             }
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         })
// }
// exports.delete = (req, res) => {
//     const id = req.params.id;
//     console.log(id)
//     newcategoryDB.updateOne({ 'subCategory.subCategory1._id': ObjectId(id) }, { $pull: { 'subCategory.subCategory1': { '_id': ObjectId(id) } } })
//         .then(data => {
//             if (!data) {
//                 res.status(400).send("User not found");
//             }
//             else {
//                 res.status(200).send("User deleted Successfully");
//             }
//         })
//         .catch((err) => {
//             res.status(500).send({ message: err })
//         })
// }

// exports.filterCategory = (req, res) => {
//     // console.log("hhhhh");
//     if (req.params.category) {
//         const category = req.params.category
//         // console.log(category)

//         newcategoryDB.find({ category: category }).then
//             (data => {

//                 if (!data) {
//                     res.status(400).send("User not found")
//                 } else {
// const resData=data.map(subCategory => subCategory.subCategory.subCategory1);
// console.log("Res Data",resData[0]);
//                     // res.send(resData[0])
//                     const resData2= resData[0]
//                     res.send(resData2)
//                 }
//             })
//             .catch(err => {
//                 res.status(500).send(err)
//             })
//     }
//     else
//         newcategoryDB.find()
//             .then(user => {
//                 res.send(user)
//             })
//             .catch(err => {
//                 res.status(500).send(err)
//             })
// }


