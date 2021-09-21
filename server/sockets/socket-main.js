const users = [];

function findAllUsersByGame (gameID) {
    return users.filter((socket) => {
        return user.soket.user.gameID === gameID
    });
}


class SocketUser{
    userInfo;
    gameID;

    constructor(socket) {
        this.socket = socket;
        this.userInfo = {};
        this.gameID;
    }

    setUserInfo(userInfo) {
        this.userInfo = {...this.userInfo, ...userInfo};
        console.log(this.userInfo);
    }

    setGameId(id) {
        this.gameID = id;
    }

}

function initSocket(socket) {
    const user = new SocketUser(socket); 
    users.push(user);
    console.log(`Connected user with id = ${user.socket.client.id}` );

    socket.on('setUserInfo', user.setUserInfo);
    socket.on('setGameID', user.setGameId);
    socket.on('updateState', store => {
    console.log(store);
  });
}

module.exports = { initSocket, findAllUsersByGame };