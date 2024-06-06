const mongoose = require('mongoose')

const connectiondb = async() =>{

    try{
        // await mongoose.connect('mongodb://127.0.0.1:27017/chat');
        await mongoose.connect(`mongodb+srv://parth:knXIfzOnNqAvMduh@cluster0.4roqkjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("connect to database");
    }

    catch(err){
        console.log(err);
    }


}

module.exports = connectiondb;