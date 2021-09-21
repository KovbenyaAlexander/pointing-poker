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
module.exports = { emitChangeGameActivity, emitUpdateSetting, emitGameRemove };