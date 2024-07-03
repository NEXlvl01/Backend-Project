import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res) => {
   const {username, password, fullname, email} = req.body;
   console.log("email ",email);

   if(fullname === "" || password === "" || username === "" || email === "") {
      throw new ApiError(400,"All Fields are compulsory");
   }

   const existedUser = User.findOne({
      $or: [{email},{username}]
   })

   if (existedUser) {
      throw new ApiError(409,"User with email or username already exists");
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.avatar[0]?.path;

   if(!avatarLocalPath) {
      throw new ApiError(400,"Avatar is required");
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar) {
      throw new ApiError(400,"Avatar is required");
   }

   const user = await User.create({
      fullname,
      avatar : avatar.url,
      coverImage : coverImage?.url || "",
      email,
      password,
      username : username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(!createdUser) {
      throw new ApiError(500,"Something went wrong while registering User");
   }

   return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered successfully")
   )
})

export default registerUser;