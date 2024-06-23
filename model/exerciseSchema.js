import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    _id: { type: String, required: true },
    description : { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now()}
});

export const Exercise = mongoose.model('exercise', exerciseSchema);