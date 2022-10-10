const addressDB=require("../model/address_model")




exports.create = async (req, res) => {
    
    
    if (!req.body) {
        res.status(400).send("Content connt be empty")
        return
    }
    const limitcheck= await addressDB.find({user_id:req.body.user_id}).count()

    if(limitcheck<5){

    
    const address = new addressDB({
        label: req.body.label,
        address: req.body.address,
       user_id:req.body.user_id,
       
    })
    address.save()
        .then(data => {
            res.status(200).send({status:200,data:data})
        })
        .catch(error => {
            res.status(500).send({
                message: error.message,status:500,
            })
        })
    }
    else{
        res.status(429).json({status:429,message:"you have reach the limit"})
    }
}

exports.findall =  (req, res) => {
    console.log(req.query,"user")
    addressDB.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}