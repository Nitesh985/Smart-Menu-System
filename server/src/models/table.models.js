import {Schema, model} from 'mongoose'
import jwt from 'jsonwebtoken'

const tableSchema = new Schema({
    table_no:{
        type:String,
        required: true
    },
    occupied:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

  


export const Table = model("Table", tableSchema)

