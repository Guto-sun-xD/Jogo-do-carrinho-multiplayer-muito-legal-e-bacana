class Game {
  constructor() {}

  //tela inicial do jogo
  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
    //sprites dos carros
    carro1 = createSprite(width/2 - 100,  height - 100)
    carro2 = createSprite(width/2 + 100, height -100 )
    carros = [carro1,carro2];
  }
  //função para funcionamento do jogo 
  play(){
    drawSprites();
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

}
