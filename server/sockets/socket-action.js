const { Excludor } = require("./Excludor");
const rooms = require("./socket-index");

function setSocketListeners(socket) {
    try {
        socket.on('initExclude', onInitExclude);
        socket.on('confirmExclude', onSocketConfirmExclude);
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
module.exports = { 
    setSocketListeners
};