import {Schema, model} from "mongoose";

const categorySchema = new Schema({
    userId: String,
    name: String,
    color: String
},{
    timestamps: true
})

export default model("Category", categorySchema)