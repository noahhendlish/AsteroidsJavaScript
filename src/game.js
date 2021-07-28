const Asteroid = require("./asteroid");
const MovingObject = require('./moving_object');
const Util = require('./util');
const Ship = require('./ship');

function Game(asteroids, ship){
    this.asteroids = asteroids || [];
    this.ship = ship || this.newShip();
    this.addAsteroids();
}
Game.prototype.allObjects = function(){
    return this.asteroids.concat([this.ship]);
}

Game.prototype.newShip = function(){
    return new Ship({game: this});
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
    this.ship.draw(ctx);
};

Game.prototype.moveObjects = function(){
    let x = Math.random()*10;
    if(x % 2 !== 0){

        //console.log(this.ship);
    }
    this.allObjects().forEach((obj) => obj.move());
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
    //Game.prototype.checkCollisions
    //check collisions for all objects (asteroids with ship)
    let objects = this.allObjects();
    for(let objIdx = 0; objIdx <= objects.length-1; objIdx++){
        this.checkForCollision(objects[objIdx]);
    }
};

Game.prototype.splitAsteroid = function(asteroid){
    if(asteroid.radius > Asteroid.MIN_RADIUS){
        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*asteroid.vel[1]]});
        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*-1*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*-1*asteroid.vel[1]]});
    }
}

Game.prototype.checkForCollision = function(object){ //for asteroids
    let allObjs = this.allObjects();
    for(let objectIdx = 0; objectIdx <= allObjs.length-1; objectIdx++){
        if(object !== allObjs[objectIdx]){
            if(allObjs[objectIdx].isCollidedWith(object)){
                    allObjs[objectIdx].collideWith(object);
                    //if both are asteroids
                    if(allObjs[objectIdx] instanceof Asteroid && object instanceof Asteroid){
                        let ast1 = allObjs[objectIdx];
                        let ast2 = object;
                        //remove asteroids?
                        //split asteroids?
                        //this.splitAsteroid(ast1);
                        //this.splitAsteroid(ast2);
                    }
                    break;
            }
        }
    }
};

Game.prototype.removeAsteroid = function(object){
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