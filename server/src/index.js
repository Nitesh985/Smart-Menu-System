import "dotenv/config.js";
import app from "./app.js";
import { connectToDB } from "./db/index.js";
import { Category } from "./models/category.models.js";
import { Table } from "./models/table.models.js";
// import http from "http";
// import { Server } from "socket.io";
// import { sendEmail } from "./utils/Resend.js";
import { Resend } from 'resend';

// // const httpServer = http.createServer(app);

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
    app.get("/", (req, res) => {
      res.send("Welcome to the Smart Menu System");
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The app is listening on http://localhost:${port}`);
    });

    // const socketIO = new Server(httpServer, {
    //   cors: {
    //     origin: "*",
    //   },
    // });

    // //Add this before the app.get() block
    // socketIO.on("connection", (socket) => {
    //   console.log(`⚡: ${socket.id} user just connected!`);
    //   socket.emit('message', 'Welcome to the Smart Menu System')
    //   socket.on('client-message', (clientMessage) => {
    //     console.log(`Client message: ${clientMessage}`);
    //   })
    //   socket.on("disconnect", () => {
    //     console.log("🔥: A user disconnected");
    //   });
    // });

  })
  .catch((error) => {
    console.log("Connection to Mongodb failed ::", error);
  })
