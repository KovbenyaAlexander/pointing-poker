const { Excludor } = require("./Excludor");
const uuid = require("uuid");

const rooms = require("./socket-index");

function setSocketListeners(socket) {
  try {
    socket.on("initExclude", onInitExclude);
    socket.on("confirmExclude", onSocketConfirmExclude);
    socket.on("sendMessage", onSocketSendMessage);
    return socket;
  } catch (e) {
    console.log(e);
  }
}

function onInitExclude(id, excluding, isInstantExclude) {
  const room = rooms.get(id);
  if (isInstantExclude) {
    room.excludeMember(excluding.user, excluding);
  } else {
    room.game = { ...room.game, excluding: { ...excluding, isActive: true } };
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

const onSocketSendMessage = (gameId, userId, message, authorMessage) => {
  const room = rooms.get(gameId);
  room.emit(`updateChatMessages`, {
    message,
    userId,
    messageId: uuid.v4(),
    authorMessage,
  });
};

module.exports = {
  setSocketListeners,
};
