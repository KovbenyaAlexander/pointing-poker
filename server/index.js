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
  socket.on("joinRoom", ({ name, id }) => {
    socket.join(id);
  });

  socket.on("sendMessage", ({ name, id, message }) => {
    console.log(message);

    io.to(id).emit("message", {
      name,
      message,
    });
  });
});
