const Asteroid = require("./asteroid");
const Ship = require('./ship');
const Bullet = require('./bullet');

function Game(asteroids, ship, bullets){
    this.asteroids = asteroids || [];
    this.ship = ship || this.newShip();
    this.bullets = bullets || [];
    this.addAsteroids();
}

//returns array of all moving objects
Game.prototype.allObjects = function(){
    return this.asteroids.concat([this.ship]).concat(this.bullets);
}

//helper fn to add moving objects to instance of game
Game.prototype.add = function(obj){
    if(obj instanceof Bullet){
        this.bullets.push(obj);
    }
    else if(obj instanceof Asteroid){
        this.asteroids.push(obj);
    }
    else if(obj instanceof Ship){
        this.ship = obj;
    }
    else{
        throw "Invalid Object to Add";
    }
};

//remove moving objects
Game.prototype.remove = function(obj){
    if(obj instanceof Bullet){
        this.removeBullet(obj);
    }
    else if(obj instanceof Asteroid){
        this.removeAsteroid(obj);
    }
    else if(obj instanceof Ship){
        if (this.ship === obj){
            this.ship = [];
        }
    }
    else{
        throw "Invalid Object to Remove";
    }
};

//create new ship
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
    this.add(a);
};

Game.prototype.addAsteroids = function addAsteroids(){
    for(let i = 0; i < Game.NUM_ASTEROIDS; i++){
        this.addAsteroid();
    }
};

Game.prototype.draw = function(ctx){
    ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
    this.allObjects().forEach((obj)=>{obj.draw(ctx);});
    //this.ship.drawShip(ctx);
};

Game.prototype.moveObjects = function(){
    let x = Math.random()*10;
    if(x % 2 !== 0){
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
        pos[0] = pos[0] % Game.DIM_X;
    }
    else if(pos[1] > Game.DIM_Y){
        pos[1] = pos[1] % Game.DIM_Y;
    }
    return pos;
};

Game.prototype.isOutOfBounds = function(pos){
    return ( ((pos[0] < 0) ||  (pos[1] < 0)) || ((pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y)) );
};

Game.prototype.checkCollisions = function(){
    //check collision for all objects
    let objects = this.allObjects();
    for(let objIdx = 0; objIdx <= objects.length-1; objIdx++){
        this.checkForCollision(objects[objIdx]);
    }
};

Game.prototype.splitAsteroid = function(asteroid){ //split asteroid into two
    if(asteroid instanceof Asteroid && asteroid.radius > Asteroid.MIN_RADIUS){
        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*asteroid.vel[1]]});
        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*-1*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*-1*asteroid.vel[1]]});
    }
}

Game.prototype.checkForCollision = function(object){ //for given object, check if colliding with any object
    let allObjs = this.allObjects();
    for(let objectIdx = 0; objectIdx <= allObjs.length-1; objectIdx++){
        if(object !== allObjs[objectIdx]){
            if(allObjs[objectIdx].isCollidedWith(object)){
                    allObjs[objectIdx].collideWith(object);
                    //if both are asteroids
                    //if(allObjs[objectIdx] instanceof Asteroid && object instanceof Asteroid){
                        //split asteroids
                        //this.splitAsteroid(allObjs[objectIdx]);
                        //this.splitAsteroid(object);
                    //}
                    break;
            }
        }
    }
};

Game.prototype.removeBullet = function(bullet){
    for( let i = 0; i <= this.bullets.length-1; i++){
        if (this.bullets[i] === bullet) {
            this.bullets.splice(i, 1);
        }
    }
};

Game.prototype.removeAsteroid = function(asteroid){
    for( let i = 0; i <= this.asteroids.length-1; i++){
        if (this.asteroids[i] === asteroid) {
            this.asteroids.splice(i, 1);
        }
    }
};

Game.DIM_X = 1000;
Game.DIM_Y  = 600;
Game.NUM_ASTEROIDS = 5;
module.exports = Game;



/*Game.prototype.wrapWithUtil = function(pos){
    return [ Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
};*/