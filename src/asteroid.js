const MovingObject = require('./moving_object');
const Utils = require('./utils');
//const Game = require('./game');

function randomPos(){
    return [Math.floor(Math.random()*(600- Asteroid.RADIUS)), Math.floor(Math.random()*(1000 - Asteroid.RADIUS))]
}

function Asteroid(options){
    options = options || {};
    options.color  = options.color || Asteroid.COLOR;
    options.pos = options.pos || randomPos();
    options.radius = options.radius || Asteroid.RADIUS;
    options.vel = options.vel || Utils.randomVec(Math.random()*4);
    MovingObject.call(this, options);
}

Utils.inherits(Asteroid, MovingObject);
Asteroid.COLOR = 'red';
Asteroid.RADIUS = 20;

module.exports = Asteroid;