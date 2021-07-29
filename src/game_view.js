const Game = require("./game");

function GameView(ctx, game){
    this.ctx = ctx;
    this.game = game || new Game();
    this.ship = this.game.ship || this.game.newShip();
}
//directions for objects
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

//handle user key input using keymaster.js
GameView.prototype.bindKeyHandlers = function(){
    let ship = this.ship;
    Object.keys(GameView.MOVES).forEach((k)=>{
        key(k, function(){
            ship.power(GameView.MOVES[k]);
        });
    });
    key('space', ()=>{
            ship.fireBullet();
    });
};
module.exports = GameView;