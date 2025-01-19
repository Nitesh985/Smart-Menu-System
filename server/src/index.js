import app from "./app.js";
import "dotenv/config.js";
import { connectToDB } from "./db/index.js";
import { Category } from "./models/category.models.js";
import http from "http";
import { Server } from "socket.io";

// const httpServer = http.createServer(app);




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
  });
