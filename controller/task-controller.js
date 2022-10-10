const { ObjectId } = require("mongodb")
const task_model = require("../model/task-model")
const transaction_model=require("../model/transaction_model")

//create and Save the booking //

exports.create = async (req, res,) => {
    console.log(req.file,"aodd")
    if (!req.body) {
        res.status(400).send("Content cannot be empty")
        return
    }

    const booking = new task_model({
        category: req.body.category,
        parent_sub_category: req.body.parent_sub_category,
        child_sub_category: req.body.child_sub_category,
        phone: req.body.phone,
        address: req.body.address,
        date:req.body.date,
        time:req.body.time,
        pickup_address:req.body.pickup_address,
        drop_address:req.body.drop_address,
        description:req.body.description,
        // user_latlong:{
        //   lon:req.body.longitude,
        //   lat:req.body.latitude
        // },
        user:req.body.user,
        user_id:req.body.user_id,
        audio:req.file&&req.file.filename ? "http" + "://" + "3.109.3.181:4000" + "/audio/" + req.file.filename : "",
    })
    booking.save(booking)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message
            })
        })

}


exports.find =  (req, res) => {
    console.log(req.query.user_id, "getttt");
    if (req.query.user_id) {
        const user_id = req.query.user_id
        task_model.find({$and:[{user_id:user_id},{status:"summary"}]}).sort({createdAt:-1})
        .limit(1)
        // .populate("user")
        .then(data => {
            if (!data) {
                res.status(400).send("No Order")
                return
            } 
                res.status(200).json(data[0])
            
        })
            .catch(err => {
                res.status(500).send(err)
            })
    }
    
}



exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send("User Address not found")
    }
    task_model.findOneAndUpdate({$and:[{_id:req.body._id},{user_id:req.body.user_id}]},
        {$set:{status:"booked",payment_status:"paid"}}, { new: true })
      
        .then(data => {
            if (!data) {
                res.status(400).send(`Can not found user Address with ${id}`)
            } else {
                res.status(200).json({data:data,status:200,message:"serivice booked successfully"})
            }
        })
        .catch(error => {
            res.status(500).json({message:error.message,status:500})
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    task_model.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`User not Found with ${id}`)
            } else {
                res.send("user deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}



exports.statusupdate = async (req, res) => {
           
    task_model.findOneAndUpdate({$and:[{_id:req.body._id},{user_id:req.body.user_id}]},
        {$set:{status:req.body.status}}, { new: true,runValidators:true })
      
        .then(data => {
            if (!data) {
                res.status(400).send(`order not found`)
            } else {
                res.status(200).json({data:data,status:200,message:"serivice updated successfully"})
            }
        })
        .catch(error => {
            res.status(500).json({message:error.message,status:500})
        })
}

exports.getallbystatus = (req, res) => {
    console.log(req.query.user_id,"id")

    task_model.find({$and:[{user_id:req.query.user_id},{status:req.query.status}]})
        .then(data => {
            if (!data) {
                res.status(404).send(`no order`)
                return
            } 
            res.status(200).json(data)
            
        })
        .catch(error => {
            res.status(500).send(error)
        })
}

exports.history =  async(req, res) => {
    let taskstatus=req.query.status
   let aggre= taskstatus==="ongoing" ?  {
        $match: { $and:[{user_id:req.query.user_id},
            { $or:[{status:"ongoing"},{status:"booked"},{status:"accepted"}]}] }
    } : taskstatus==="cancelled" ? {
        $match: { $and:[{user_id:req.query.user_id},
            { $or:[{status:"cancelled"},{status:"rejected"}]}] }
    } : taskstatus==="completed" ? {
        $match: { $and:[{user_id:req.query.user_id},
            { $or:[{status:"completed"}]}] }
    } : {
        $match: { user_id:req.query.user_id}
    } 
   
    try {
        var result = await task_model.aggregate(
            [
               aggre,

                {
                    $lookup: {
                        from: "transaction",
                        foreignField: "task",
                        localField: "_id",
                        as: "transactiondetails",

                    },
                },
                {
                    $project: {
                        "category":1,
                        "parent_sub_category":1,
                        "date":1,
                        "transactiondetails.amount":1,
                        "booking_id":1,
                        "description":1
                    }
                }

               
            ]
        )
        console.log(result,"jjdd")
      
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

exports.historydetails =  async(req, res) => {
    console.log(req.query._id,"jhj")
    var _id=ObjectId(req.query._id)

   
    try {
        var result = await task_model.aggregate(
            [
                {
                    $match:  {_id:_id} 
                },

                {
                    $lookup: {
                        from: "transaction",
                        foreignField: "task",
                        localField: "_id",
                        as: "transactiondetails",

                    },
                },

               
            ]
        )
        console.log(result,"jjddop")
      
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}
