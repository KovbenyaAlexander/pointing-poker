const { setSocketListeners } = require("./socket-action");
const rooms = require("./socket-index");
const uuid = require("uuid");

class SocketUser {
  userInfo;
  socket;
  disconnected;

  constructor(socket, userInfo) {
    this.socket = socket;
    this.userInfo = userInfo;
    this.disconnected = false;
  }
}

class Room {
  id;
  game;
  dealer;
  members;
  excludeQueue;
  currentExcludor;

  constructor(id, game, socket) {
    this.id = id;
    this.game = game;
    this.dealer = socket;
    this.members = [];
    this.excludeQueue = [];
    this.currentExcludor = undefined;
  }

  sendServiceMessage(message) {
    this.emit(`updateChatMessages`, {
      message,
      messageId: uuid.v4(),
      isServiceMessage: true,
    });
  }

  join(user) {
    if (user) {
      this.members.push(user);
      this.sendServiceMessage(`${user.userInfo.name} joined`);
    }
  }

  finishGame() {
    this.emit("gameEnd");
    this.sendServiceMessage(`the game is over`);
  }

  emit(type, data = undefined) {
    this.members.forEach((user) => {
      user.socket.emit(type, data);
    });
  }

  isUserExists(userID) {
    const finded = this.members.filter((user) => {
      return user.userInfo.id === userID;
    });
    return !!finded.length;
  }

  findMember(id) {
    return this.members.filter((user) => {
      return user.socket.id === id;
    })[0];
  }

  getMembers() {
    return this.members.map((user) => {
      return user.userInfo;
    });
  }

  getGameData() {
    return {
      ...this.game,
      members: this.getMembers(),
    };
  }

  filterDisconnected() {
    let isOurRoomExit = false;
    let isDealerOuts = false;
    this.members = this.members.filter((member) => {
      if (!member.socket.connected) {
        isOurRoomExit = true;
        this.sendServiceMessage(`${member.userInfo.name} left the game`);
        if (member.userInfo.role === "dealer") {
          isDealerOuts = true;
          this.sendServiceMessage(`Dealer left the game`);
        }
        return false;
      }
      return true;
    });

    if (isOurRoomExit) this.emit("updateMembers", this.getMembers());

    return isDealerOuts;
  }

  setGameActive(isActive) {
    this.game = { ...this.game, isActive };
    this.emit("setGameActive", this.game.isActive);
    this.sendServiceMessage(`the game is active`);
  }

  setSettings(settings) {
    this.game = { ...this.game, ...settings };
    this.emit("updateSettings", this.game.settings);
  }

  askToExclude(Excludor) {
    if (this.members.length < 4) {
      return;
    }

    if (!this.currentExcludor && !this.excludeQueue.length) {
      this.currentExcludor = Excludor;
    }
    this.excludeQueue.push(Excludor);
    this.emit("excluding", this.game.excluding);
  }

  writeExcludeAnswer(userID, answer) {
    const result = this.currentExcludor.addAnswer(userID, answer);
    if (result) {
      this.excludeMember(this.game.excluding.user, this.game.excluding);
    } else if (result === false) {
      this.sendServiceMessage(`User not excluded`);
      this.clearExclude();
    }
  }

  clearExclude() {
    this.game = { ...this.game, excluding: { isActive: false } };
    this.emit("updateExcluding", { isActive: false });
  }

  excludeMember(member, excluding) {
    if (!member) {
      return;
    }
    let excludedMember;
    this.members = this.members.filter((user) => {
      if (user.userInfo.userID != member.userID) {
        return true;
      }
      excludedMember = user.socket;
      return false;
    });
    this.sendServiceMessage(`Member ${member.name} was excluded`);
    excludedMember.emit("excluded", {
      IsYouExcluded: true,
      reason:
        excluding && excluding.reason
          ? excluding.reason
          : "it was group's decision",
    });
    this.emit("updateMembers", this.getMembers());
    this.emit("excludeEnd", `Member ${member.name} was excluded`);
    this.clearExclude();
  }
}

function initSocket(socket) {
  try {
    const id = socket.handshake.query.id;
    const recconectID = socket.handshake.query.recconectID;

    if (recconectID) {
      let member = undefined;
      let room = undefined;
      rooms.forEach((r) => {
        const result = r.findMember(recconectID);
        if (result) {
          room = r;
          member = result;
        }
      });

      if (member && room) {
        socket = setSocketListeners(socket);
        member.socket = socket;
        socket.emit("refreshGame", room.getGameData(), member.userInfo);
        return;
      }

      socket.emit("close");
      return;
    } else {
      let { user, game } = socket.handshake.query;
      user = JSON.parse(socket.handshake.query.user);
      if (game && user.role === "dealer") {
        rooms.set(id, new Room(id, JSON.parse(game), socket));
      }
      const room = rooms.get(id);
      socket = setSocketListeners(socket);

      room?.join(new SocketUser(socket, user));
      room?.emit("updateMembers", room.getMembers());
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { initSocket, rooms };
