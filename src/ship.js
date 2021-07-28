//const Asteroid = require("./asteroid");
const MovingObject = require('./moving_object');
const Util = require('./util');
function Ship(options){
    options = options || {};
    options.color  = options.color || Ship.COLOR;
    options.radius = options.radius || Ship.SIZE;
    options.pos = options.pos || Util.randomPos(options.radius);
    options.vel = options.vel || [0,0];
    //options.game = options.game;
    MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function relocate(){
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
};

Ship.prototype.power = function power(impulse){
    /*if(this.vel[0] <= Ship.MAX_VELOCITY){
        this.vel[0]+= impulse[0]*0.01;
    }*/
    /*if(this.vel[1] <= Ship.MAX_VELOCITY){
        this.vel[1]+= impulse[1]*0.01;
    }*/
    this.vel = [impulse[0], impulse[1]];
};

Ship.MAX_VELOCITY = 1;
Ship.SIZE = 10; //radius?
Ship.COLOR = 'black';
module.exports = Ship;
