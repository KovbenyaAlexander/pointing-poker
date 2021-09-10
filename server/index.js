const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api", router);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Start - ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
