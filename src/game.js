const Asteroid = require("./asteroid");
const MovingObject = require('./moving_object');
const Util = require('./util');

function Game(asteroids, ship){
    this.asteroids = asteroids || [];
    this.ship = ship || null;
    this.addAsteroids();
}

Game.prototype.randomPosition = function(radius){
    radius = radius || 10;
    return [Math.floor(Math.random()*(Game.DIM_X - radius)), Math.floor(Math.random()*(Game.DIM_Y - radius))];
};

Game.prototype.addAsteroid = function(options){
    options = options || {};
    options.game = this;
    let a = new Asteroid(options);
    this.asteroids.push(a);
};

Game.prototype.addAsteroids = function addAsteroids(){
    for(let i = 0; i < Game.NUM_ASTEROIDS; i++){
        this.addAsteroid();
    }
};

Game.prototype.draw = function(ctx){
    ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
    this.asteroids.forEach((a)=>{a.draw(ctx);});
};

Game.prototype.moveObjects = function(){
    this.asteroids.forEach((a)=> a.move());
};

Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
};

Game.prototype.wrap = function(pos){
    if(pos[0] < 0){
        pos[0] = Game.DIM_X - ((pos[0]%Game.DIM_X));
    }
    else if(pos[1] < 0){
        pos[1] = Game.DIM_Y - ((pos[1] % Game.DIM_Y));
    }
    else if(pos[0] > Game.DIM_X){
        pos[0] = pos[0]%Game.DIM_X;
    }
    else if(pos[1] > Game.DIM_Y){
        pos[1] = pos[1]%Game.DIM_Y;
    }
    return pos;
};

Game.prototype.isOutOfBounds = function(pos){
    return ( ((pos[0] < 0) ||  (pos[1] < 0)) || ((pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y)) );
};

Game.prototype.checkCollisions = function(){
    for(let astIdx = 0; astIdx <= this.asteroids.length-1; astIdx++){
        this.checkForCollision(this.asteroids[astIdx]);
    }
};
Game.prototype.split = function(object){
    this.addAsteroid({radius: object.radius/2, pos: [object.pos[0] + object.radius*object.vel[0] , object.pos[1]+object.radius*object.vel[1]]});
    this.addAsteroid({radius: object.radius/2, pos: [object.pos[0] + object.radius*-1*object.vel[0] , object.pos[1]+object.radius*-1*object.vel[1]]});
}

Game.prototype.checkForCollision = function(object){ //for asteroids
    for(let astIdx = 0; astIdx <= this.asteroids.length-1; astIdx++){
        if(object !== this.asteroids[astIdx]){
            if(this.asteroids[astIdx].isCollidedWith(object)){
                    let ast1 = this.asteroids[astIdx];
                    let ast2 = object;
                    this.asteroids[astIdx].collideWith(object);
                    /*if(ast1.radius > Asteroid.MIN_RADIUS){
                        //this.split(ast1);
                    }*/

                    /*if(ast2.radius > Asteroid.MIN_RADIUS){
                        //this.split(ast2);
                    }*/
                    break;
            }
        }
    }
};
Game.prototype.remove = function(object){
    for( let i = 0; i <= this.asteroids.length-1; i++){
        if (this.asteroids[i] === object) {
            this.asteroids.splice(i, 1);
            return this.asteroids;
        }
    }
};

Game.DIM_X = 1000;
Game.DIM_Y  = 600;
Game.NUM_ASTEROIDS = 6;

module.exports = Game;



/*Game.prototype.wrap2 = function(pos){
    return [ Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
};*/

/*Game.prototype.wrap2 = function wrap(pos){
    if(pos[0] < 0){
        pos[0] = Game.DIM_Y - pos[0];
    }
    if(pos[1] < 0){
        pos[1] = Game.DIM_X - pos[1];
    }
    if(pos[0] > Game.DIM_X){
        pos[0] = 0;
    }
    if(pos[1] > Game.DIM_Y){
        pos[1] = 0;
    }
    return pos;
};*/