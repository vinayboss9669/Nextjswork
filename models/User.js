
const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({

        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },

},{timestamps:true});

// mongoose.models={}; // To prevent OverwriteModelError in Next.js hot-reloading
export default mongoose.models.User || mongoose.model("User", UserSchema);