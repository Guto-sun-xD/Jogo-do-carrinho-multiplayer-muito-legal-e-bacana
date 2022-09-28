class Game {
  constructor() {
    this.resetButton = createButton("");
    this.resetTitle = createElement("h2");
    this.leaderboardTitle = createElement("h2")
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.driving = false;
    this.leftKeyActive = false;
    this.blast = false;
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
    carro1.addImage("explosao",explosion);
    carro2.addImage("explosao",explosion);
    
    carros = [carro1,carro2];
    // i         0     1

    //criação dos grupos
    fuels = new Group();
    powerCoins = new Group();
    obstacles = new Group();
    var obstaclesPositions = [ { x: width / 2 + 250, y: height - 800, image: obstacles2Img},
     { x: width / 2 - 150, y: height - 1300, image: obstacles1Img },
      { x: width / 2 + 250, y: height - 1800, image: obstacles1Img },
       { x: width / 2 - 180, y: height - 2300, image: obstacles2Img },
        { x: width / 2, y: height - 2800, image: obstacles2Img },
         { x: width / 2 - 180, y: height - 3300, image: obstacles1Img },
          { x: width / 2 + 180, y: height - 3300, image: obstacles2Img },
           { x: width / 2 + 250, y: height - 3800, image: obstacles2Img },
            { x: width / 2 - 150, y: height - 4300, image: obstacles1Img },
             { x: width / 2 + 250, y: height - 4800, image: obstacles2Img },
              { x: width / 2, y: height - 5300, image: obstacles1Img },
               { x: width / 2 - 180, y: height - 5500, image: obstacles2Img } ];

    //adição dos sprites
    this.addSprites(fuels,11,fuelImg,0.02);
    this.addSprites(powerCoins,13,powerCoinsImg,0.09);
    this.addSprites(obstacles,obstaclesPositions.length,obstacles1Img,0.04,obstaclesPositions);
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
        carsAtEnd: 0,
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
    this.restartButton();
    player.getCarsAtEnd();

    if(allPlayers != undefined){
      image(pistaImg,0,-height*5, width, height*6);
      this.lifeBar();
      this.fuelBar();
      this.showLeaderboard();
     
      var index = 0;
      for (var plr in allPlayers){
        index = index + 1;
        
      
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        carros[index-1].position.x = x;
        carros[index-1].position.y = y;
 
        var currentLife = allPlayers[plr].life;
        if(currentLife <= 0){
          carros[index-1].changeImage("explosao")
          carros[index-1].scale = 0.3
        }

       if(index == player.index){ //comandos aplicados a cada jogador
        //camera do jogo para cada carro
        camera.position.y = carros[index-1].position.y;
        //marcação do carro
        stroke(10);
        fill("red");
        ellipse(x,y,60);
        this.handleCars(index);
        this.handleObs(index);
        this.handleFuels(index);
        this.handlePowerCoins(index);
        if(player.life<=0){
          this.blast = true;
          this.driving = false;
        } 
      }

      }

      this.playerControl();

      //linha de chegada
      const finishLine = height*6 - 100;

      if(player.positionY > finishLine){
        gameState = 2;
        player.rank +=1;
        Player.updateCarsAtEnd(player.rank);
        player.update();
        this.showRank();
      }



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
  if(!this.blast){
  if(keyDown("w")){
    player.positionY += 10;
    player.update();
    this.driving = true;
  }
  if(keyDown("a") && player.positionX > width/2 - 350){
    player.positionX -= 10
    player.update();
    this.leftKeyActive = true;
  }
  if(keyDown("d") && player.positionX < width/2 + 350 ){
    player.positionX += 10
    player.update();
    this.leftKeyActive = false;
   }
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
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions= []){
    for(var i=0; i<numberOfSprites; i++){

      var x, y;

      if(positions.length>0){
      x = positions[i].x;
      y = positions[i].y;
      spriteImage = positions[i].image


      }
      else{
        x = random(width/2 -150, width + 150);
        y = random(-height*4.5, height - 400);
      }
      
      var sprite = createSprite(x,y);
      sprite.addImage(spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);

    }
  }

  //pegando os combustíveis
  handleFuels(index){
    carros[index-1].overlap(fuels, function(collector,collected){
      player.fuel += 40;
      collected.remove();
      player.update();
     })
    if(player.fuel <= 0){
    this.gameOver();
    gameState = 2;
    }
   if(player.fuel > 0 && this.driving){
    player.fuel -= 0.5;
   }
  
  }
  
  //pegando as moedas
  handlePowerCoins(index){
    carros[index-1].overlap(powerCoins, function(collector,collected){
      player.score += 1;
      collected.remove();
      player.update();
    })
  }

  //aviso de chegada
  showRank(){
    swal({
      title: `Incrível, ${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada",
      imageUrl: 
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
    })
  }

 gameOver(){
  swal({
    title: `Fim de Jogo, ${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você perdeu :(",
      imageUrl: 
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
  })
 }

 lifeBar(){
  push()
  image(lifeImg,width/2 - 130,height - player.positionY - 400,25,25);
  fill("white");
  rect(width/2 - 100,height - player.positionY - 400,185,25);
  fill("red");
  rect(width/2 - 100,height - player.positionY - 400,player.life,25);
  pop()
 }

 fuelBar(){
  push()
  image(fuelImg,width/2 - 130,height - player.positionY - 300,25,25);
  fill("white");
  rect(width/2 - 100,height - player.positionY - 300,185,25);
  fill("orange");
  rect(width/2 - 100,height - player.positionY - 300,player.fuel,25);
  pop()
 }

 handleObs(index){
 if(carros[index-1].collide(obstacles)){
    if(this.leftKeyActive){
      player.positionX += 100;
    }
    else{
      player.positionX -= 100;
    }
    if(player.life > 0){
      player.life -= 40;
    }
    player.update();
   }
}

handleCars(index){
  if(index == 1){
  if(carros[index-1].collide(carros[1])){
     if(this.leftKeyActive){
       player.positionX += 100;
     }
     else{
       player.positionX -= 100;
     }
     if(player.life > 0){
       player.life -= 40;
     }
     player.update();
    }
  }
  if(index == 2){
    if(carros[index-1].collide(carros[0])){
       if(this.leftKeyActive){
         player.positionX += 100;
       }
       else{
         player.positionX -= 100;
       }
       if(player.life > 0){
         player.life -= 40;
       }
       player.update();
      }
    }
  }

  end(){
    console.log("gameOver");
  }

}//classe

