import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    properties: { type: Map, of: String },
    unsubscribed: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema);
