function emitChangeGameActivity (id, status) {
    findAllUsersByGame(id).forEach((user) => {
        user.socket.emit('changeGameActivity', status);
    });
}

function emitUpdateSetting (id, settings) {
    findAllUsersByGame(id).forEach((user) => {
        user.socket.emit('updateSettings', settings);
    });
}

function emitGameRemove (id) {
    findAllUsersByGame(id).forEach((user) => {
        user.socket.emit('gameRemove');
    });
}

function emitRemoveUser(idGame, UserName) {
    findAllUsersByGame(idGame).forEach((user) => {
        user.socket.emit('RemoveUser', UserName);
    });

}

function emitUserAdd(idGame, UserName) {
    findAllUsersByGame(idGame).forEach((user) => {
        user.socket.emit('UserAdd', UserName);
    });
}
module.exports = { 
    emitChangeGameActivity,
    emitUpdateSetting,
    emitGameRemove,
    emitRemoveUser,
    emitUserAdd,
};