const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const { Server } = require('socket.io');
const { initSocket } = require('./sockets/socket-main');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "*"], }));
app.use("/api", router);

const server = app.listen(PORT, () => console.log(`Start on ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});



io.on('connection', initSocket);
