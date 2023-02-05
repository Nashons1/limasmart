const { mongoose } = require('mongoose')

const Schema = require('mongoose').Schema


const productschema = new Schema({
    product_name:{
        type:String,
        required:[true,"Please Enter Business Name"]
    },

    price:{
        type: Number,
        required:[true,"Estimated Target"]
    },
    product_description:{
     type: String,
    },
    available_stock:{
        type:Number
    },
    // days_left:{
    //     type:Number,
    // },
    // investors:{
    //   type:Number,
    // },
    product_image:{
        type:String,
    }
    // profile_image:{
    //     type:String,
    // },
    // raised_amount:{
    //     type:Number,
    //     required:true,
    // },
    // min_anvest:{
    //     type:Number,
    // }
})



module.exports = mongoose.model("Products", productschema)