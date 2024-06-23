import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description : { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now()},
    userId: { type: ObjectId, required: true }
});

export const Exercise = mongoose.model('exercise', exerciseSchema);