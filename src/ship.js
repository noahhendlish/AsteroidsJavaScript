const Bullet = require('./bullet');
const MovingObject = require('./moving_object');
const Util = require('./util');
function Ship(options){
    options = options || {};
    options.color  = options.color || Ship.COLOR;
    options.radius = options.radius || Ship.SIZE;
    options.pos = options.pos || Util.randomPos(options.radius);
    options.vel = options.vel || [0,0];
    MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function relocate(){
    this.pos = Util.randomPos(this.radius);
    this.vel = [0,0];
};

Ship.prototype.fireBullet = function fireBullet(){
    const norm = Util.norm(this.vel);
    //do not fire if ship is not moving
    if(norm===0){
        return;
    }
    const bullet = new Bullet({game: this.game, pos: this.pos, vel: [this.vel[0]*2, this.vel[1]*2]});
    this.game.add(bullet);
};

Ship.prototype.power = function power(impulse){
    if(this.vel[0] <= Ship.MAX_V){
        this.vel[0]+= impulse[0];
    }
    if(this.vel[1] <= Ship.MAX_V){
        this.vel[1]+= impulse[1];
    }
    this.vel = [impulse[0]*2, impulse[1]*2];
};

Ship.MAX_V = 3;
Ship.SIZE = 10; //alias for radius
Ship.COLOR = 'black';
module.exports = Ship;
