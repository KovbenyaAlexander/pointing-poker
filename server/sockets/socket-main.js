const { Game } = require("./Game");
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
    currentGame;

    constructor(id, game, socket) {
        this.id = id;
        this.game = game;
        this.dealer = socket;
        this.members = [];
        this.excludeQueue = [];
        this.currentExcludor = undefined;
        this.currentGame = undefined;
    }

    sendServiceMessage(message) {
      this.emit(`updateChatMessages`, {
        message,
        messageId: uuid.v4(),
        isServiceMessage: true,
      });
    }

    join(user) {
        this.members.push(user);
        this.sendServiceMessage(`${user.userInfo.name} joined`);
    }
    

    finishGame(result) {
        this.currentGame.finishGame(result);
        this.currentGame = undefined;
        this.sendServiceMessage(`the game is over`);
    }

    emit(type, data=undefined) {
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
        }
    }

    filterDisconnected() {
        let isOurRoomExit = false;
        let isDealerOuts = false;
        this.members = this.members.filter((member) => {
            if (!member.socket.connected) {
                isOurRoomExit = true;
                if (member.userInfo.role === 'dealer') {
                    isDealerOuts = true;
                    this.sendServiceMessage(`Dealer left the game`);
                }
                return false;
            }
            return true;
        });

        if (isOurRoomExit) this.emit('updateMembers', this.getMembers());
        
        return isDealerOuts;
    }

    setGameActive(isActive) {
        this.game = {...this.game, isActive};
        if (isActive) {
            const players = this.getMembers().filter((user) => {
                if (user.role === 'dealer' && this.game.settings.isDealerInGame) return true;
                return user.role === 'player';
            });
            this.currentGame = new Game(this.id, this.game, players);
        } else {
            this.currentGame = undefined;
        }
        
        this.emit('setGameActive', this.game.isActive);
        this.sendServiceMessage(`the game is active`);
    }

    setCard(userID, choose) {
        const player = this.members.find((user) => user.userInfo.userID === userID);
        player.userInfo.choose = choose;
        this.emit('updateMembers', this.getMembers());
        this.currentGame.addDecision(userID, choose);
    }

    clearRound() {
        this.members.forEach((member) => {
            member.userInfo.choose = undefined;
        });
        this.currentGame.clearRound();
        this.emit('updateMembers', this.getMembers());
    }
    
    addPlayer(user) {
        this.currentGame.addPlayer(user);
    }

    startRound() {
        this.game = { ...this.game, isRoundActive: true };
        this.currentGame.startRound();
    }

    
    stopRound() {
        this.game = { ...this.game, isRoundActive: false };
        this.currentGame.stopRound();
    }

    addStory(story) {
        this.game.settings = { ...this.game.settings, stories: [ ...this.game.settings.stories, {...story}  ]};
        this.emit('addStory', story);
    }

    setStory(storyID) {
        this.game.settings.stories = this.game.settings.stories.map((story) => {
            story.isActive = false;
            if (story.id === storyID) {
                story.isActive = true;
            }
            return story;
        });
        this.emit('setStory', this.game.settings.stories); 
    }

    finishStory(result){
        this.currentGame.finishStory(result);
    }

    setSettings(settings) {
        this.game = {...this.game, ...settings};
        this.emit('updateSettings', this.game.settings);
    }

    askToExclude(Excludor) {
        if (this.members.length < 4) {
            return;
        }

        if (!this.currentExcludor && !this.excludeQueue.length) {
            this.currentExcludor = Excludor;
        }
        this.excludeQueue.push(Excludor);
        this.emit('excluding', this.game.excluding);
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
                   member = result
               }
            });

            if (member && room) {
                socket = setSocketListeners(socket);
                member.socket = socket;
                socket.emit('refreshGame', room.getGameData(), member.userInfo);
                return;
            }

            socket.emit('close');
            return;
        } else {
            let { user, game } = socket.handshake.query;
            user = JSON.parse(socket.handshake.query.user);
            if (game && user.role === 'dealer') {
                rooms.set(id, new Room(id, JSON.parse(game), socket));
            }
            const room = rooms.get(id);
            const { isActive , settings } = room.game;

            if (!isActive || settings.isAutoEntry || game.isCompleted) {
                socket = setSocketListeners(socket);
                room.join(new SocketUser(socket, user));
                if (isActive && user.role != 'observer') {
                    room.addPlayer(user);
                }
                room.emit('updateMembers', room.getMembers());
            } else {
                socket.emit('close');
            }
          }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { initSocket, rooms };
