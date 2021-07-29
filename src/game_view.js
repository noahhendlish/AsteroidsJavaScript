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
    that.bindKeyHandlers();
    setInterval(function(){
        that.game.draw(that.ctx);
        that.game.step();
    }, 20);
};

GameView.prototype.bindKeyHandlers = function(){
    let ship = this.ship;
    let bullets = this.game.bullets;
    Object.keys(GameView.MOVES).forEach((k)=>{
        key(k, function(){
            ship.power(GameView.MOVES[k]);
        });
    });
    key('space', ()=>{
        ship.fireBullet();
    });


    if (key.isPressed('space')){
        return false;
        fired = setTimeout(()=>{
            return false
        }, 2000);
    }


};

module.exports = GameView;