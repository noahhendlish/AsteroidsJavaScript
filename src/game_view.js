const Game = require("./game");

function GameView(ctx, game){
    this.ctx = ctx;
    this.game = game || new Game();
    this.ship = this.game.ship || this.game.newShip();
    this.lastTime = 0;
    this.firedBullet = false;
}
GameView.MAX_FIRE_RATE = 300; //max rate (in ms) ship can fire bullets
//directions for objects
GameView.KEY_MOVES = {
    up: [0, -1],
    down: [0, 1],
    right: [1, 0],
    left: [-1, 0]
};

//handle user key input using keymaster.js
GameView.prototype.bindKeyHandlers = function(){
    let ship = this.ship;
    let that = this;
    Object.keys(GameView.KEY_MOVES).forEach(function(k){
        key(k, ()=>{
            ship.power(GameView.KEY_MOVES[k]);
        });
    });
    key('space', ()=>{
            that.limitFiredBullets()
    });
};
GameView.prototype.limitFiredBullets = function(){
    //limit firing of bullets
    if (this.firedBullet === false){
        this.firedBullet = true;
        this.ship.fireBullet();
        setTimeout(()=>{
                this.firedBullet = false;
            }, GameView.MAX_FIRE_RATE);
    }
}

GameView.prototype.animate = function(currTime){
    this.currTime = currTime;
    let deltaTime = currTime-this.lastTime;
    this.game.step(deltaTime);
    this.game.draw(this.ctx);
    this.lastTime = currTime;
    //continue animating (passing requestAnimationFrame this)
    requestAnimationFrame(this.animate.bind(this));
}

GameView.prototype.start = function(){
    this.bindKeyHandlers();
    //animate using interval to reload
    /*setInterval(function(){
        that.game.draw(that.ctx);
        that.game.step();
    }, 20);*/
    //start animating using requestAnimationFrame()
    requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;