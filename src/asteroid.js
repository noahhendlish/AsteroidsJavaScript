const MovingObject = require('./moving_object');
const Utils = require('./utils');

function randomPos(){
    return [Math.floor(Math.random()*(600- Asteroid.RADIUS)), Math.floor(Math.random()*(1000 - Asteroid.RADIUS))]
}

function Asteroid(options){
    options = options || {};
    options.color  = options.color || Utils.randRGB();
    options.pos = options.pos || randomPos();
    options.radius = options.radius || Asteroid.RADIUS;
    options.vel = options.vel || Utils.randomVec((Math.random()+0.25)*4);
    //options.game = options.game;
    MovingObject.call(this, options);
}

Utils.inherits(Asteroid, MovingObject);
Asteroid.COLOR = 'red';
Asteroid.RADIUS = 20;

module.exports = Asteroid;