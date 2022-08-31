class Game {
  constructor() {
    this.resetButton = createButton("");
    this.resetTitle = createElement("h2");
    this.leaderboardTitle = createElement("h2")
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  //tela inicial do jogo
  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
    //sprites dos carros
    carro1 = createSprite(width/2 - 100,  height - 100);
    carro1.addImage("carro1",carro1Img);
    carro1.scale = 0.07;
    carro2 = createSprite(width/2 + 100, height -100 );
    carro2.addImage("carro1",carro2Img);
    carro2.scale = 0.07;

    carros = [carro1,carro2];
    // i         0     1

    //criação dos grupos
    fuels = new Group();
    powerCoins = new Group();

    //adição dos sprites
    this.addSprites(fuels,11,fuelImg,0.02);
    this.addSprites(powerCoins,13,powerCoinsImg,0.09);
  }

  //função que lida com os elementos da tela
  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");

    //botão de reset
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2 + 230,40);
    this.resetTitle.html("Restart");

    this.resetButton.class("resetButton");
    this.resetButton.position(width/2 + 230,100);
    //this.resetButton.html("Restart");

    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width/3 - 60,40);
    this.leaderboardTitle.html("Placar");

    this.leader1.class("resetText");
    this.leader1.position(width/3 - 60,90);
   
    this.leader2.class("resetText");
    this.leader2.position(width/3 - 60,130);
  }

  //função de restart
  restartButton(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
      });
      window.location.reload();
    });
  }//reset

  //função para funcionamento do jogo 
  play(){
    this.handleElements();
    Player.getPlayersInfo();
    this. restartButton();

    if(allPlayers != undefined){
      image(pistaImg,0,-height*5, width, height*6);
     
     this.showLeaderboard();

      var index = 0;
      for (var plr in allPlayers){
        index = index + 1;
        
      
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        carros[index-1].position.x = x;
        carros[index-1].position.y = y;
 

       if(index == player.index){ //comandos aplicados a cada jogador
        //camera do jogo para cada carro
        camera.position.y = carros[index-1].position.y;
        //marcação do carro
        stroke(10);
        fill("red");
        ellipse(x,y,60);
       }

      }

      this.playerControl();
      drawSprites();
    }
   
  }
  //verificar e trazer a informação do gameState do BD para o VS
  getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data){
      gameState = data.val();
    });
  }

  //atualizar o gameState do banco da dados
  updateState(state){
    database.ref("/").update({
      gameState: state,
    });
  }

 //mover os carros
 playerControl(){
  if(keyDown("w")){
    player.positionY += 10;
    player.update();
  }
 }
  showLeaderboard(){
    var leader1,leader2;
    var players = Object.values(allPlayers);
    if((players[0].ranking == 0 && players[1].ranking == 0) || players[0].ranking == 1){
    
      leader1 = 
    players[0].ranking +
    "&emsp;" + 
    players[0].name + 
    "&emsp;" +
    players[0].score;

    leader2 = 
    players[1].ranking +
    "&emsp;" + 
    players[1].name + 
    "&emsp;" +
    players[1].score;
    }
    if(players[1].ranking == 1){
      leader2 = 
    players[0].ranking +
    "&emsp;" + 
    players[0].name + 
    "&emsp;" +
    players[0].score;

    leader1 = 
    players[1].ranking +
    "&emsp;" + 
    players[1].name + 
    "&emsp;" +
    players[1].score;
    }
  
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  
  }
  
  //criar os sprites de combustível, moeda e obstáculos
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale){
    for(var i=0; i<numberOfSprites; i++){

      var x, y;

      x = random(width/2 -150, width + 150);
      y = random(-height*4.5, height - 400);
      
      var sprite = createSprite(x,y);
      sprite.addImage(spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);

    }
  }
    
}//classe
