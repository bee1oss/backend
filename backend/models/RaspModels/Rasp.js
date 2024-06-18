import mongoose from "mongoose";

const RaspSchema = mongoose.Schema({
    time: { type: mongoose.Schema.Types.ObjectId,ref: 'Times',required: true},
    day:{type: mongoose.Schema.Types.ObjectId,ref: 'Days',required: true},
    predmet:{type: mongoose.Schema.Types.ObjectId,ref: 'Predmets',required: true},
    group:{type: mongoose.Schema.Types.ObjectId,ref:'Groups',required: true},
    teacher:{type: mongoose.Schema.Types.ObjectId,ref: 'Teachers',required: true},
    
    room:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
});

export default mongoose.model('Rasps2', RaspSchema);