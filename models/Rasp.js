import mongoose from "mongoose";

const RaspSchema = mongoose.Schema({
    time:{
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    predmed:{
        type: String,
        required: true
    },
    group:{
        type: String,
        required: true
    },
    teacher:{
        type: String,
        required: true
    },
    kurs:{
        type: String,
        required: true
    },
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

export default mongoose.model('Rasps', RaspSchema);