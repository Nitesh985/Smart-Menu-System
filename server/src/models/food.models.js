import {Schema, model} from 'mongoose'


const foodSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type:Strig
    },
    description: {
        type: String
    },
    price:{
        type:Number,
        required: true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
}, { timestamps: true })


export const Food = model("Food", foodSchema)

