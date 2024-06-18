import mongoose from "mongoose";

const Detail = mongoose.Schema({
    detail:{
        type:String,
        required:true
    },user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
});

export default mongoose.model('Details',Detail);