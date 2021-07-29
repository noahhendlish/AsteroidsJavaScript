//const MovingObject = require('./moving_object');
//const Asteroid = require("./asteroid");
//const Util = require('./utils');
const Game = require('./game');
const GameView = require('./game_view');
//const Ship = require('./ship');

//window.MovingObject = MovingObject;
//window.Asteroid = Asteroid;
//window.Game = Game;
//window.GameView = GameView;

document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const game = new Game();
    const gameView = new GameView(ctx, game);
    gameView.start();

});