const Game = require("./game");
const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');
const Util = require('./util');

function GameView(ctx, game){
    this.ctx = ctx;
    this.game = game;
}

GameView.prototype.start = function(){
    let that = this;
    setInterval(function(){
        that.game.draw(that.ctx);
        that.game.step();
    }, 10);
};

module.exports = GameView;