const Router = require("express").Router;
const Controller = require("../controllers/сontroller");
const router = new Router();

router.get("/", Controller.getAllData);
router.post("/newGame", Controller.newGame);
router.post("/join", Controller.join);
router.post("/removeUser", Controller.removeUser);

module.exports = router;
