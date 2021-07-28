const MovingObject = require('./moving_object');
const Util = require('./util');

function randomPos(){
    return [Math.floor(Math.random()*(600- Asteroid.RADIUS)), Math.floor(Math.random()*(1000 - Asteroid.RADIUS))]
}

function Asteroid(options){
    options = options || {};
    options.color  = options.color || Util.randRGB();
    options.pos = options.pos || randomPos();
    options.radius = options.radius || Asteroid.RADIUS;
    options.vel = options.vel || Util.randomVec((Math.random()+0.25)*3);
    //options.game = options.game;
    MovingObject.call(this, options);
}


Util.inherits(Asteroid, MovingObject);
Asteroid.COLOR = 'red';
Asteroid.RADIUS = 30;
Asteroid.MIN_RADIUS = 15;

module.exports = Asteroid;