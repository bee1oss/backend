import mongoose from "mongoose";

const Type = mongoose.Schema({
    type:{
        type:String,
        required:true
    },user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
});

export default mongoose.model('Types',Type);