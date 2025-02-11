import {Schema, model} from 'mongoose'


const dishSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type:{
            url:String,
            public_id:String
        }
    },
    quantity:{
        type: Number
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
        ref:"Category",
        required: true
    }
}, { timestamps: true })


export const Dish = model("Dish", dishSchema)

