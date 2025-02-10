import { ApiError } from "../utils/ApiError.js"
import { Table } from "../models/table.models.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js"


const verifyJWT = asyncHandler(async (req, res, next) => {
    const accessToken = req?.cookies?.accessToken || req?.header("authorization")?.split(" ")[1]
  
    if (!accessToken){
        throw new ApiError(403, "Not authenticated")
    }
    
    let tableId

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
        if (err){
            throw new ApiError(err.status || 401, err?.message || "The token is invalid or has expired")
        }
        tableId = data?._id
    })  


    const table = await Table.findById(tableId)

    if (!user){
        throw new ApiError(404, "The table by that id is not found")
    }

    req.table = table
    next()
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

export { verifyJWT, verifyAdmin }