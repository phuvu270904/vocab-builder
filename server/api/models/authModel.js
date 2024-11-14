import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true , collection: 'auth' });

export default mongoose.model('Auth', authSchema);