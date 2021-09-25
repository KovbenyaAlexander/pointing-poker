const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const PORT = 5000;
const app = express();
const socket = require("socket.io");
const uuid = require("uuid");

app.use(express.json());
app.use(cors());
app.use("/api", router);

const server = app.listen(
  PORT,
  console.log(`Server is running on the port: ${PORT} `)
);

//---SOCKETS------->>

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ name, id }) => {
    socket.join(id);

    // socket.emit("message", {
    //   name: "",
    //   message: `Welcome ${name}`,
    //   messageId: uuid.v4(),
    // });
  });

  socket.on("sendMessage", ({ name, id, message }) => {
    io.to(id).emit("message", {
      name,
      message,
      messageId: uuid.v4(),
    });
  });
});
