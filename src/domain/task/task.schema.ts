import {Schema, model} from "mongoose"

const taskSchema = new Schema({
    title: String, 
    description: String, 
    conclusion: Date,
    type: String,
    categoryId: String,
    status: String,
    userId: String,
}, {
    timestamps: true
})

export default model("Task", taskSchema)