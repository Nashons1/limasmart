const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const MONGO_URI = process.env.MONGO_URI;
const Business= require('./model/business');
const cors = require('cors');



// middleware
app.use(cors({origin: true, credentials: true}));
app.use(express.json())
app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


//Database Connection ...
mongoose.set("strictQuery",false);
mongoose.connect("mongodb+srv://agate:agate@console.dc76zyq.mongodb.net/?retryWrites=true&w=majority").then((result)=>
app.listen(port,()=>{console.log('Db connection successful and server running on port 3001...')})
).catch((err)=> console.log(err))

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });


//Handle Errors
const handleErrors=(err)=>{
    let errors={};
    //return custom errors for validation
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach((err)=>{
              errors[err.properties.path] = err.message

        })
        console.log(errors)
}
    return errors;
}
//Creating a business ....

// app.post('/enroll',async(req,res)=>{
//     const{ company_name,tag_line,target,valuation,days_left,investors,background_image,profile_image,raised_amount,min_invest}= req.body;
//     try{
//         const business = await Business.create({company_name,tag_line,target,valuation,days_left,investors,background_image,profile_image,raised_amount,min_invest})
//         console.log(business)
//          return res.status(201).json({business})
//     }
//     catch(err){
//         const errors = handleErrors(err);
//       // status 400 == bad client request ...
//         return  res.status(400).json({errors})
//     }
// })

//Getting Businesses already Registered ...
app.get('/',async(req,res)=>{
   try{
    const businesses = await Business.find({}).then((res)=>{
        return res
    })
    return res.status(201).json({businesses})
    // console.log(businesses)
   }catch(error){
    console.log(error)
   }


  
})

//image upload API
app.post("/enroll", async (request, response) => {
const{ company_name,tag_line,target,valuation,days_left,investors,background_image,raised_amount,min_invest}= request.body;

    //collect the image from the user
    // const data = {
    //   image: request.body.image
    // };
  
    //upload the image to cloudinary
    // cloudinary.uploader.upload(profile_image);
    await cloudinary.uploader.upload(background_image)
    // console.log("uploaded")

    .then(async (result) => {

       const  background_image = await result.secure_url; 
       console.log("found bg url")
        const business = await Business.create({company_name,
            tag_line,
            target,
            valuation,
            days_left,
            investors,
            background_image,
            background_image,
            raised_amount,
            min_invest})

        console.log(business)
         return res.status(201).json({business})
    //   response.status(200).send({
    //     message: "success",
    //     result,
    //   });
    }) 
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
  
  })