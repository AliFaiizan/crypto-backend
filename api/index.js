const express= require ('express');
const mongoose= require('mongoose');
const cors= require('cors');
const dotenv= require('dotenv').config();
const {readdirSync} = require('fs');
 

const app= express();

const allowedLinks=[
    "http://localhost:3000",
    "http://localhost:1000"
]
const corsOption=(req,res) => { 
    let temp;
    let origin=req.header('Origin');
    if( allowedLinks.indexOf(origin)>-1){
        temp={
            origin:true,
            optionSucessStatus:'200'
        }

    }else{
        temp={
            origin:false,
            optionSucessStatus:'204'
        }
    }

    res(null,temp)
 }
app.use(cors(corsOption))
app.use(express.json())

//This will dynamically set routes
readdirSync('./Routes').map((r) => { 
    app.use(require('./Routes/'+r))
 })

,

//docker:mongopw@localhost:49153/socialnetwork

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
  })
  .then((db) => { 
    console.log(
      "database",
      db.connection.name,
      " status ",
      mongoose.connection.readyState ,
      ":connected"
    );

   })
   .catch((err) => { 
    console.log('FAILED TO CONNECT DB',err)
    })
});