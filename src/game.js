const Asteroid = require("./asteroid");
const MovingObject = require('./moving_object');

function Game(asteroids, ship){
    this.asteroids = asteroids || [];
    this.ship = ship || null;
    this.addAsteroids();
}

Game.prototype.randomPosition = function(radius){
    radius = radius || 10;
    return [Math.floor(Math.random()*(Game.DIM_X - radius)), Math.floor(Math.random()*(Game.DIM_Y - radius))];
};

Game.prototype.addAsteroid = function(){
    let a = new Asteroid({game: this});
    this.asteroids.push(a);
}

Game.prototype.addAsteroids = function addAsteroids(){
    for(let i = 0; i < Game.NUM_ASTEROIDS; i++){
        this.addAsteroid();
    }
    return this.asteroids;
};

Game.prototype.draw = function(ctx){
    ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
    this.asteroids.forEach((a)=>{a.draw(ctx);});
};

Game.prototype.moveObjects = function(){
    this.asteroids.forEach((a)=> a.move());
}

Game.prototype.wrap = function(pos){
    if(pos[0] <= 0){
        pos[0] = Game.DIM_X;
    }
    if(pos[1] <= 0){
        pos[1] = Game.DIM_Y;
    }
    if(pos[0] >= Game.DIM_X){
        pos[0] = 0;
    }
    if(pos[1] >= Game.DIM_Y){
        pos[1] = 0;
    }
}

Game.DIM_X = 1000;
Game.DIM_Y  = 600;
Game.NUM_ASTEROIDS = 4;

module.exports = Game;