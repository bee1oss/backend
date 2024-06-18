import mongoose from "mongoose";

const Day = mongoose.Schema({
    day:{
        type:String,
        required:true
    },user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
});

export default mongoose.model('Days',Day);