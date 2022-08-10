class Game {
  constructor() {}

  //tela inicial do jogo
  start() {
    form = new Form();
    form.display();
    player = new Player();
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
