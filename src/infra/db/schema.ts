import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    _id: { type: String },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    originalPath: { type: String, required: true }

}, {
    timestamps: true,
    versionKey: false,
});

export const TaskModel = mongoose.model("Task", TaskSchema);