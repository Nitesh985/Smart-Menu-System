import {Schema, model} from 'mongoose'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
}, { timestamps: true })

userSchema.methods.generateAccessToken = function (){
   return jwt.sign({
        _id: this._id
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id: this._id  
     }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
 }


export const User = model("User", userSchema)

