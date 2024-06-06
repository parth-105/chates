const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },
   
    password:{
        type:String,
        required:true,
        
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:""
    }
})

const User =mongoose.model('user',userschema);

module.exports = User;