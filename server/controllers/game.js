const uuid = require("uuid");
const { emitChangeGameActivity, emitUpdateSetting, emitGameRemove } = require("../sockets/socket-action");
const games = require("./index");

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
      const users = [{ userName, role: "dealer" }];
      games.set(id, { users, settings: { isActive: false, ...settings } });
      return res.status(200).json({ id, ...settings, isActive: false });
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

      emitGameRemove(id);
      
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

      const game = games.get(req.body.id);
      if (!game) {
        return res.status(400).json({ message: "Game not found" });
      }

      const isActive = req.body.isActive;
      game.settings.isActive = !isActive;

      emitChangeGameActivity(id, game.settings.isActive);

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
      
      emitUpdateSetting(id, game.settings);

      return res.status(200).send(settings);
    } catch (e) {
      console.log(e);
    }
  }

  getAllData(req, res) {
    return res.status(200).send(Array.from(games));
  }
}

module.exports = new Game();
