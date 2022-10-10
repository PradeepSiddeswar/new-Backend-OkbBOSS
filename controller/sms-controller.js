const smsDb = require("../model/sms-model")
const fast2sms = require("fast-two-sms");
const { response } = require("express");



function sendMessage(message, number, res) {
  var options = {
    authorization:
      "24ce8g31GaPvAfCKpbnOq5hBEV6zsRdlIS9xDT7YHQrjFXwMtUyAalvXFwsP6DM1R4e9kHuK7f2oBYWj",
    message: message,
    numbers: [number],
    sender_id: "OKBOSS"



  };

  // send this message

  return fast2sms
    .sendMessage(options)
  //   .then((response) => {
  //     console.log(response,"resssssss")
  //  return  res.send(response.message)

  //   })
  //   .catch((error) => {
  //     res.send("Some error taken place") 
  //   });
}



exports.create = async (req, res) => {

  let otp = Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10)
    + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10)
  console.log(otp)
  console.log(req.body)
  // const number=req.body.number
  if (!req.body) {
    res.status(400).send("Please Enter Phone Number")
    return
  }
  const verify = await smsDb.findOne({
    $and: [
      { number: req.body.number },
      { status: "verified" }
    ]
  })
  console.log(verify, "verrrrrr")

  if (verify) {
    res.status(200).send("Phone Number Already Verified")
    return
  }
  const notVerify = await smsDb.findOneAndUpdate({
    $and: [
      { number: req.body.number },
      { status: "not verified" }
    ]
  }, { otp: otp })
  console.log(notVerify, "nooootttverrrrrr")

  if (notVerify) {
    sendMessage(otp, req.body.number, res,)

    res.status(200).send("otp Updated")
    return
  }


  const result = new smsDb({
    number: req.body.number,
    otp
  })

  sendMessage(otp, req.body.number, res)
    // .then((response) => {
    //       console.log(response,"resssssss")
    //      res.send(response.message)

    //     })

    .then((ress) => {
      console.log(ress, "result")
      if (ress.request_id) {

        result.save(result)
          .then(data => {
            res.status(201).send({data:data,status:201})
          })

          .catch(error => {
            res.status(500).send({
              message: ress.message
            })
          })
      }
      else {
        res.status(ress.status_code).send(ress.message)

      }
    }

    )


  // .catch((error) => {
  //   res.send("Some error taken place") 
  // })




}

exports.update = async (req, res) => {
  console.log(req.params, "ressssss")
  const number = req.params.number
  try {


    const findata = await smsDb.findOneAndUpdate({
      $and: [
        { number: number },
        { otp: req.body.otp }
      ]
    },
      { status: "verified" },
      { new: true })

    console.log(findata, "datatatata")
    if(!findata){
      res.status(400).send({message:"Wrong OTP",status:400})
    return
    }
    res.status(200).send(findata)
  }
  catch (error) {
    res.status(500).send(error)
  }
}

