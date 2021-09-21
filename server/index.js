const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const PORT = 5000;
const app = express();
const socket = require("socket.io");

app.use(express.json());
app.use(cors());
app.use("/api", router);

const server = app.listen(
  PORT,
  console.log(`Server is running on the port: ${PORT} `)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("sendMessage", ({ gameID, userName, message }) => {
    // console.log(`------------`);
    // console.log(gameID);
    // console.log(userName);
    // console.log(message);

    console.log(socket.id);

    io.to(gameID).emit("message", {
      userName: userName,
      message: message,
    });
  });
});

// const express = require("express");
// const app = express();
// const socket = require("socket.io");
// const cors = require("cors");

// app.use(express());

// const port = 8000;

// // app.use(cors({ "Access-Control-Allow-Origin": "*" }));

// var server = app.listen(
//   port,
//   console.log(`Server is running on the port: ${port} `)
// );

// const io = socket(server);

// io.on("connection", (socket) => {
//   socket.on("chat", (text) => {
//     console.log(text);
//   });
// });
