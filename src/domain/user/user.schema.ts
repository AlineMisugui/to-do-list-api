import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
    password_salt: String,
    email: String,
    weight: Number
}, {
    timestamps: true
});

export default model("User", userSchema)