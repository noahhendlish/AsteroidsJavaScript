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

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n//const Game = require('./game');\n\nfunction randomPos(){\n    return [Math.floor(Math.random()*(600- Asteroid.RADIUS)), Math.floor(Math.random()*(1000 - Asteroid.RADIUS))]\n}\n\nfunction Asteroid(options){\n    options = options || {};\n    options.color  = options.color || Asteroid.COLOR;\n    options.pos = options.pos || randomPos();\n    options.radius = options.radius || Asteroid.RADIUS;\n    options.vel = options.vel || Utils.randomVec(Math.random()*4);\n    MovingObject.call(this, options);\n}\n\nUtils.inherits(Asteroid, MovingObject);\nAsteroid.COLOR = 'red';\nAsteroid.RADIUS = 20;\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Game(asteroids, ship){\n    this.asteroids = asteroids || [];\n    this.ship = ship || null;\n    this.addAsteroids();\n}\n\nGame.prototype.randomPosition = function(radius){\n    radius = radius || 10;\n    return [Math.floor(Math.random()*(Game.DIM_X - radius)), Math.floor(Math.random()*(Game.DIM_Y - radius))];\n};\n\nGame.prototype.addAsteroid = function(){\n    let a = new Asteroid({game: this});\n    this.asteroids.push(a);\n}\n\nGame.prototype.addAsteroids = function addAsteroids(){\n    for(let i = 0; i < Game.NUM_ASTEROIDS; i++){\n        this.addAsteroid();\n    }\n    return this.asteroids;\n};\n\nGame.prototype.draw = function(ctx){\n    ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);\n    this.asteroids.forEach((a)=>{a.draw(ctx);});\n};\n\nGame.prototype.moveObjects = function(){\n    this.asteroids.forEach((a)=> a.move());\n}\n\nGame.prototype.wrap = function(pos){\n    if(pos[0] <= 0){\n        pos[0] = Game.DIM_X;\n    }\n    if(pos[1] <= 0){\n        pos[1] = Game.DIM_Y;\n    }\n    if(pos[0] >= Game.DIM_X){\n        pos[0] = 0;\n    }\n    if(pos[1] >= Game.DIM_Y){\n        pos[1] = 0;\n    }\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y  = 600;\nGame.NUM_ASTEROIDS = 4;\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction GameView(ctx, game){\n    this.ctx = ctx;\n    this.game = game;\n}\n\nGameView.prototype.start = function(){\n    let that = this;\n    setInterval(function(){\n        that.game.draw(that.ctx);\n        that.game.moveObjects();\n    }, 20);\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Game = Game;\nwindow.GameView = GameView;\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n    let canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext('2d');\n    const game = new Game();\n    const gameView = new GameView(ctx, game);\n    gameView.start();\n\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction MovingObject(options){\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    //this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx){\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0],\n            this.pos[1],\n            this.radius,\n            0,\n            2 * Math.PI,\n            false\n            );\n        ctx.fill();\n};\n\nMovingObject.prototype.move = function(){\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n    //this.pos = this.game.wrap(this.pos);\n}\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("\n\nconst Util = {\n    inherits(childClass, parentClass) {\n        childClass.prototype = Object.create(parentClass.prototype);\n        childClass.prototype.constructor = childClass;\n    },\n\n    randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

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