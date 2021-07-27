const Game = require("./game");
const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');
const Utils = require('./utils');

function GameView(ctx, game){
    this.ctx = ctx;
    this.game = game;
}

GameView.prototype.start = function(){
    let that = this;
    setInterval(function(){
        that.game.draw(that.ctx);
        that.game.moveObjects();
    }, 20);
};

module.exports = GameView;