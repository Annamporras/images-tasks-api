import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    resolution: Number,
    path: String
});

const TaskSchema = new mongoose.Schema({
    _id: { type: String },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    originalPath: { type: String, required: true },
    images: [ImageSchema]

}, {
    timestamps: true,
    versionKey: false,
});

export const TaskModel = mongoose.model("Task", TaskSchema);