import mongoose from "mongoose";

const Kurs = mongoose.Schema({
    kurs:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
});

export default mongoose.model('Kurses',Kurs);