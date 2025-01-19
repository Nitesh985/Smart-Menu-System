import {Schema, model} from 'mongoose'

const tableSchema = new Schema({
    table_no:{
        type:String,
        required: true
    },
}, { timestamps: true })


export const Table = model("Table", tableSchema)

