class Gambler { //parent class for every game
  constructor(name) {
    this._name = "Gambler"; //set player name
    this._money = parseInt(localStorage.getItem("money")) || 100;
  } //set money equal to whatever is stored or 100

  get money() {
    return this._money;
  }

  restartGame() { //restart all stats
  if(confirm("Are you sure? This removes all data from every gambling game.")){
    localStorage.clear(); //removes all storage
    window.location.reload(false); //reloads window
    }
  }
}

class HiLo extends Gambler{ //HiLo game class
  constructor() {
    super(name);
    this._oldNumber;
    this._newNumber;
    this._statement;
    this._bet = 10;
    this._maxBet = parseInt(localStorage.getItem("maxBet")) || 5000;
    this._maxBetCost = parseInt(localStorage.getItem("maxBetCost")) || 1000000;
  }

get oldNumber() {
  return this._oldNumber;
}

get newNumber() {
  return this._newNumber;
}

update() {
  this.updateStorage();
  document.getElementById("numberDisplay").innerHTML = this._oldNumber;
  document.getElementById("balance").innerHTML = this._money;
  document.getElementById("newNumberValue").innerHTML = "";
  document.getElementById("currentBet").innerHTML = this._bet;
  document.getElementById("maxBetCost").innerHTML = this._maxBetCost;
  document.getElementById("currentMaxBet").innerHTML = this._maxBet;
}

updateStorage() {
  localStorage.setItem("money", this._money);
  localStorage.setItem("maxBet", this._maxBet);
  localStorage.setItem("maxBetCost", this._maxBetCost);
}

changeMoney(change) {
  this._money += change;
  this.update();
}

makeNewGame() {
  this._oldNumber = this.generateNumber();
  this.update();
  document.getElementById("gameButton").onclick = "";
}

generateNumber() {
  return Math.floor(Math.random() * 20+1);
}

guessHigher() {
  if(this._money >= this._bet){
    this._newNumber = this.generateNumber();
    if(this._oldNumber < this._newNumber) {
      this.changeMoney(this._bet);
      this._statement = "higher.";
    } else if(this._oldNumber === this._newNumber) {
      this.changeMoney(-this._bet);
      this._statement = "equal.";
    } else {
      this.changeMoney(-this._bet);
      this._statement = "lower.";
    }
  } else {
    alert("Not enough money for that bet.");
    this.resetMyBet();
  }
  this.updateNumber();
}

guessLower() {
  if(this._money >= this._bet){
    this._newNumber = this.generateNumber();
    if(this._oldNumber > this._newNumber) {
      this.changeMoney(this._bet);
      this._statement = "lower.";
    } else if(this._oldNumber === this._newNumber) {
      this.changeMoney(-this._bet);
      this._statement = "equal.";
    } else {
      this.changeMoney(-this._bet);
      this._statement = "higher.";
    }
  } else {
    alert("Not enough money for that bet.");
    this.resetMyBet();
  }
  this.updateNumber();
}

updateNumber(){
  document.getElementById("newNumberValue").innerHTML = this._newNumber;
  document.getElementById("newNumber").innerHTML = this._statement;
  this._oldNumber = this._newNumber;
  this.update();
}

changeBet(amount) {
  if (this._bet >= 10) {
    if (this._bet >= this._money && amount === 5) {
      alert("You can't bet more than you have.");
    } else if (amount === -5 && this._bet === 10) {
      alert("minimum bet is 10");
    } else if (amount === 5 && this._bet === this._maxBet) {
      alert("maximum bet is " + this._maxBet);
    } else if (amount === this._money) {
      if (amount < this._maxBet){
      this._bet = amount;
      } else {
      this._bet = this._maxBet;
      }
      this.update();
    } else {
    this._bet += amount;
    this.update();
}}}

changeMaxBet() {
  if(this._money >= this._maxBetCost) {
  this._money -= this._maxBetCost;
  this._maxBet *= 10;
  this._maxBetCost *= 10;
  this.update();
} else {
  alert("You don't have enough money.");
}
}

resetMyBet() {
  this._bet = 10;
  this.update();
}
}

var player1 = new HiLo(); //new hilo game