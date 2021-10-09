const uuid = require("uuid");
const { games } = require("./index");
const rooms = require("../sockets/socket-index");

class Game {
  newGame(req, res) {
    try {
      const { userName, settings } = req.body;
      if (!userName) {
        return res.status(400).json({ message: "Invalid data" });
      }

      if (userName.length < 4 && userName.length > 30) {
        return res.status(400).json({ message: "Invalid nickname" });
      }

      const id = uuid.v4();
      games.set(id, { settings: { isActive: false, ...settings, id } });
      return res.status(200).json({ ...settings, isActive: false, id });
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
      rooms.get(id).cancelGame();
      rooms.delete(id);

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

  changeGameActivity(req, res) {
    try {
      if (!req.body.hasOwnProperty("id")) {
        return res.status(400).json({ message: "Invalid data" });
      }
      const { id, isActive } = req.body;
      const game = games.get(id);
      if (!game) {
        return res.status(400).json({ message: "Game not found" });
      }

      game.settings.isActive = !isActive;
      rooms.get(id).setGameActive(game.settings.isActive);

      return res.status(200).json(game.settings.isActive);
    } catch (e) {
      console.log(e);
    }
  }

  updateSettings(req, res) {
    try {
      const { id, settings } = req.body;

      const game = games.get(id);
      if (!game) {
        return res.status(400).json({ message: "Game not found" });
      }

      game.settings = { isActive: game.settings.isActive, ...settings };
      const room = rooms.get(id);
      room.setSettings(settings);
      return res.status(200).send(settings);
    } catch (e) {
      console.log(e);
    }
  }

  getAllData(req, res) {
    return res.status(200).send(Array.from(games));
  }

  chekedIdKey(req, res) {
    const { id } = req.body;
    const room = rooms.get(id)
    const avalible = !room.game.isCompleted && (!room.game.isActive || room.game.settings.isAutoEntry);
    res.status(200).send(games.has(id) && avalible);
  }
}

module.exports = new Game();
