const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const { Server } = require('socket.io');
const { initSocket } = require('./sockets/socket-main');
const { json } = require("express");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(json({ limit: '50mb' }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "*"], credentials: true }));
app.use("/api", router);
app.options('/api', cors);

const server = app.listen(PORT, () => console.log(`Start on ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: '*',
    allowedHeaders: 'Access-Control-Allow-Origin',
    methods: ['GET', 'POST'],
    credentials: true,
    
  },
  transports : ['websocket', 'polling']
});



io.on('connection', initSocket);
