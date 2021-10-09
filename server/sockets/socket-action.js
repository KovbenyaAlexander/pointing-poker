const { Excludor } = require("./Excludor");
const uuid = require("uuid");

const rooms = require("./socket-index");

function setSocketListeners(socket) {
  try {
    socket.on("initExclude", onInitExclude);
    socket.on("confirmExclude", onSocketConfirmExclude);
    socket.on("sendMessage", onSocketSendMessage);
    socket.on("disconnect", onDisconnect);
    socket.on('startRound', onRoundStart);
    socket.on('stopRound', onRoundStop);
    socket.on('setCard', onSetCard);
    socket.on('setStory', onSetStory);
    socket.on('addStory', onAddStory);
    socket.on('finishStory', onFinishStory);
    socket.on('finishGame', onFinishGame);
    socket.on('requestImages', onRequestImages);
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
    sendServiceMessage(room, "vote started");
  }
}

function onSocketConfirmExclude(id, userID, answer) {
  const room = rooms.get(id);
  room.writeExcludeAnswer(userID, answer);
}

const onSocketSendMessage = (gameId, userId, message, authorMessage) => {
  const room = rooms.get(gameId);
  const messageExp = {
    message,
    userId,
    messageId: uuid.v4(),
    authorMessage,
  };
  room.addMessage(messageExp);
  room.emit("updateChatMessages", messageExp);
};

function onDisconnect() {
  // This timeout gives a user a chance to refresh connection
  setTimeout(() => {
    let keyForDelete = undefined;
    rooms.forEach((room, key) => {
      if (room.filterDisconnected()) {
        room.emit("cancelGame");
        keyForDelete = key;
      }
    });
    rooms.delete(keyForDelete);
  }, 10000);
}

function sendServiceMessage(room, message) {
  const messExp = {
    message,
    messageId: uuid.v4(),
    isServiceMessage: true,
  };
  room.addMessage(messExp);
  room.emit("updateChatMessages", messExp);
}

function onSetCard(gameID, userID, choose) {
  const room = rooms.get(gameID);
  room.setCard(userID, choose);
}

function onRoundStart(gameID) {
  const room = rooms.get(gameID);
  room.clearRound();
  room.startRound();
}


function onRoundStop(gameID) {
  const room = rooms.get(gameID);
  room.stopRound();
}

function onAddStory(gameID, story) {
  const room = rooms.get(gameID);
  room.addStory(story);
}

function onSetStory(gameID, storyID) {
  const room = rooms.get(gameID);
  room.setStory(storyID);
}

function onFinishStory(gameID, result) {
  const room = rooms.get(gameID);
  room.finishStory(result);
}

function onFinishGame(gameID, result) {
  const room = rooms.get(gameID);
  room.finishGame(result);
}

function onRequestImages(gameID, userID, diff) {
  if (!diff.length) return;
  const room = rooms.get(gameID);
  const images = room.getAllRequestedImages(diff);
  const user = room.findMemberByID(userID);
  images.forEach((image) => {
    user.socket.emit('addUserImage', image);
  })
}

module.exports = {
  setSocketListeners,
};
