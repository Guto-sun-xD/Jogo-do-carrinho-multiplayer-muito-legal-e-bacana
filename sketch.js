var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount, gameState;
var allPlayers;
var carro1,carro2, carro1Img, carro2Img, pistaImg;
var carros = [];

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  carro1Img = loadImage("./assets/car1.png");
  carro2Img = loadImage("./assets/car2.png");
  pistaImg = loadImage("./assets/PISTA.png");
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
