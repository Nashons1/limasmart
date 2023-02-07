const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const MONGO_URI = process.env.MONGO_URI;
const Products= require('./model/products');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./model/userModel");

const products = require('./model/products');



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
    const products = await Products.find({}).then((res)=>{
        return res
    })
    return res.status(201).json({products})
    // console.log(businesses)
   }catch(error){
    console.log(error)
   }


  
})

// //image upload API
// app.post("/enroll", async (request, response) => {
// const{ product_name,price,product_description,available_stock,days_left,investors,product_image,raised_amount,min_invest}= request.body;

//     //collect the image from the user
//     // const data = {
//     //   image: request.body.image
//     // };
  
//     //upload the image to cloudinary
//     // cloudinary.uploader.upload(profile_image);
//     await cloudinary.uploader.upload(background_image)
//     // console.log("uploaded")

//     .then(async (result) => {

//        const  background_image = await result.secure_url; 
//        console.log("found bg url")
//         const business = await Business.create({company_name,
//             price,
//             product_description,
//             available_stock,
//             days_left,
//             investors,
//             product_image,
//             //background_image,
//             raised_amount,
//             min_invest})

//         console.log(products)
//          return res.status(201).json({business})
//     //   response.status(200).send({
//     //     message: "success",
//     //     result,
//     //   });
//     }) 
//     .catch((error) => {
//       response.status(500).send({
//         message: "failure",
//         error,
//       });
//     });
  
//   })

//image upload API
app.post("/upload-image", (request, response) => {

  //collect the image from the user
  const data = {
    image: request.body.file
  };

  //upload the image to cloudinary
  cloudinary.uploader.upload(data.image)
  .then((image) => {
    response.status(200).send({
      // message: "success",
      image,
    });
  }) 
  .catch((error) => {
    response.status(500).send({
      message: "failure",
      error,
    });
  });

})

  app.post("/register", (request, response) =>{

    //hash the password before saving the data
    bcrypt.hash(request.body.password, 10)
    .then((hashedPassword) => {
        const user = new User({
            email: request.body.email,
            password: hashedPassword,
        });
        user.save().then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
    })
    .catch((e) => {
        response.status(500).send({
            message: "password hash not succesfull",
            e,
        });
    });
});

app.post("/login", (request, response) => {
    //check if the email that the useer enters exists
    User.findOne({email: request.body.email })
    .then((user)=>{
        bcrypt.compare(request.body.password, user.password)
        .then((passwordCheck) => {
            //check if password matches

            if(!passwordCheck){
                return response.status(400).send({
                    message: "passwords not matching",
                    error,
                });
            }

            //create JWT token
            const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h"}
            );

            //return success response
            response.status(200).send({
                message: "Login successful",
                email: user.email,
                token,
            });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Password does not match",
            error,
          });
        })
      })  
     .catch((e) => {
        response.status(404).send({
            message: "Email not found",
            e,
          });
    })
})
