
const Util = require('./util');

function MovingObject(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.drawShip2 = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + 7.5*this.radius, this.pos[1]+ 3*this.radius);
    ctx.lineTo(this.pos[0]+ 10*this.radius, this.pos[1] + 7.5*this.radius);
    ctx.lineTo(this.pos[0] + 10*this.radius, this.pos[1] + 2.5*this.radius);
    ctx.fill();
}

MovingObject.prototype.drawShip = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0] - this.radius, this.pos[1] - this.radius);
    ctx.lineTo(this.pos[0] + this.radius, this.pos[1] - this.radius);
    ctx.lineTo(this.pos[0], this.pos[1]+ 3*this.radius);
    ctx.fill();
}

MovingObject.prototype.draw = function(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            0,
            2 * Math.PI,
            false
            );
        ctx.fill();
};


MovingObject.prototype.move = function(){
    const offsetX = this.vel[0];
    const offsetY = this.vel[1];
    this.pos = [ this.pos[0] + offsetX, this.pos[1] + offsetY];
    if(this.game.isOutOfBounds(this.pos)){
        this.pos = this.game.wrap(this.pos);
    }
};

MovingObject.prototype.isCollidedWith = function(otherObject){
    return (Util.distBetweenTwoPositions(this.pos, otherObject.pos) < (this.radius+otherObject.radius));
};

MovingObject.prototype.collideWith = function(otherObject){
    //this.game.removeAsteroid(otherObject);
    //this.game.remove(this);
};

module.exports = MovingObject;