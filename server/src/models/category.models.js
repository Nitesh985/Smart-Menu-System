import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    image:{
        type:{
            url:String,
            public_id:String
        }
    }
}, { timestamps: true })

export const Category = model("Category", categorySchema)