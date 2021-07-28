
const Utils = require('./utils');

function MovingObject(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
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
const NORMAL_FRAME_TIME_DELTA = 1000/60;

MovingObject.prototype.move = function(timeDelta = (1000/60)){
    const velocityScale = 1;//timeDelta / NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.vel[0]*velocityScale;
    const offsetY = this.vel[1]*velocityScale;
    this.pos = [ this.pos[0] + offsetX, this.pos[1] + offsetY];
    if(this.game.isOutOfBounds(this.pos)){
        this.pos = this.game.wrap(this.pos);
    }
}

module.exports = MovingObject;