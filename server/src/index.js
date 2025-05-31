import "dotenv/config.js";
import app from "./app.js";
import { connectToDB } from "./db/index.js";
import { Category } from "./models/category.models.js";
import { Dish } from "./models/dish.models.js";
import { User } from "./models/user.models.js";
import { Table } from "./models/table.models.js";
import { Payment } from "./models/payment.models.js";
import http from "http";
import { Server } from "socket.io";
// import { sendEmail } from "./utils/Resend.js";
import { Resend } from 'resend';
import { Order } from "./models/order.models.js";

// const httpServer = http.createServer(app);

// const socketIO = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// // // GETTING THE IP ADDRESS
// // import { networkInterfaces } from 'os';

// // const nets = networkInterfaces();
// // const results = Object.create(null); // Or just '{}', an empty object

// // for (const name of Object.keys(nets)) {
// //     for (const net of nets[name]) {
// //         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
// //         // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
// //         const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
// //         if (net.family === familyV4Value && !net.internal) {
// //             if (!results[name]) {
// //                 results[name] = [];
// //             }
// //             results[name].push(net.address);
// //         }
// //     }
// // }
// // console.log(results["Wi-Fi"][0]) 
connectToDB() 

.then(() => {
  //Add this before the app.get() block
  // socketIO.on("connection", (socket) => {
  //   socket.on("user-order", async (orderId)=>{
  //     const order = await Order.findById(orderId)
  //     console.log("Hey there!")
  //     console.log(order)
  //     socketIO.emit("order-status", order)
      
  //     const orders = await Order.find({status:"PENDING"})
  //     socketIO.emit("reception", orders)
  //   })
  
  //   socket.on("order-accepted", async (orderId)=>{
  //     const order = await Order.findById(orderId)
  //     socketIO.emit("order-status", order)
      
  
  //     const orders = await Order.find({status:"ACCEPTED"})
  //     socketIO.emit("kitchen", orders)
  
  //   })
  
  //   socket.on("order-ready", async(orderId)=>{
  //     const order = await Order.findById(orderId)
  //     socketIO.emit("order-status", order)
  //   })
  // });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The app is listening on http://localhost:${port}`);
    });



  })
  .catch((error) => {
    console.log("Connection to Mongodb failed ::", error);
  })



