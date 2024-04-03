import {Schema, model} from "mongoose"

const taskSchema = new Schema({
    title: String, 
    description: String, 
    conclusion: Date,
    type: String,
    categoryId: String,
    status: ["PENDING", "IN_COURSE", "FINALIZED"],
    userId: String
}, {
    timestamps: true
})

export default model("Task", taskSchema)