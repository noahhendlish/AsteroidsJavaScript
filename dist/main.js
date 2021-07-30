/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Asteroid(options){\n    options = options || {};\n    options.color  = options.color || Util.randRGB();\n    options.radius = options.radius || Asteroid.RADIUS;\n    options.pos = options.pos || Util.randomPos(options.radius);\n    options.vel = options.vel || Util.randomVec((Math.random()+0.25)*2);\n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\n//overwrite moving object draw\nAsteroid.prototype.draw = function(ctx){\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0],\n            this.pos[1],\n            this.radius,\n            0,\n            2 * Math.PI,\n            false\n            );\n        ctx.strokeStyle = Asteroid.BORDER_COLOR;\n        ctx.lineWidth = 1;\n        ctx.stroke();\n        ctx.fillStyle = this.color;\n        ctx.fill();\n};\n\n//overwrite Moving Object function\nAsteroid.prototype.collideWith = function collideWith(otherObject){\n    if(otherObject instanceof Ship){\n        otherObject.relocate();\n    }\n    else if(otherObject instanceof Bullet){\n        this.game.remove(otherObject);\n        this.game.remove(this);\n    }\n    //uncomment if splitting asteroids\n    /*else if(this.game.splitAsteroidMode === true && otherObject instanceof Asteroid){\n        this.game.remove(otherObject);\n        this.game.remove(this);\n    }\n    else{\n        throw \"Invalid Object\";\n    }*/\n};\n\nAsteroid.COLOR = 'red';\nAsteroid.BORDER_COLOR = 'black';\nAsteroid.RADIUS = 30;\nAsteroid.MIN_RADIUS = 10;\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nfunction Bullet(options){\n    options = options || {};\n    options.color  = options.color || Bullet.COLOR;\n    options.radius = options.radius || Bullet.RADIUS;\n    MovingObject.call(this, options);\n}\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\nBullet.RADIUS = 8;\nBullet.COLOR = 'red';\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Game(asteroids, ship, bullets){\n    this.asteroids = asteroids || [];\n    this.ship = ship || this.newShip();\n    this.bullets = bullets || [];\n    this.addAsteroids();\n    this.splitAsteroidMode = false;\n}\n\n//returns array of all moving objects\nGame.prototype.allObjects = function(){\n    return this.asteroids.concat([this.ship]).concat(this.bullets);\n}\n\n//helper fn to add moving objects to instance of game\nGame.prototype.add = function(obj){\n    if(obj instanceof Bullet){\n        this.bullets.push(obj);\n    }\n    else if(obj instanceof Asteroid){\n        this.asteroids.push(obj);\n    }\n    else if(obj instanceof Ship){\n        this.ship = obj;\n    }\n    else{\n        throw \"Invalid Object to Add\";\n    }\n};\n\n//remove moving objects\nGame.prototype.remove = function(obj){\n    if(obj instanceof Bullet){\n        this.removeBullet(obj);\n    }\n    else if(obj instanceof Asteroid){\n        this.removeAsteroid(obj);\n    }\n    else if(obj instanceof Ship){\n        if (this.ship === obj){\n            this.ship = [];\n        }\n    }\n    else{\n        throw \"Invalid Object to Remove\";\n    }\n};\n\n//create new ship\nGame.prototype.newShip = function(){\n    return new Ship({game: this});\n}\n\n\nGame.prototype.randomPosition = function(radius){\n    radius = radius || 10;\n    return [Math.floor(Math.random()*(Game.DIM_X - radius)), Math.floor(Math.random()*(Game.DIM_Y - radius))];\n};\n\nGame.prototype.addAsteroid = function(options){\n    options = options || {};\n    options.game = this;\n    let a = new Asteroid(options);\n    this.add(a);\n};\n\nGame.prototype.addAsteroids = function addAsteroids(){\n    for(let i = 0; i < Game.NUM_ASTEROIDS; i++){\n        this.addAsteroid();\n    }\n};\n\nGame.prototype.draw = function(ctx){\n    ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);\n    this.allObjects().forEach((obj)=>{obj.draw(ctx);});\n    //this.ship.drawShip(ctx);\n};\n\nGame.prototype.moveObjects = function(deltaTime){\n    deltaTime = deltaTime || 1;\n    this.allObjects().forEach((obj) => obj.move(deltaTime));\n};\n\nGame.prototype.step = function(){\n    this.moveObjects();\n    this.checkCollisions();\n};\n\nGame.prototype.wrap = function(pos){\n    if(pos[0] < 0){\n        pos[0] = Game.DIM_X - ((pos[0]%Game.DIM_X));\n    }\n    else if(pos[1] < 0){\n        pos[1] = Game.DIM_Y - ((pos[1] % Game.DIM_Y));\n    }\n    else if(pos[0] > Game.DIM_X){\n        pos[0] = pos[0] % Game.DIM_X;\n    }\n    else if(pos[1] > Game.DIM_Y){\n        pos[1] = pos[1] % Game.DIM_Y;\n    }\n    return pos;\n};\n\nGame.prototype.isOutOfBounds = function(pos){\n    return ( ((pos[0] < 0) ||  (pos[1] < 0)) || ((pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y)) );\n};\n\nGame.prototype.checkCollisions = function(){\n    //check collision for all objects\n    let objects = this.allObjects();\n    for(let objIdx = 0; objIdx <= objects.length-1; objIdx++){\n        this.checkForCollision(objects[objIdx]);\n    }\n};\n\nGame.prototype.splitAsteroid = function(asteroid){ //split asteroid into two\n    if(asteroid instanceof Asteroid && asteroid.radius > Asteroid.MIN_RADIUS){\n        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*asteroid.vel[1]]});\n        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*-1*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*-1*asteroid.vel[1]]});\n    }\n}\n\nGame.prototype.checkForCollision = function(object){ //for given object, check if colliding with any object\n    let allObjs = this.allObjects();\n    for(let objectIdx = 0; objectIdx <= allObjs.length-1; objectIdx++){\n        if(object !== allObjs[objectIdx]){ // skip if same object\n            if(allObjs[objectIdx].isCollidedWith(object)){ // check if collision\n                //if splitting asteroids uncomment\n                /*\n                    //if both are asteroids\n                    if(allObjs[objectIdx] instanceof Asteroid && object instanceof Asteroid){\n                        //split asteroids\n                        this.splitAsteroid(allObjs[objectIdx]);\n                        this.splitAsteroid(object);\n                    }\n                }*/\n                allObjs[objectIdx].collideWith(object); //resolve collision\n                break;\n            }\n        }\n    }\n};\n\nGame.prototype.removeBullet = function(bullet){\n    for( let i = 0; i <= this.bullets.length-1; i++){\n        if (this.bullets[i] === bullet) {\n            this.bullets.splice(i, 1);\n        }\n    }\n};\n\nGame.prototype.removeAsteroid = function(asteroid){\n    for( let i = 0; i <= this.asteroids.length-1; i++){\n        if (this.asteroids[i] === asteroid) {\n            this.asteroids.splice(i, 1);\n        }\n    }\n};\n\nGame.DIM_X = 1000;\nGame.DIM_Y  = 600;\nGame.NUM_ASTEROIDS = 10;\nGame.ASTEROID_SPLIT = false;\nmodule.exports = Game;\n\n\n\n/*Game.prototype.wrapWithUtil = function(pos){\n    return [ Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];\n};*/\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView(ctx, game, playMode){\n    this.ctx = ctx;\n    this.game = game || new Game();\n    this.ship = this.game.ship || this.game.newShip();\n    this.lastTime = 0;\n    this.firedBullet = false;\n    this.playMode = playMode || 'infinite';\n}\nGameView.MAX_FIRE_RATE = 300; //max rate (in ms) ship can fire bullets\n\n//directions for objects\nGameView.KEY_MOVES = {\n    up: [0, -1],\n    down: [0, 1],\n    right: [1, 0],\n    left: [-1, 0]\n};\n\n//handle user key input using keymaster.js\nGameView.prototype.bindKeyHandlers = function(){\n    let ship = this.ship;\n    let that = this;\n    Object.keys(GameView.KEY_MOVES).forEach(function(k){\n        key(k, ()=>{\n            //ship.power(GameView.KEY_MOVES[k]);\n            ship.powerChangeDir(GameView.KEY_MOVES[k]);\n        });\n        /*if(key.isPressed(k)){\n            ship.powerChangeDir(GameView.KEY_MOVES[k]);\n        }*/\n    });\n    key('space', ()=>{\n            that.limitFiredBullets()\n    });\n};\n\nGameView.prototype.limitFiredBullets = function(){\n    //limit firing of bullets\n    if (this.firedBullet === false){\n        this.firedBullet = true;\n        this.ship.fireBullet();\n        setTimeout(()=>{\n                this.firedBullet = false;\n            }, GameView.MAX_FIRE_RATE);\n    }\n}\n\nGameView.prototype.infinitePlay = function(){\n    if(this.game.asteroids.length === 0){\n        this.game.addAsteroids();\n    }\n}\n\nGameView.prototype.animate = function(currTime){\n    this.currTime = currTime;\n    let deltaTime = currTime-this.lastTime;\n    this.game.step(deltaTime);\n    this.game.draw(this.ctx);\n    this.lastTime = currTime;\n    if(this.playMode == 'infinite'){\n        this.infinitePlay();\n    }\n    //continue animating (passing requestAnimationFrame this)\n    requestAnimationFrame(this.animate.bind(this));\n}\n\nGameView.prototype.start = function(){\n    this.bindKeyHandlers();\n    //animate using interval to reload\n    /*setInterval(function(){\n        that.game.draw(that.ctx);\n        that.game.step();\n    }, 20);*/\n    //start animating using requestAnimationFrame()\n    requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n//window.GameView = GameView;\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n    let canvas = document.getElementById('game-canvas');\n    canvas.width = Game.DIM_X;\n    canvas.height = Game.DIM_Y;\n    const ctx = canvas.getContext('2d');\n    const game = new Game();\n    const gameView = new GameView(ctx, game, 'split');\n    gameView.start();\n\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options){\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.isWrappable = true;\n\nMovingObject.prototype.draw = function(ctx){\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0],\n            this.pos[1],\n            this.radius,\n            0,\n            2 * Math.PI,\n            false\n            );\n        ctx.fill();\n};\n\nMovingObject.prototype.move = function(deltaTime){\n    deltaTime = deltaTime || 1;\n    const deltaX = this.vel[0]*deltaTime;\n    const deltaY = this.vel[1]*deltaTime;\n    this.pos = [ this.pos[0] + deltaX, this.pos[1] + deltaY];\n    if(this.game.isOutOfBounds(this.pos)){\n        if(this.isWrappable){\n            this.pos = this.game.wrap(this.pos);\n        }\n        else{\n            this.game.remove(this);\n        }\n    }\n};\n\nMovingObject.prototype.isCollidedWith = function(otherObject){\n    return (Util.distBetweenTwoPositions(this.pos, otherObject.pos) < (this.radius+otherObject.radius));\n};\n\nMovingObject.prototype.collideWith = function(otherObject){\n    //leave empty, overwritten by asteroid, but called on other moving objects\n};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nfunction Ship(options){\n    options = options || {};\n    options.color  = options.color || Ship.COLOR;\n    options.radius = options.radius || Ship.SIZE;\n    options.pos = options.pos || Util.randomPos(options.radius);\n    options.vel = options.vel || [0,0];\n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function relocate(){\n    this.pos = Util.randomPos(this.radius);\n    this.vel = [0,0];\n};\n\nShip.prototype.fireBullet = function fireBullet(){\n    const norm = Util.norm(this.vel);\n    //do not fire if ship is not moving\n    if(norm===0){\n        return;\n    }\n    const bullet = new Bullet({game: this.game, pos: [this.pos[0]+this.vel[0]*this.radius/2, this.pos[1]+this.vel[1]*this.radius/2], vel: [this.vel[0]*2, this.vel[1]*2]});\n    this.game.add(bullet);\n};\n\nShip.prototype.power = function power(impulse){\n\n    if(this.vel[1] <= Ship.MAX_V && this.vel[0] >= -1*Ship.MAX_V){\n        this.vel[0]+= impulse[0];\n    }\n    if(this.vel[1] <= Ship.MAX_V && this.vel[1] >= -1*Ship.MAX_V){\n        this.vel[1]+= impulse[1];\n    }\n};\n\nShip.prototype.powerChangeDir = function power(impulse){\n    this.vel = [impulse[0]*2, impulse[1]*2];\n};\n//overwrite draw\nShip.prototype.draw = function(ctx){\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0],\n            this.pos[1],\n            this.radius,\n            0,\n            2 * Math.PI,\n            false\n            );\n        ctx.strokeStyle = Ship.BORDER_COLOR;\n        ctx.lineWidth = 1;\n        ctx.stroke();\n        ctx.fillStyle = this.color;\n        ctx.fill();\n        this.drawInnerCircle(ctx);\n        this.drawShip(ctx);\n\n};\nShip.prototype.drawInnerCircle = function(ctx){\n    ctx.beginPath();\n        ctx.arc(\n            this.pos[0],\n            this.pos[1],\n            this.radius/2,\n            0,\n            2 * Math.PI,\n            false\n            );\n        ctx.fillStyle = 'yellow';\n        ctx.fill();\n}\n\nShip.prototype.drawShip = function(ctx){\n    ctx.beginPath();\n    ctx.moveTo(this.pos[0] - this.radius/2, this.pos[1] - this.radius/4);\n    ctx.lineTo(this.pos[0] + this.radius/2, this.pos[1] - this.radius/4);\n    ctx.lineTo(this.pos[0], this.pos[1]+ this.radius/2);\n    ctx.fillStyle = 'black';\n    ctx.fill();\n}\nShip.MAX_V = 3;\nShip.SIZE = 12; //alias for radius\nShip.COLOR = 'black';\nShip.BORDER_COLOR = 'gray';\nmodule.exports = Ship;\n\n\n/*MovingObject.prototype.drawShip2 = function(ctx){\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.moveTo(this.pos[0] + 7.5*this.radius, this.pos[1]+ 3*this.radius);\n    ctx.lineTo(this.pos[0]+ 10*this.radius, this.pos[1] + 7.5*this.radius);\n    ctx.lineTo(this.pos[0] + 10*this.radius, this.pos[1] + 2.5*this.radius);\n    ctx.fill();\n}*/\n\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("\nconst Util = {\n    //inheritance function\n    inherits(childClass, parentClass) {\n        childClass.prototype = Object.create(parentClass.prototype);\n        childClass.prototype.constructor = childClass;\n    },\n    //random vector\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    //random Position in canvas space\n    randomPos(radius){\n        return [Math.floor(Math.random()*(1000- radius)), Math.floor(Math.random()*(600 - radius))];\n    },\n\n    //random color\n    randRGB(){\n        let r = Math.floor(Math.random()*255);\n        let g = Math.floor(Math.random()*255);\n        let b = Math.floor(Math.random()*255);\n        return `rgb(${r}, ${g}, ${b})`;\n    },\n\n    //wrap helper function\n    wrap(posPt, max){\n        if(posPt < 0){\n            return max - (Math.floor(posPt) % max);\n        }\n        else if (posPt > max){\n            return Math.floor(posPt) % max;\n        }\n        else{\n            return posPt;\n        }\n    },\n    //calculate distance between two points\n    distBetweenTwoPositions(pos1, pos2){\n        return Math.sqrt((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2);\n    },\n    //calculate norm (magnitude or length)\n    norm(velocity){\n        return this.distBetweenTwoPositions([0,0], velocity);\n    },\n    fiftyPercentChance(){\n        return ((Math.random()*10) % 2) !== 0\n    }\n};\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;