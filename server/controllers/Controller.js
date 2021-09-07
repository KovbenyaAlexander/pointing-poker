const uuid = require("uuid");

const games = [];

class Controller {
  newGame(req, res) {
    try {
      const { userName, role } = req.body;
      if (userName.length > 4 && userName.length < 30) {
        const id = uuid.v4();
        games.push({
          id: id,
          users: [{ userName: userName, role: role }],
        });

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
      const gameIdx = games.findIndex((item) => {
        return item.id === id;
      });

      if (gameIdx === -1) {
        return res.status(400).json({ message: "game not found" });
      }

      if (userName.length < 4 || userName.length > 20) {
        return res.status(400).json({ message: "invalid nickname" });
      }

      const isUserAlreadyExist = games[gameIdx].users.findIndex(
        (user) => user.userName === userName
      );
      if (isUserAlreadyExist !== -1) {
        return res.status(400).json({ message: "User Already Exist" });
      }

      games[gameIdx].users.push({ userName, role });
      return res.status(200).json({ message: "join was successful" });
    } catch (e) {
      console.log(e);
    }
  }

  removeUser(req, res) {
    try {
      const { userName, id } = req.body;

      const gameIdx = games.findIndex((item) => {
        return item.id === id;
      });

      if (gameIdx === -1) {
        return res.status(400).json({ message: "game not found" });
      }

      const userIdx = games[gameIdx].users.findIndex(
        (user) => user.userName === userName
      );
      const newUsersArray = [
        ...games[gameIdx].users.slice(0, userIdx),
        ...games[gameIdx].users.slice(userIdx + 1),
      ];

      games[gameIdx].users = newUsersArray;

      return res.status(200).json({ message: "user deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  }

  getAllData(req, res) {
    return res.status(200).json(games);
  }
}

module.exports = new Controller();
