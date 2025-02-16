import {Feedback} from '../models/feedback.models.js'
import {Order} from '../models/order.models.js'
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';
import mongoose from 'mongoose'


const writeFeedback = asyncHandler(async(req, res)=>{
    const {message, rating} = req.body

    const reqFields = ["message", "rating"];

    reqFields.forEach((field) => {
        if (!req.body[field]) {
          throw new ApiError(401, `The ${field} field is required.`);
        }
      });

    const feedback = await Feedback.create({userId:req?.user?._id, message, rating:Number(rating)})

      return res.status(200)
      .json(
        new ApiResponse(200, feedback, "Feedback submitted successfully")
      )

})

const getAllFeedbacks = asyncHandler(async(req, res)=>{
    const feedbackDetails = await Feedback.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                  username:1
              }
            }
          ],
        },
      },
      {
        $addFields:{
          user:{
              $first: "$user"
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ])


    // const feedbackDetails = await Order.aggregate([
    //   {
    //     $lookup: {
    //       from: "feedbacks",
    //       localField: "_id",
    //       foreignField: "orderId",
    //       as: "reviewers",
    //       pipeline: [
    //         {
    //           $lookup: {
    //             from: "users",
    //             localField: "userId",
    //             foreignField: "_id",
    //             as: "reviewer",
    //             pipeline: [
    //               {
    //                   $project: {
    //                       username:1
    //                   }
    //               }
    //             ]
    //           },
    //         },
    //         {
    //           $addFields:{
    //               reviewer:{
    //                   $first: "$reviewer"
    //               }
    //           }
    //         }
    //       ],
    //     },
    //   },
    //   {
    //     $addFields: {
    //       reviewCount: {
    //         $size: "$reviewers",
    //       },
    //     },
    //   },
    //   {
    //     $project:{
    //       reviewers:1,
    //       reviewCount:1,
    //     }
    //   }
    // ]);
  
    if (!feedbackDetails.length) {
      throw new ApiError(500, "Something went wrong getting the review details");
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
            feedbackDetails,
          "The feedback details were gotten succesfully"
        )
      );
})

export { writeFeedback, getAllFeedbacks }