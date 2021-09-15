const Router = require("express").Router;
const Controller = require("../controllers/сontroller");
const Game = require("../controllers/game");
const {newUser, createUser} = require('../controllers/new-user')
const router = new Router();

router.get("/", Game.getAllData);
router.post("/newGame", Game.newGame);
router.post("/removeGame", Game.removeGame);
router.post("/getGame", Game.getGame);

router.post("/join", Controller.join);
router.post("/removeUser", Controller.removeUser);


router.get("/getUser", newUser)
router.post("/newsUser", createUser)
module.exports = router;
