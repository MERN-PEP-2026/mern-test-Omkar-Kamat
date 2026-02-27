import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Course", courseSchema);
