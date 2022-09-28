var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount, gameState;
var allPlayers;
var carro1,carro2, carro1Img, carro2Img, pistaImg;
var carros = [];
var fuelImg, powerCoinsImg, fuels, powerCoins;
var obstacles, obstacles1Img, obstacles2Img;
var lifeImg;
var explosion

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  carro1Img = loadImage("./assets/car1.png");
  carro2Img = loadImage("./assets/car2.png");
  pistaImg = loadImage("./assets/track2.jpg");
  fuelImg = loadImage("./assets/fuel.png");
  powerCoinsImg = loadImage("./assets/goldCoin.png");
  obstacles1Img = loadImage("./assets/obstacle1.png");
  obstacles2Img = loadImage("./assets/obstacle2.png");
  explosion = loadImage("./assets/blast.png");
  lifeImg = loadImage("./assets/life.png");
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
  if(gameState == 2 ){
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
