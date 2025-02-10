import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Table } from "../models/table.models.js";


const refreshAccessToken = asyncHandler(async (req, res)=> {
  const prevRefreshToken = req?.cookies?.refreshToken || req?.header("authorization")?.split(" ")[1]
  if (!prevRefreshToken){
      throw new ApiError(403, "Your session has expired, please log back in")
  }

  let tableId;
  jwt.verify(prevRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data)=>{
      if (err){
          throw new ApiError(403, err.message || "The token must have expired")
      }
      tableId = data?._id
  })


  const table = await Table.findById(tableId)

  if (!table){
      throw new ApiError(401, "Bad request, the table by that id doesn't exists")
  }

  if (table.refreshToken !== prevRefreshToken){
      throw new ApiError(403, "Invalid refresh token!")
  }

  const accessToken = table.generateAccessToken()

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
          new ApiResponse(200, {}, "The access token was generated successfully")
      )

  
})




const loginTable = asyncHandler(async (req, res)=> {
  const {tableId} = req.body;

  const table = await Table.findById(tableId)

  if (!table){
    throw new ApiError(404, "Table not found!")
  }

  const accessToken = table.generateAccessToken()
  const refreshToken = table.generateRefreshToken()
  
  const updatedTable = await Table.findByIdAndUpdate(table._id, {
    refreshToken
  }).select('-refreshToken')

  

  const options = {
    httpOnly: true,
    secure: true
}

  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(200, updatedTable, "The table is logged in successfully")
  )
})

const loginOutTable = asyncHandler(async (req, res)=> {
    await Table.findByIdAndUpdate(req.table._id, {
        refreshToken: null,
    })


  const options = {
    httpOnly: true,
    secure: true
}

  return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, null, "The table logged out successfully")
        )

})

const getTable = asyncHandler(async(req, res)=>{
    const { tableId } = req.params;
    const table = await Table.findById(tableId)
    
    if (!table){
        throw new ApiError(404, "Table not found!")
    }
    
    return res.status(200)
    .json(
        new ApiResponse(200, table, "The table fetched successfully")
    )
})


const getAllTables = asyncHandler(async(req, res)=>{
    const tables = await Table.find({})

    if (!tables){
        throw new ApiError(500, "Something went wrong fetching the tables")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, tables, "All the tables fetched successfully")
    )

})

export {
    getAllTables,
    getTable,
    loginTable,
    loginOutTable,
    refreshAccessToken
}