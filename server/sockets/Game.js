const rooms = require("./socket-index");

function calculateTime(strTime) {
  let [ minute, seconds ] = strTime.split(':');
  minute = +minute * 60;
  seconds = +seconds + minute;
  return seconds * 1000;
}

class Game {
  roomID;
  timer;
  players;
  decisions;
  isAutoFinish;
  isRoundActive;
  timeout;

  constructor(roomid, game, players) {
    this.roomID = roomid;
    this.isAutoFinish = game.settings.isAutoFinish;
    this.timer = game.settings.isTimerRequired ? calculateTime(game.settings.timerValue) : undefined;
    this.isRoundActive = false;
    this.players = players;
    this.decisions = new Map();
    this.timeout = undefined;
  }

  findActiveStory() {
    const room = rooms.get(this.roomID);
    return room.game.settings.stories.filter((story) => story.isActive)[0];
  }

  startRound() {
    const room = rooms.get(this.roomID);
    this.isRoundActive = true;
    // Added second for the network operations
    if (this.timer) {
      this.timeout = setTimeout(() => {
        this.stopRound();
      }, this.timer + 1000);
    }
    room.emit('startRound', this.isRoundActive);
  }

  stopRound() {
    if (!this.isRoundActive) return;
    if ( this.timeout) clearTimeout(this.timeout);
    this.timeout = undefined;
    const room = rooms.get(this.roomID);
    this.isRoundActive = false;
    room.emit('stopRound', this.isRoundActive);
  }

  addDecision(userID, decision) {
    const user = this.decisions.get(userID);
    this.decisions.set(userID, decision)
    if (this.isAutoFinish && this.decisions.size === this.players.length) {
      this.stopRound();
    } 
  }
  
  clearRound() {
    this.decisions.clear();
  }

  fillStory(result) {
    try{
      const story = this.findActiveStory();
      if (story) {
        story.estimation = result;
        story.isActive = false;
        story.isCompleted = true;
      }
      return story;
    }
    catch(e) {
      console.log(e);
    }
  }

  finishStory(result) {
    const story = this.fillStory(result);
    
    const room = rooms.get(this.roomID);
    room.emit('finishStory', room.game.settings.stories);
  }

  finishGame(result) {
    this.fillStory(result);
    const room = rooms.get(this.roomID);
    const results = room.game.settings.stories.length ? this.stories : result; 
    
    room.emit('finishGame', results);
  }

  addPlayer(user) {
    this.players.push(user);
  }
}

module.exports = { Game };