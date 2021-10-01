const { emitGameRemove, emitUserAdd } = require("../sockets/socket-action");
const games = require("./index");

class Controller {
  join(req, res) {
    try {
      const { user, id, } = req.body;
      const { name, role, userID} = user;
      if (!name || !role || !id) {
        return res.status(400).json({ message: "Invalid data" });
      }

      if (role !== "observer" && role !== "player") {
        return res.status(400).json({ message: "Invalid role" });
      }

      if (name.length < 4 || name.length > 30) {
        return res.status(400).json({ message: "Invalid nickname" });
      }

      let gameInfo = games.get(id);
      if (!gameInfo) {
        return res.status(400).json({ message: "Game not found" });
      }

      if (gameInfo.users.find((user) => user.userID === userID)) {
        return res.status(400).json({ message: "User Already Exist" });
      }

      const newUsers = [...gameInfo.users, { name, role }];
      const newSettings = {...gameInfo.settings, members: [...gameInfo.settings.members, user]}
      games.set(id, { settings: newSettings, users: newUsers});
      gameInfo = games.get(id)

      emitUserAdd(id, userName);
      return res.status(200).json({ game: gameInfo.settings, message: "Join was successful" });
    } catch (e) {
      console.log(e);
    }
  }

  removeUser(req, res) {
    try {
      const { userName, id } = req.body;

      if (!userName || !id) {
        return res.status(400).json({ message: "Invalid data" });
      }

      if (userName.length < 4 || userName.length > 30) {
        return res.status(400).json({ message: "Invalid nickname" });
      }

      const gameInfo = games.get(id);

      if (!gameInfo) {
        return res.status(400).json({ message: "Game not found" });
      }

      const newUsers = gameInfo.users.filter(
        (user) => user.userName !== userName
      );
      games.set(id, { ...gameInfo, users: newUsers });
      
      emitGameRemove(id, userName);

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Controller();
