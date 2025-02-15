import { User } from "../models/user.models.js";
import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { sendEmail } from "../utils/index.js";

const refreshAccessToken = asyncHandler(async (req, res)=> {
    const refreshToken = req?.cookies?.refreshToken || req?.header("authorization")?.split(" ")[1]
    if (!refreshToken){
        throw new ApiError(403, "Your session has expired, please log back in")
    }
  
    let userId;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data)=>{
        if (err){
            throw new ApiError(403, err.message || "The token must have expired")
        }
        userId = data?._id
    })
  
    const userExists = await User.findById(userId)

    if (!userExists){
        throw new ApiError(404, "The user by that id is not found")
    }
  
    const accessToken = userExists.generateAccessToken()
  
    const options = {
        httpOnly: true,
        secure: true
    }
  
    return res
        .status(200)
        .cookie("token", accessToken, options)
        .json(
            new ApiResponse(200, {}, "The access token was generated successfully")
        )
  
    
  })

const registerUser = asyncHandler(async (req, res)=>{
    const { email, username, address, contactNo } = req.body;
    const reqFields = ["email", "username", "contactNo"];

    reqFields.forEach((field) => {
        if (!req.body[field]) {
          throw new ApiError(401, `The ${field} field is required.`);
        }
      });
      
    // const emailSend = await sendEmail(email.toLowerCase(), username)

    // if (!emailSend) {
    //     throw new ApiError(400, "Invalid email!");
    // }
    
    // console.log(emailSend)
    const user = await User.create({email:email.toLowerCase(), username, address, contactNo})
    console.log(user)

    if (!user){
        throw new ApiError(500, "Failed to create user");
    }

    const savedUser = await User.findById(user._id)
    console.log("Saved User")
    console.log(savedUser)

    const accessToken = savedUser.generateAccessToken()
    const refreshToken = savedUser.generateRefreshToken()

    const data = {...savedUser, token:accessToken}
    console.log(data)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, data, "The user is registered successfully!")
    )
})


export { registerUser, refreshAccessToken };