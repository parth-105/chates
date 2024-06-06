const mongoose = require('mongoose')

const connectiondb = async() =>{

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/chat');
        console.log("connect to database");
    }

    catch(err){
        console.log(err);
    }


}

module.exports = connectiondb;