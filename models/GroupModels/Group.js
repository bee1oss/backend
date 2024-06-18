import mongoose from "mongoose";

const Group = mongoose.Schema({
    group:{
        type:String,
        required:true
    },
    kurs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kurses',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
});

export default mongoose.model('Groups',Group);