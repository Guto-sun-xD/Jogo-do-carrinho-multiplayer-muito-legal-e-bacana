var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount, gameState;
var carro1,carro2
var carros = [];

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  //atualiza o gameState
  if(playerCount == 2){
    game.updateState(1);
  }
 if(gameState == 1 ){
  game.play();
 }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
