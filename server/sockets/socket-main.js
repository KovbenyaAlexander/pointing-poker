const { setSocketListeners } = require("./socket-action");
const rooms = require("./socket-index");

class SocketUser{
    userInfo;
    socket;

    constructor(socket, userInfo) {
        this.socket = socket;
        this.userInfo = userInfo;
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

    getMembers() {
        return this.members.map((user) => {
            return user.userInfo;
        });
    }

    setGameActive(isActive) {
        this.game = {...this.game, isActive};
        this.emit('setGameActive', this.game.isActive);
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
        excludedMember.emit('excluded', {reason: excluding && excluding.reason ? excluding.reason : 'it was group\'s decision'});
        this.emit('updateMembers', this.getMembers());
        this.emit('excludeEnd', `Member ${member.name} was excluded`);
        this.clearExclude();
    }

}

function initSocket(socket) {
    try{
        const id = socket.handshake.query.id;
        const user = JSON.parse(socket.handshake.query.user);
        const game = user.role === 'dealer' ? JSON.parse(socket.handshake.query.game) : undefined;
        if (game) {
            rooms.set(id, new Room(id, game, socket));
        }
        const room = rooms.get(id);
        socket = setSocketListeners(socket);
        room.join(new SocketUser(socket, user));

        room.emit('updateMembers', room.getMembers());
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { initSocket, rooms };