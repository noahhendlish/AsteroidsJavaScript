const Game = require('./game');
const GameView = require('./game_view');
//window.GameView = GameView;

document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.getElementById('game-canvas');
    canvas.width = Game.DIM_X;
    canvas.height = Game.DIM_Y;
    const ctx = canvas.getContext('2d');
    const game = new Game();
    const gameView = new GameView(ctx, game, 'split');
    gameView.start();

});