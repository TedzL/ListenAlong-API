import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
}, { collection: 'users' });

export = mongoose.model('User', userSchema);