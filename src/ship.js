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
    const bullet = new Bullet({game: this.game, pos: [this.pos[0]+this.vel[0]*this.radius/2, this.pos[1]+this.vel[1]*this.radius/2], vel: [this.vel[0]*2, this.vel[1]*2]});
    this.game.add(bullet);
};

Ship.prototype.power = function power(impulse){

    if(this.vel[1] <= Ship.MAX_V && this.vel[0] >= -1*Ship.MAX_V){
        this.vel[0]+= impulse[0];
    }
    if(this.vel[1] <= Ship.MAX_V && this.vel[1] >= -1*Ship.MAX_V){
        this.vel[1]+= impulse[1];
    }
};

Ship.prototype.powerChangeDir = function power(impulse){
    this.vel = [impulse[0]*2, impulse[1]*2];
};
//overwrite draw
Ship.prototype.draw = function(ctx){
        ctx.beginPath();
        ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            0,
            2 * Math.PI,
            false
            );
        ctx.strokeStyle = Ship.BORDER_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        this.drawInnerCircle(ctx);
        this.drawShip(ctx);

};
Ship.prototype.drawInnerCircle = function(ctx){
    ctx.beginPath();
        ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius/2,
            0,
            2 * Math.PI,
            false
            );
        ctx.fillStyle = 'yellow';
        ctx.fill();
}

Ship.prototype.drawShip = function(ctx){
    ctx.beginPath();
    ctx.moveTo(this.pos[0] - this.radius/2, this.pos[1] - this.radius/4);
    ctx.lineTo(this.pos[0] + this.radius/2, this.pos[1] - this.radius/4);
    ctx.lineTo(this.pos[0], this.pos[1]+ this.radius/2);
    ctx.fillStyle = 'black';
    ctx.fill();
}
Ship.MAX_V = 3;
Ship.SIZE = 12; //alias for radius
Ship.COLOR = 'black';
Ship.BORDER_COLOR = 'gray';
module.exports = Ship;


/*MovingObject.prototype.drawShip2 = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + 7.5*this.radius, this.pos[1]+ 3*this.radius);
    ctx.lineTo(this.pos[0]+ 10*this.radius, this.pos[1] + 7.5*this.radius);
    ctx.lineTo(this.pos[0] + 10*this.radius, this.pos[1] + 2.5*this.radius);
    ctx.fill();
}*/

