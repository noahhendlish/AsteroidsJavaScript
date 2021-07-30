const MovingObject = require('./moving_object');
const Util = require('./util');
const Ship = require('./ship');
const Bullet = require('./bullet');

function Asteroid(options){
    options = options || {};
    options.color  = options.color || Util.randRGB();
    options.radius = options.radius || Asteroid.RADIUS;
    options.pos = options.pos || Util.randomPos(options.radius);
    options.vel = options.vel || Util.randomVec((Math.random()+0.25)*2);
    MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

//overwrite moving object draw
Asteroid.prototype.draw = function(ctx){
        ctx.beginPath();
        ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            0,
            2 * Math.PI,
            false
            );
        ctx.strokeStyle = Asteroid.BORDER_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
};

//overwrite Moving Object function
Asteroid.prototype.collideWith = function collideWith(otherObject){
    if(otherObject instanceof Ship){
        otherObject.relocate();
    }
    else if(otherObject instanceof Bullet){
        this.game.remove(otherObject);
        this.game.remove(this);
    }
    //uncomment if splitting asteroids
    /*else if(this.game.splitAsteroidMode === true && otherObject instanceof Asteroid){
        this.game.remove(otherObject);
        this.game.remove(this);
    }
    else{
        throw "Invalid Object";
    }*/
};

Asteroid.COLOR = 'red';
Asteroid.BORDER_COLOR = 'black';
Asteroid.RADIUS = 30;
Asteroid.MIN_RADIUS = 10;

module.exports = Asteroid;