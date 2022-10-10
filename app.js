const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")
const app = express()
app.use(cors())

const corsOption = {
  origin: ['http://localhost:4000'],
};
app.use(cors(corsOption));

const mongoose = require("mongoose")
mongoose.pluralize(null);

const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const loginroute = require("./routes/login-router")
const taskroute = require("./routes/task-router")
// const homeCategoryroute = require("./routes/homeCategory-router")
const contactUsRoute = require("./routes/contactUs_route")
const rateUsRoute = require('./routes/rateUs_router')
// const uuidRoute = require('./routes/uuid_route')
const packageRoute = require('./routes/package_route')
const personaRoute = require("./routes/persona-router")
const paymentRoute = require("./routes/payments")
const smsRoute=require("./routes/sms-router")
const newCategoryroute=require("./routes/newcategory-route")
const addressRoute=require("./routes/address_route")
const transactionroute=require("./routes/transaction_route")
// const paymentWebRoutes = require('./routes/payments'); 

dotenv.config({ path: '.env' })
const PORT = process.env.PORT || 8080
console.log(PORT)
mongoose.connect(process.env.MONGO_URI, {
})

  .then(() => console.log(`Connected To Database`))
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello okBoss")
})




app.use(express.static("upload"))
app.use("/login", loginroute)
app.use('/contactUs', contactUsRoute)
app.use('/rateUs', rateUsRoute)
// app.use('/uuid', uuidRoute);
app.use("/task", taskroute)
// app.use("/homecategory", homeCategoryroute)
app.use("/package", packageRoute)
// app.use('/payment', paymentWebRoutes);
app.use('/payment', paymentRoute);
app.use("/persona", personaRoute)
app.use("/sendsms",smsRoute)
app.use("/newcategory",newCategoryroute)
app.use("/address",addressRoute)
app.use("/transaction",transactionroute)