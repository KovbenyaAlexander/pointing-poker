class Excludor{
  answers;
  all;
  agree;
  disagree;

  constructor(users) {
    this.answers = users.map((user) => {
      return {
        user,
        answer: undefined,
      }
    });
    this.all = this.answers.length;
    this.agree = 0;
    this.disagree = 0;
  }

  addAnswer(userID, answer) {
    this.answers = this.answers.filter((ans) => {
      if (ans.user.userID === userID && !ans.answer) {
        if (answer){
          this.agree += 1;
        } else {
          this.disagree += 1;
        }
        return false;
      }
      return true;
    });
    
    if ((this.agree + this.disagree) / this.all === 1) {
      return this.calculate();
    }
    return undefined;
  }

  calculate() {
    if (this.agree > this.disagree){
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {Excludor};