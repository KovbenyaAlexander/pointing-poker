const uuid = require("uuid");
const games = require("./index");

class Game {
  newGame(req, res) {
    try {
      const { userName } = req.body;

      if (!userName) {
        return res.status(400).json({ message: "Invalid data" });
      }

      if (userName.length < 4 && userName.length > 30) {
        return res.status(400).json({ message: "Invalid nickname" });
      }

      const id = uuid.v4();
      const usersArray = [{ userName, role: "dealer" }];
      games.set(id, { usersArray, settings: { isActive: false } });
      return res.status(200).json(id);
    } catch (e) {
      console.log(e);
    }
  }

  removeGame(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Invalid data" });
      }

      games.delete(id);
      return res.status(200).json({ message: "Game deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  }

  getGame(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const game = games.get(id);

      if (!game) {
        return res.status(200).json(false);
      }

      return res.status(200).json(game);
    } catch (e) {
      console.log(e);
    }
  }

  activateGame(req, res) {
    try {
      if (
        !req.body.hasOwnProperty("id") ||
        !req.body.hasOwnProperty("gameName") ||
        !req.body.hasOwnProperty("isDealerInGame") ||
        !req.body.hasOwnProperty("isAutoEntry") ||
        !req.body.hasOwnProperty("isAutoFinish") ||
        !req.body.hasOwnProperty("isVoteMutable") ||
        !req.body.hasOwnProperty("estimationType") ||
        !req.body.hasOwnProperty("isTimerRequired") ||
        !req.body.hasOwnProperty("timerValue")
      ) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const game = games.get(req.body.id);

      game.settings.isActive = true;
      game.settings.gameName = req.body.gameName;
      game.settings.isDealerInGame = req.body.isDealerInGame;
      game.settings.isAutoEntry = req.body.isAutoEntry;
      game.settings.isVoteMutable = req.body.isVoteMutable;
      game.settings.isVoteMutable = req.body.isVoteMutable;
      game.settings.estimationType = req.body.estimationType;
      game.settings.estimationType = req.body.estimationType;
      game.settings.isTimerRequired = req.body.isTimerRequired;
      game.settings.timerValue = req.body.timerValue;

      return res.status(200).json({ message: "Game activated successfully" });
    } catch (e) {
      console.log(e);
    }
  }

  getAllData(req, res) {
    return res.status(200).send(Array.from(games));
  }
}

module.exports = new Game();
