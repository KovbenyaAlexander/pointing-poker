const uuid = require("uuid");

const games = [
  {
    id: "Test-room-1",
    users: [
      {
        userName: "user1",
        role: "Role1",
      },
    ],
  },

  {
    id: "Test-room-2",
    users: [
      {
        userName: "user2",
        role: "Role2",
      },
    ],
  },

  {
    id: "Test-room-3",
    users: [
      {
        userName: "user3",
        role: "Role3",
      },
    ],
  },
];

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
        return res.json(id);
      } else {
        return res.json(`Invalid nickname`);
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
        return res.json(`game not found`);
      }

      if (userName.length < 4 || userName.length > 20) {
        return res.json(`invalid name`);
      }

      const isUserAlreadyExist = games[gameIdx].users.findIndex(
        (user) => user.userName === userName
      );
      if (isUserAlreadyExist !== -1) {
        return res.json(`User Already Exist`);
      }

      games[gameIdx].users.push({ userName, role });

      return res.json(true);
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
        return res.json(`game not found`);
      }

      const userIdx = games[gameIdx].users.findIndex(
        (user) => user.userName === userName
      );
      const newUsersArray = [
        ...games[gameIdx].users.slice(0, userIdx),
        ...games[gameIdx].users.slice(userIdx + 1),
      ];

      games[gameIdx].users = newUsersArray;

      return res.json(`user deleted successfully`);
    } catch (e) {
      console.log(e);
    }
  }

  getAllData(req, res) {
    return res.json(games);
  }
}

module.exports = new Controller();
