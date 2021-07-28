const Game = require("./game");
const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');
const Util = require('./util');
const Ship = require('./ship');

//const keymaster = require('./keymaster');

function GameView(ctx, game){
    this.ctx = ctx;
    this.game = game || new Game();
    this.ship = this.game.ship || this.game.newShip();
}

GameView.MOVES = {
    up: [0, -1],
    down: [0, 1],
    right: [1, 0],
    left: [-1, 0]
};

GameView.prototype.start = function(){
    let that = this;
    setInterval(function(){
        that.bindKeyHandlers();
        that.game.draw(that.ctx);
        that.game.step();
    }, 20);
};

GameView.prototype.bindKeyHandlers = function(){
    let that = this;
    Object.keys(GameView.MOVES).forEach((k)=>{
        key(k, function(){
            console.log(k, GameView.MOVES[k]);
            that.ship.power(GameView.MOVES[k]);
        });
    });
};

module.exports = GameView;