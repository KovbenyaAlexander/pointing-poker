const { Excludor } = require("./Excludor");
const rooms = require("./socket-index");

function setSocketListeners(socket) {
    try {
        socket.on('initExclude', onInitExclude);
        socket.on('confirmExclude', onSocketConfirmExclude);
        socket.on('disconnect', onDisconnect);
        return socket;
    }
    catch(e){
        console.log(e);
    }
} 

function onInitExclude(id, excluding, isInstantExclude) {
    const room = rooms.get(id);
    if (isInstantExclude) {
        room.excludeMember(excluding.user, excluding);
    } else {
        room.game = {...room.game, excluding: {...excluding, isActive: true}};
        members = room.getMembers().filter((user) => {
            return true;
        });
        room.askToExclude(new Excludor(room.getMembers()));
    }
}

function onSocketConfirmExclude(id, userID, answer) {
    const room = rooms.get(id);
    room.writeExcludeAnswer(userID, answer);
}

function onDisconnect() {
    // This timeout gives a user a chance to refresh connection
    setTimeout(() => {
        let keyForDelete = undefined;
        rooms.forEach((room, key) => {
            if (room.filterDisconnected()) {
                room.emit('cancelGame');
                keyForDelete = key 
            }  
        });
            rooms.delete(keyForDelete);
    }, 10000);
}

module.exports = { 
    setSocketListeners
};