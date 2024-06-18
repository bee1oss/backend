import mongoose from "mongoose";

const User = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },userRole:{
            type: String,
            require:true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        detail:{//burada kullanıcının verileri saklanmaktadır
            type:String,
            required:false,
        }
    },
    {
        timestamps: true,
    },);

export default mongoose.model('Users',User);