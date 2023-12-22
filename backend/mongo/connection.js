const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb+srv://adarshtadiparthi123:TgGMZb8Dcf4ZDH9B@cluster0.lnubrq1.mongodb.net/mydatabase?retryWrites=true&w=majority')
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDB;
