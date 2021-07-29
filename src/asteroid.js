const MovingObject = require('./moving_object');
const Util = require('./util');
const Ship = require('./ship');
const Bullet = require('./bullet');

function Asteroid(options){
    options = options || {};
    options.color  = options.color || Util.randRGB();
    options.radius = options.radius || Asteroid.RADIUS;
    options.pos = options.pos || Util.randomPos(options.radius);
    options.vel = options.vel || Util.randomVec((Math.random()+0.25)*3);
    MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

//overwrite Moving Object function
Asteroid.prototype.collideWith = function collideWith(otherObject){
    if(otherObject instanceof Ship){
        otherObject.relocate();
    }
    if(otherObject instanceof Bullet){
        this.game.remove(otherObject);
        this.game.remove(this);
    }
};

Asteroid.COLOR = 'red';
Asteroid.RADIUS = 30;
Asteroid.MIN_RADIUS = 10;

module.exports = Asteroid;