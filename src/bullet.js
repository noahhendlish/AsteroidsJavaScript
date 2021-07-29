const MovingObject = require('./moving_object');
const Util = require('./util');
function Bullet(options){
    options = options || {};
    options.color  = options.color || Bullet.COLOR;
    options.radius = options.radius || Bullet.RADIUS;
    MovingObject.call(this, options);
}
Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

Bullet.RADIUS = 8;
Bullet.COLOR = 'red';

module.exports = Bullet;
