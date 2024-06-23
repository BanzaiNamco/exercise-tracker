import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true }
});

export const User = mongoose.model('user', userSchema);