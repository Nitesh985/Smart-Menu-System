import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Customer } from '../models/customer.models.js'

const loginAdmin = asyncHandler(async (req, res)=> {
    const {username, password} = req.body

    if (username!=="admin" || password!=="admin"){
        throw new ApiError(400, "The username or password doesn't match!")
    }

    const findAdmin = await Customer.findOne({
        $and:[{username}, {password}]
    })

    if (!findAdmin){
        throw new ApiError(404, "Admin not found!")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, findAdmin, "The admin is successfully logged in!")
    )

})