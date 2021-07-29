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
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
};

Ship.prototype.fireBullet = function fireBullet(){
    const norm = Util.norm(this.vel);
    if(norm===0){
        return;
    }
    const bullet = new Bullet({game: this.game, pos: this.pos, vel: [this.vel[0]*2, this.vel[1]*2]});
    this.game.add(bullet);
    //console.log("firing");
    //console.log(this.game.bullets);
    //console.log(this.game.bullets);
};

Ship.prototype.power = function power(impulse){
    if(this.vel[0] <= Ship.MAX_V){
        this.vel[0]+= impulse[0];
    }
    if(this.vel[1] <= Ship.MAX_V){
        this.vel[1]+= impulse[1];
    }
    if(vel[0] +vel[1]==0){
        vel+=impulse;
    }
    //this.vel += [impulse[0]*2, impulse[1]*2];
};

Ship.MAX_V = 5;
Ship.SIZE = 10; //radius?
Ship.COLOR = 'black';
module.exports = Ship;
