const mongoose = require('mongoose');

const OrderSchema=new mongoose.Schema({
     email:{
        type:String,
        required:true
     },
     orderId:{
        type:String,
        required:true,
        unique:true
     },
     paymentInfo:{
        type:String,
        required:true
     },
     products:[{
         productId:{
             type:String,
             required:true
         },
         quantity:{
             type:Number,
             required:true
         }
     }],
     address:{
         type:String,
         required:true
        },
    amount:{
        type:Number,
        required:true   
    },
    status:{
        type:String,
        default:"pending",
        required:true
    }   
},{timestamps:true});

mongoose.models={}; // To prevent OverwriteModelError in Next.js hot-reloading

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);