import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Dish } from "../models/dish.models.js";
import { Order } from "../models/order.models.js";
import { Table } from "../models/table.models.js";
import mongoose from "mongoose";


function getUpdates (items1, items2){
  return items2.map((item2) => {
   const toUpdate = items1.find((item1) => item2._id === item1._id);
   if (toUpdate) {
     return { ...item2, quantity:item2.quantity - toUpdate.quantity}
   }
   return {_id:item2._id, quantity:item2.quantity};
 });
}


const makeOrder = asyncHandler(async (req, res) => {
  const { table_no, note, orderItems } = req.body;
  const reqFields = ["table_no", "orderItems"];

  const findTable = await Table.findOne({
    table_no,
  });

  reqFields.forEach((field) => {
    if (!req.body[field]) {
      throw new ApiError(401, `The ${field} field is required.`);
    }
  });

  if (!orderItems.length) {
    throw new ApiError(404, "No dishes were selected!");
  }

  orderItems.map(async (food) => {
    const foodItem = await Dish.findByIdAndUpdate(food._id, {
      $inc: { stock: -food.quantity },
    });
    if (!foodItem) {
      throw new ApiError(404, `The food with id ${food._id} is not found.`);
    }
  });

  const findUserOrder = await Order.findOne({_id:new mongoose.Types.ObjectId(req.user._id), status:"PENDING"})


  
  
  if (!findUserOrder){
    const order = await Order.create({
      tableId: findTable?._id,
      orderedBy:req.user._id,
    note,
    orderItems,
    totalPrice: orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "The order placed successfully"));
}
    const totalPrice = orderItems.reduce((acc, item)=>acc+item.price*item.quantity, 0).toFixed(2)
    const updatedOrder = await Order.findByIdAndUpdate(findUserOrder._id, {
      $push: { orderItems: orderItems },
      $inc: { totalPrice}
    }, {new:true})

    return res.status(201)
    .json(new ApiResponse(202, updatedOrder, "The order was edited successfully!"))
    
  });
  
  
const updateOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
  
    const order = await Order.findById(orderId)
  
    if (!order) {
      throw new ApiError(404, "Order not found!");
    }
    if (order.status === 'READY'){
      throw new ApiError(400, "Cannot update a completed order!");
    }
  
    const {orderItems} = req.body
  
    if (orderItems){
      const updatedItems = getUpdates(order.orderItems, orderItems)
  
      const dishes = await Dish.find({ _id: { $in: updatedItems.map((item) => item._id) } });
      dishes.forEach(async (dish) => {
        if (dish?.stock){
          await Dish.findByIdAndUpdate(dish._id, {
          $inc: { stock: -dish.quantity },
        });}
      });
    }
  
  
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
  
  
    return res
      .status(202)
      .json(new ApiResponse(202, updatedOrder, "The order updated successfully"));
  });


const getAllOrders = asyncHandler(async (req, res) => {
  const {status} = req.query

  const orders = await Order.aggregate([
    {
      $match:{
        status:status?.toUpperCase()
      }
    },
    {
      $lookup: {
        from: "tables",
        localField: "tableId",
        foreignField: "_id",
        as: "table",
      },
    },
    {
      $addFields: {
        table: {
          $first: "$table",
        },
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "orderItems._id",
        foreignField: "_id",
        as: "dishes",
      },
    },
    {
      $lookup:{
        from: "payments",
        localField: "_id",
        foreignField: "orderId",
        as: "payment"
      }
    },
    {
      $addFields:{
        payment:{
          $first:"$payment"
        }
      }
    },
    {
      $project: {
        _id: 1,
        table_no: "$table.table_no",
        orderType: 1,
        note: 1,
        totalPrice: 1,
        status:1,
        isEditing:1,
        orderItems: {
          $map: {
            input: "$dishes",
            in: {
              $let: {
                vars: {
                  m: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$orderItems",
                          cond: {
                            $eq: ["$$mb._id", "$$this._id"],
                          },
                          as: "mb",
                        },
                      },
                      0,
                    ],
                  },
                },
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      quantity: "$$m.quantity",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  ]);

  // const updatedOrders = orders.map((order)=>order.orderItems.map(async item => {
  //         return await Dish.findById(item._id)
  //     }))

  return res.json(
    new ApiResponse(200, orders, "All orders fetched sucessfully!")
  );
});

const getOrders = asyncHandler(async (req, res) => {
  const { orderType } = req.params;

  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "tables",
        localField: "table_no",
        foreignField: "_id",
        as: "table",
      },
    },
    {
      $addField: {
        table_no: "$table.table_no",
      },
    },
    {
      $match: {
        orderType,
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "orderItems._id",
        foreignField: "_id",
        as: "dishes",
      },
    },
    {
      $lookup:{
        from: "payments",
        localField: "_id",
        foreignField: "orderId",
        as: "payment"
      }
    },
    {
      $addFields:{
        payment:{
          $first:"$payment"
        }
      }
    },
    {
      $project: {
        _id: 1,
        table_no: 1,
        orderType: 1,
        note: 1,
        totalPrice: 1,
        status:1,
        isEditing:1,
        orderItems: {
          $map: {
            input: "$dishes",
            in: {
              $let: {
                vars: {
                  m: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$orderItems",
                          cond: {
                            $eq: ["$$mb._id", "$$this._id"],
                          },
                          as: "mb",
                        },
                      },
                      0,
                    ],
                  },
                },
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      quantity: "$$m.quantity",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  ]);

  return res.json(
    new ApiResponse(200, orders, "The orders fetched successfully")
  );
});

const getOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  // const order = await Order.aggregate([
  //   {
  //     $match: {
  //       orderedBy: req.user?._id
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "tables",
  //       localField: "tableId",
  //       foreignField: "_id",
  //       as: "table_no",
  //     },
  //   },
  //   {
  //     $addFields: {
  //       table_no: {
  //         $first: "$table_no.table_no",
  //       },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "dishes",
  //       localField: "orderItems._id",
  //       foreignField: "_id",
  //       as: "dishes",
  //     },
  //   },
  //   {
  //     $lookup:{
  //       from: "payments",
  //       localField: "_id",
  //       foreignField: "orderId",
  //       as: "payment"
  //     }
  //   },
  //   {
  //     $addFields:{
  //       payment:{
  //         $first:"$payment"
  //       }
  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       table_no: 1,
  //       orderType: 1,
  //       note: 1,
  //       totalPrice: 1,
  //       payment:1,
  //       status:1,
  //       isEditing:1,
  //       orderItems: {
  //         $map: {
  //           input: "$dishes",
  //           in: {
  //             $let: {
  //               vars: {
  //                 m: {
  //                   $arrayElemAt: [
  //                     {
  //                       $filter: {
  //                         input: "$orderItems",
  //                         cond: {
  //                           $eq: ["$$mb._id", "$$this._id"],
  //                         },
  //                         as: "mb",
  //                       },
  //                     },
  //                     0,
  //                   ],
  //                 },
  //               },
  //               in: {
  //                 $mergeObjects: [
  //                   "$$this",
  //                   {
  //                     quantity: "$$m.quantity",
  //                   },
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // ])



  const order = await Order.aggregate([
    { 
      $match: {
        _id: new mongoose.Types.ObjectId(orderId),
      },
    },
    {
      $lookup: {
        from: "tables",
        localField: "tableId",
        foreignField: "_id",
        as: "table_no",
      },
    },
    {
      $addFields: {
        table_no: {
          $first: "$table_no.table_no",
        },
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "orderItems._id",
        foreignField: "_id",
        as: "dishes",
      },
    },
    {
      $lookup:{
        from: "payments",
        localField: "_id",
        foreignField: "orderId",
        as: "payment"
      }
    },
    {
      $addFields:{
        payment:{
          $first:"$payment"
        }
      }
    },
    {
      $project: {
        _id: 1,
        table_no: 1,
        orderType: 1,
        note: 1,
        totalPrice: 1,
        payment:1,
        status:1,
        isEditing:1,
        orderItems: {
          $map: {
            input: "$dishes",
            in: {
              $let: {
                vars: {
                  m: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$orderItems",
                          cond: {
                            $eq: ["$$mb._id", "$$this._id"],
                          },
                          as: "mb",
                        },
                      },
                      0,
                    ],
                  },
                },
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      quantity: "$$m.quantity",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  ]);




  return res
    .status(200)
    .json(new ApiResponse(200, order, "The order fetched successfully"));
});


const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId)

  if (!order) {
    throw new ApiError(404, "Order not found!");
  }
 
  const dishes = await Dish.find({ _id: { $in: order.orderItems.map((item) => item._id) } });


  dishes.forEach(async (dish) => {
    if (dish?.stock){
      await Dish.findByIdAndUpdate(dish._id, {
      $inc: { stock: dish.quantity },
    });}
  });

  const deleteOrder = await Order.findByIdAndDelete(orderId);


  if (!deleteOrder) {
    throw new ApiError(500, "Internal Server error while deleting the order");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        `The order by order id ${orderId} is successfully deleted`
      )
    );
});

export { makeOrder, getAllOrders, getOrders, getOrder, deleteOrder, updateOrder };
