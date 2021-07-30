
const Util = require('./util');

function MovingObject(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.isWrappable = true

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

MovingObject.prototype.move = function(deltaTime){
    deltaTime = deltaTime || 1;
    const deltaX = this.vel[0]*deltaTime;
    const deltaY = this.vel[1]*deltaTime;
    this.pos = [ this.pos[0] + deltaX, this.pos[1] + deltaY];
    if(this.game.isOutOfBounds(this.pos)){
        if(this.isWrappable){
            this.pos = this.game.wrap(this.pos);
        }
        else{
            this.game.remove(this);
        }
    }
};

MovingObject.prototype.isCollidedWith = function(otherObject){
    return (Util.distBetweenTwoPositions(this.pos, otherObject.pos) < (this.radius+otherObject.radius));
};

MovingObject.prototype.collideWith = function(otherObject){
    //leave empty, overwritten by asteroid, but called on other moving objects
};

module.exports = MovingObject;
