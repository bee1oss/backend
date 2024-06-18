import mongoose from "mongoose";

const Teacher = mongoose.Schema({
    teacher:{
        type:String,
        required:true
    },user: {type: mongoose.Schema.Types.ObjectId,ref: 'Users',required: true,},
});

export default mongoose.model('Teachers',Teacher);