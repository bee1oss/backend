import mongoose from "mongoose";

const Predmet = mongoose.Schema({
    predmet:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
});

export default mongoose.model('Predmets',Predmet);