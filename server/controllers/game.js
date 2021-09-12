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
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const game = games.get(id);
      game.settings.isActive = true;

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
