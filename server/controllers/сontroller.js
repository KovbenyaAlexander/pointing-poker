const rooms = require("../sockets/socket-index");
const { games, userImages } = require("./index");

class Controller {
  join(req, res) {
    try {
      const { user, id } = req.body;
      const { name, role, userID } = user;

      // User Validate
      if (!name || !role || !id) {
        return res.status(400).json({ message: "Invalid data" });
      }

      if (role !== "observer" && role !== "player" && rooms.get(id)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      if (name.length < 1 || name.length > 30) {
        return res.status(400).json({ message: "Invalid nickname" });
      }

      // Game Validate
      const room = rooms.get(id);
      if (!room) {
        return res.status(400).json({ message: "Game not found" });
      }

      if (rooms.get(id).isUserExists(userID)) {
        return res.status(400).json({ message: "User Already Exist" });
      }

      return res
        .status(200)
        .json({ game: room.game, message: "Join was successful" });
    } catch (e) {}
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

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  }

  uploadPhoto(req, res) {
    try {
      const { image, userID } = req.body;
      userImages.set(userID, image);
      return res.status(200).json({message: 'image Added'});
      
    }
    catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Controller();
