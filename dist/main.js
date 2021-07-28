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

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction randomPos(){\n    return [Math.floor(Math.random()*(600- Asteroid.RADIUS)), Math.floor(Math.random()*(1000 - Asteroid.RADIUS))]\n}\n\nfunction Asteroid(options){\n    options = options || {};\n    options.color  = options.color || Util.randRGB();\n    options.pos = options.pos || randomPos();\n    options.radius = options.radius || Asteroid.RADIUS;\n    options.vel = options.vel || Util.randomVec((Math.random()+0.25)*3);\n    //options.game = options.game;\n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Asteroid, MovingObject);\nAsteroid.prototype.collideWith = function collideWith(otherObject){\n    if(otherObject instanceof Ship){\n        //this.game.remove(otherObject);\n        otherObject.relocate();\n    }\n};\n\nAsteroid.prototype.isCollidedWith = function(otherObject){\n    if(otherObject instanceof Ship){\n        return (Util.distBetweenTwoPositions(this.pos, otherObject.pos) < (this.radius+otherObject.radius));\n    }\n};\n\nAsteroid.COLOR = 'red';\nAsteroid.RADIUS = 30;\nAsteroid.MIN_RADIUS = 15;\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction Game(asteroids, ship){\n    this.asteroids = asteroids || [];\n    this.ship = ship || this.newShip();\n    this.addAsteroids();\n}\nGame.prototype.allObjects = function(){\n    return this.asteroids.concat([this.ship]);\n}\n\nGame.prototype.newShip = function(){\n    return new Ship({game: this});\n}\n\nGame.prototype.randomPosition = function(radius){\n    radius = radius || 10;\n    return [Math.floor(Math.random()*(Game.DIM_X - radius)), Math.floor(Math.random()*(Game.DIM_Y - radius))];\n};\n\nGame.prototype.addAsteroid = function(options){\n    options = options || {};\n    options.game = this;\n    let a = new Asteroid(options);\n    this.asteroids.push(a);\n};\n\nGame.prototype.addAsteroids = function addAsteroids(){\n    for(let i = 0; i < Game.NUM_ASTEROIDS; i++){\n        this.addAsteroid();\n    }\n};\n\nGame.prototype.draw = function(ctx){\n    ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);\n    this.asteroids.forEach((a)=>{a.draw(ctx);});\n    this.ship.draw(ctx);\n};\n\nGame.prototype.moveObjects = function(){\n    let x = Math.random()*10;\n    if(x % 2 !== 0){\n\n        //console.log(this.ship);\n    }\n    this.allObjects().forEach((obj) => obj.move());\n};\n\nGame.prototype.step = function(){\n    this.moveObjects();\n    this.checkCollisions();\n};\n\nGame.prototype.wrap = function(pos){\n    if(pos[0] < 0){\n        pos[0] = Game.DIM_X - ((pos[0]%Game.DIM_X));\n    }\n    else if(pos[1] < 0){\n        pos[1] = Game.DIM_Y - ((pos[1] % Game.DIM_Y));\n    }\n    else if(pos[0] > Game.DIM_X){\n        pos[0] = pos[0]%Game.DIM_X;\n    }\n    else if(pos[1] > Game.DIM_Y){\n        pos[1] = pos[1]%Game.DIM_Y;\n    }\n    return pos;\n};\n\nGame.prototype.isOutOfBounds = function(pos){\n    return ( ((pos[0] < 0) ||  (pos[1] < 0)) || ((pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y)) );\n};\n\nGame.prototype.checkCollisions = function(){\n    //Game.prototype.checkCollisions\n    //check collisions for all objects (asteroids with ship)\n    let objects = this.allObjects();\n    for(let objIdx = 0; objIdx <= objects.length-1; objIdx++){\n        this.checkForCollision(objects[objIdx]);\n    }\n};\n\nGame.prototype.splitAsteroid = function(asteroid){\n    if(asteroid.radius > Asteroid.MIN_RADIUS){\n        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*asteroid.vel[1]]});\n        this.addAsteroid({radius: asteroid.radius/2, pos: [asteroid.pos[0] + asteroid.radius*-1*asteroid.vel[0] , asteroid.pos[1]+asteroid.radius*-1*asteroid.vel[1]]});\n    }\n}\n\nGame.prototype.checkForCollision = function(object){ //for asteroids\n    let allObjs = this.allObjects();\n    for(let objectIdx = 0; objectIdx <= allObjs.length-1; objectIdx++){\n        if(object !== allObjs[objectIdx]){\n            if(allObjs[objectIdx].isCollidedWith(object)){\n                    allObjs[objectIdx].collideWith(object);\n                    //if both are asteroids\n                    if(allObjs[objectIdx] instanceof Asteroid && object instanceof Asteroid){\n                        let ast1 = allObjs[objectIdx];\n                        let ast2 = object;\n                        //remove asteroids?\n                        //split asteroids?\n                        //this.splitAsteroid(ast1);\n                        //this.splitAsteroid(ast2);\n                    }\n                    break;\n            }\n        }\n    }\n};\n\nGame.prototype.removeAsteroid = function(object){\n    for( let i = 0; i <= this.asteroids.length-1; i++){\n        if (this.asteroids[i] === object) {\n            this.asteroids.splice(i, 1);\n            return this.asteroids;\n        }\n    }\n};\n\nGame.DIM_X = 1000;\nGame.DIM_Y  = 600;\nGame.NUM_ASTEROIDS = 6;\n\nmodule.exports = Game;\n\n\n\n/*Game.prototype.wrap2 = function(pos){\n    return [ Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];\n};*/\n\n/*Game.prototype.wrap2 = function wrap(pos){\n    if(pos[0] < 0){\n        pos[0] = Game.DIM_Y - pos[0];\n    }\n    if(pos[1] < 0){\n        pos[1] = Game.DIM_X - pos[1];\n    }\n    if(pos[0] > Game.DIM_X){\n        pos[0] = 0;\n    }\n    if(pos[1] > Game.DIM_Y){\n        pos[1] = 0;\n    }\n    return pos;\n};*/\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n//const keymaster = require('./keymaster');\n\nfunction GameView(ctx, game){\n    this.ctx = ctx;\n    this.game = game || new Game();\n    this.ship = this.game.ship || this.game.newShip();\n}\n\nGameView.MOVES = {\n    up: [0, -1],\n    down: [0, 1],\n    right: [1, 0],\n    left: [-1, 0]\n};\n\nGameView.prototype.start = function(){\n    let that = this;\n    setInterval(function(){\n        that.bindKeyHandlers();\n        that.game.draw(that.ctx);\n        that.game.step();\n    }, 20);\n};\n\nGameView.prototype.bindKeyHandlers = function(){\n    let that = this;\n    Object.keys(GameView.MOVES).forEach((k)=>{\n        key(k, function(){\n            console.log(k, GameView.MOVES[k]);\n            that.ship.power(GameView.MOVES[k]);\n        });\n    });\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("//const MovingObject = require('./moving_object');\n//const Asteroid = require(\"./asteroid\");\n//const Util = require('./utils');\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n//const Ship = require('./ship');\n\n//window.MovingObject = MovingObject;\n//window.Asteroid = Asteroid;\n//window.Game = Game;\n//window.GameView = GameView;\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n    let canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext('2d');\n    const game = new Game();\n    const gameView = new GameView(ctx, game);\n    gameView.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options){\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.drawShip2 = function(ctx){\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.moveTo(this.pos[0] + 7.5*this.radius, this.pos[1]+ 3*this.radius);\n    ctx.lineTo(this.pos[0]+ 10*this.radius, this.pos[1] + 7.5*this.radius);\n    ctx.lineTo(this.pos[0] + 10*this.radius, this.pos[1] + 2.5*this.radius);\n    ctx.fill();\n}\n\nMovingObject.prototype.drawShip = function(ctx){\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.moveTo(this.pos[0] - this.radius, this.pos[1] - this.radius);\n    ctx.lineTo(this.pos[0] + this.radius, this.pos[1] - this.radius);\n    ctx.lineTo(this.pos[0], this.pos[1]+ 3*this.radius);\n    ctx.fill();\n}\n\nMovingObject.prototype.draw = function(ctx){\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0],\n            this.pos[1],\n            this.radius,\n            0,\n            2 * Math.PI,\n            false\n            );\n        ctx.fill();\n};\n\n\nMovingObject.prototype.move = function(){\n    const offsetX = this.vel[0];\n    const offsetY = this.vel[1];\n    this.pos = [ this.pos[0] + offsetX, this.pos[1] + offsetY];\n    if(this.game.isOutOfBounds(this.pos)){\n        this.pos = this.game.wrap(this.pos);\n    }\n};\n\nMovingObject.prototype.isCollidedWith = function(otherObject){\n    return (Util.distBetweenTwoPositions(this.pos, otherObject.pos) < (this.radius+otherObject.radius));\n};\n\nMovingObject.prototype.collideWith = function(otherObject){\n    //this.game.removeAsteroid(otherObject);\n    //this.game.remove(this);\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("//const Asteroid = require(\"./asteroid\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nfunction Ship(options){\n    options = options || {};\n    options.color  = options.color || Ship.COLOR;\n    options.radius = options.radius || Ship.SIZE;\n    options.pos = options.pos || Util.randomPos(options.radius);\n    options.vel = options.vel || [0,0];\n    //options.game = options.game;\n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function relocate(){\n    this.pos = this.game.randomPosition();\n    this.vel = [0,0];\n};\n\nShip.prototype.power = function power(impulse){\n    /*if(this.vel[0] <= Ship.MAX_VELOCITY){\n        this.vel[0]+= impulse[0]*0.01;\n    }*/\n    /*if(this.vel[1] <= Ship.MAX_VELOCITY){\n        this.vel[1]+= impulse[1]*0.01;\n    }*/\n    this.vel = [impulse[0], impulse[1]];\n};\n\nShip.MAX_VELOCITY = 1;\nShip.SIZE = 10; //radius?\nShip.COLOR = 'black';\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("\nconst Util = {\n    inherits(childClass, parentClass) {\n        childClass.prototype = Object.create(parentClass.prototype);\n        childClass.prototype.constructor = childClass;\n    },\n\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    randomPos(radius){\n        return [Math.floor(Math.random()*(1000- radius)), Math.floor(Math.random()*(600 - radius))];\n    },\n\n    randRGB(){\n        let r = Math.floor(Math.random()*255);\n        let g = Math.floor(Math.random()*255);\n        let b = Math.floor(Math.random()*255);\n        return `rgb(${r}, ${g}, ${b})`;\n    },\n\n    wrap(posPt, max){\n        if(posPt < 0){\n            return max - (Math.floor(posPt) % max);\n        }\n        else if (posPt > max){\n            return Math.floor(posPt) % max;\n        }\n        else{\n            return posPt;\n        }\n    },\n    distBetweenTwoPositions(pos1, pos2){\n        return Math.sqrt((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2);\n    },\n    norm(velocity){ //magnitude or length (pixels per sec)\n        return this.distBetweenTwoPositions([0,0], velocity);\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

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