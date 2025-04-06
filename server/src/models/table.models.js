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


tableSchema.methods.generateAccessToken = function (){
   return jwt.sign({
        data:{_id: this._id}  
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

tableSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
         data:{_id: this._id}  
     }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
 }
  


export const Table = model("Table", tableSchema)

