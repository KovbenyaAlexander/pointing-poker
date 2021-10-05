const { setSocketListeners } = require("./socket-action");
const rooms = require("./socket-index");

class SocketUser{
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

    join(user) {
        this.members.push(user);
    }
    

    finishGame() {
        this.emit('gameEnd');
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
        this.emit('setGameActive', this.game.isActive);
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
        }
        else if (result === false) {
            this.clearExclude();
        }
    }

    clearExclude() {
        this.game = {...this.game, excluding: {isActive: false}};
        this.emit('updateExcluding', {isActive: false});
    }

    excludeMember(member, excluding) {
        let excludedMember;
        this.members = this.members.filter((user) => {
            if (user.userInfo.userID != member.userID) {
                return true;
            }
            excludedMember = user.socket;
            return false;
        });
        excludedMember.emit('excluded', {
            IsYouExcluded: true,
            reason: excluding && excluding.reason ? excluding.reason : 'it was group\'s decision',
        });
        this.emit('updateMembers', this.getMembers());
        this.emit('excludeEnd', `Member ${member.name} was excluded`);
        this.clearExclude();
    }

    setCard(userID, choose) {
        this.findMember(userID)
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

            if (!isActive || settings.isAutoEntry) {
                socket = setSocketListeners(socket);
                room.join(new SocketUser(socket, user));
                room.emit('updateMembers', room.getMembers());
            } else {
                socket.emit('close');
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { initSocket, rooms };