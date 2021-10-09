const Router = require("express").Router;
const Controller = require("../controllers/сontroller");
const Game = require("../controllers/game");
const router = new Router();

router.get("/", Game.getAllData);
router.post("/newGame", Game.newGame);
router.post("/removeGame", Game.removeGame);
router.post("/getGame", Game.getGame);
router.post("/changeGameActivity", Game.changeGameActivity);
router.post("/updateSettings", Game.updateSettings);
router.post("/checkedIdKey", Game.chekedIdKey)
router.post("/join", Controller.join);
router.post("/removeUser", Controller.removeUser);
router.post("/uploadPhoto", Controller.uploadPhoto);

module.exports = router;
