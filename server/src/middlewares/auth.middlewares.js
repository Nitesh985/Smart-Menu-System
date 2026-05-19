import { ApiError } from "../utils/ApiError.js";
import { Table } from "../models/table.models.js";
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const verifyAuth = asyncHandler(async(req, res, next)=>{
    const accessToken = req.cookies?.accessToken || req.header("authorization")?.split(" ")[1];

    if (!accessToken){
        throw new ApiError(403, "Not authenticated");
    }

    let userId;
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
        if (err){
            throw new ApiError(err.status || 401, err?.message || "The token is invalid or has expired");
        }
        userId = data?._id;
    });

    const user = await User.findById(userId);
    if (!user){
        throw new ApiError(404, "The user by that id is not found");
    }

    req.user = user;
    next();
});

const verifyTable = asyncHandler(async (req, res, next) => {
    // Read the custom header passed from the customer's scanned table application
    const tableId = req.header("x-table-id");
  
    if (!tableId){
        throw new ApiError(400, "Table session missing. Please re-scan the table QR code.");
    }
    
    const table = await Table.findById(tableId);
    if (!table){
        throw new ApiError(404, "The table session is invalid or does not exist.");
    }

    // Attach table data securely to request object context
    req.table = table;
    next();
});

const verifyAdmin = asyncHandler(async(req, res, next)=>{
    if (!req.user || req.user.role !== 1) {
        throw new ApiError(403, "Unauthorized Admin Access");
    }
    next();
});

export { verifyTable, verifyAdmin, verifyAuth };