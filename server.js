// Require express
const express = require('express');

// Init express
const app = express();

const cors = require('cors')
require("dotenv").config();



// Require connectDB
const connectDB = require('./config/connectDB');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);



// Middleware ==> Parse The Data To json
app.use(cors())
app.use(express.json()); 



//require the routes
const userRoute = require('./routes/user');
const adminRoute = require ('./routes/admin');
const productRoute = require ('./routes/product');



//Use routes
app.use('/users', userRoute)



//Admin routes 
app.use('/admin', adminRoute)



//Product routes
app.use('/products',productRoute)



// server 
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
  console.log('MongoDB connected');
})

.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(process.env.PORT,()=>console.log("server is running on port 5000"))
