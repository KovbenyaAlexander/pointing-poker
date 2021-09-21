const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const { Server } = require('socket.io');
const PORT = 5000;

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

const sokets = [];

io.on('connection', (soket) => {
  sokets.push(soket);
  console.log('Connected with user')
  soket.on('updateState', store => {
    console.log(store);
  });
});