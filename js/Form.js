class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }
  setElementsPosition() {
    this.titleImg.position(120,50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  display(){
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }

  handleMousePressed(){
    this.playButton.mousePressed(()=>{
      //o que fazer se pressionar o botão
    this.playButton.hide();
    this.input.hide();
    var message = `Bem vindo ${this.input.value()} </br> Aguarde o próximo jogador`; 
    this.greeting.html(message);
  });
  }

}
