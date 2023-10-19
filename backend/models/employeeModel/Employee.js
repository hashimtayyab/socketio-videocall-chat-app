const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    addedBy:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    }

});

module.exports = mongoose.model("Employee", employeeSchema);