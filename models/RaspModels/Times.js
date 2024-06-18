import mongoose from "mongoose";

const Time = mongoose.Schema({
    time:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    });

export default mongoose.model('Times',Time);