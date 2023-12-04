const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('database connected');
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.listen(process.env.PORT, () =>{
  console.log(`Server is running on port = ${process.env.PORT}`);
})