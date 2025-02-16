import { Schema, model } from 'mongoose'

const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    message:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const Feedback = model("Feedback", feedbackSchema)