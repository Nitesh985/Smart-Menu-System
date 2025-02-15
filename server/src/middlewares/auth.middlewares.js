import { ApiError } from "../utils/ApiError.js"
import { Table } from "../models/table.models.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"

const verifyAuth = asyncHandler(async(req, res, next)=>{
    const accessToken = req.cookies?.accessToken || req.header("authorization")?.split(" ")[1]

    if (!accessToken){
        throw new ApiError(403, "Not authenticated")
    }

    let userId

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
        if (err){
            throw new ApiError(err.status || 401, err?.message || "The token is invalid or has expired")
        }
        userId = data?._id
    })
    console.log(userId)

    const user = await User.findById(userId)

    if (!user){
        throw new ApiError(404, "The user by that id is not found")
    }

    req.user = user
    next()

})

const verifyTable = asyncHandler(async (req, res, next) => {
    next()
    // const accessToken = req?.cookies?.accessToken || req?.header("authorization")?.split(" ")[1]
  
    // if (!accessToken){
    //     throw new ApiError(403, "Not authenticated")
    // }
    
    // let tableId

    // jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
    //     if (err){
    //         throw new ApiError(err.status || 401, err?.message || "The token is invalid or has expired")
    //     }
    //     tableId = data?._id
    // })  


    // const table = await Table.findById(tableId)

    // if (!table){
    //     throw new ApiError(404, "The table by that id is not found")
    // }

    // req.table = table
    // next()
})

const verifyAdmin = asyncHandler(async(req, res, next)=>{
    next()
    // const user = await userModel.findById(req.user._id);
    // if (user.role !== 1) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "UnAuthorized Access",
    //   });
    // } else {
    //   next();
    // }
})

export { verifyTable, verifyAdmin, verifyAuth }