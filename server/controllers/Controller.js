const uuid = require("uuid");

let games = new Map();

class Controller {
  newGame(req, res) {
    try {
      const { userName, role } = req.body;
      if (userName.length > 4 && userName.length < 30) {
        const id = uuid.v4();
        const usersArray = [{ userName, role }];
        games.set(id, usersArray);
        return res.status(200).json(id);
      } else {
        return res.status(400).json({ message: "Invalid nickname" });
      }
    } catch (e) {
      console.log(e);
    }
  }

  join(req, res) {
    try {
      const { userName, id, role } = req.body;
      const users = games.get(id);

      if (!users) {
        return res.status(400).json({ message: "Game not found" });
      }

      if (userName.length < 4 || userName.length > 30) {
        return res.status(400).json({ message: "Invalid nickname" });
      }

      const isUserAlreadyExist = users.findIndex(
        (user) => user.userName === userName
      );

      if (isUserAlreadyExist !== -1) {
        return res.status(400).json({ message: "User Already Exist" });
      }

      users.push({ userName, role });
      return res.status(200).json({ message: "Join was successful" });
    } catch (e) {
      console.log(e);
    }
  }

  removeUser(req, res) {
    try {
      const { userName, id } = req.body;
      const users = games.get(id);

      if (!users) {
        return res.status(400).json({ message: "Game not found" });
      }

      if (userName.length < 4 || userName.length > 30) {
        return res.status(400).json({ message: "Invalid nickname" });
      }

      const newUsers = users.filter((user) => user.userName !== userName);
      games.set(id, newUsers);

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  }

  getAllData(req, res) {
    return res.status(200).send(Array.from(games));
  }
}

module.exports = new Controller();
