class Player {
  constructor() {
    this.name = null,
    this.index = null,
    this.positionX = 0;
    this.positionY = 0;
  }

  //adicionar um novo player ao banco de dados
  addPlayer(){
    var playerIndex = "players/player"+ this.index;
    //posiciona o player na tela
    if(this.index === 1){
      this.positionX = width/2 - 100;
    }else{
      this.positionX = width/2 + 100;
    }
    //adicionar o player no BD
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
    });
  }

  //verificar e trazer a informação do playerCount do BD para o VS
  getCount(){
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", function(data){
      playerCount = data.val();
    });
  }
  //atualizar o playerCount do banco da dados
  updateCount(count){
    database.ref("/").update({
      playerCount: count,
    });
  }

  //pegar a informação dos players no BD
  static getPlayersInfo(){
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data =>{
      allPlayers = data.val();
    })
  }

  //atualiza o player
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX : this.positionX,
      positionY : this.positionY,
    });
  }
}//classe
