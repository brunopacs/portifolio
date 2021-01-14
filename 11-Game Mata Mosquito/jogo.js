var altura = window.innerHeight;
var largura = window.innerWidth;
var vida = 3;
var tempo = 10;
var nivel = window.location.search;
nivel = nivel.replace("?", "");

if (nivel == "nivel1"){
  criaMosquitoTempo = 1500;
} else if (nivel == "nivel2") {
  criaMosquitoTempo = 1000;
} else if(nivel == "nivel3") {
  criaMosquitoTempo = 750;
}

var cronometro = setInterval(function(){
  document.getElementById("cronometro").innerHTML = tempo;
  tempo--;
  if (tempo < 0) {
    window.location.href = "win.html"
  }
  }, 1000)

function windowSizeChanged () {
  altura = window.innerHeight;
  largura = window.innerWidth;
}



function criarMosquito() {

  if (document.getElementById("mosquito")) {
    vida--; 
    console.log(vida);   
    document.getElementById("mosquito").remove();
    if (vida == 2) {
      document.getElementById("vida1").src = "imagens/coracao_vazio.png";
    } else if (vida == 1) {
      document.getElementById("vida2").src = "imagens/coracao_vazio.png";
    } else if (vida == 0) {
      document.getElementById("vida3").src = "imagens/coracao_vazio.png";
      window.location.href="game-over.html";
    }
  }

  var mosquito = document.createElement("img");
  mosquito.id = "mosquito";
  mosquito.src = "imagens/mosquito.png";
  mosquito.style.position = "absolute";
  mosquito.onclick = matarMosquito;
  document.body.appendChild(mosquito);
  document.getElementById("mosquito").className = randomClassName()+ " " +randomSide();
  document.getElementById("mosquito").style.top = randomYPosition();
  document.getElementById("mosquito").style.left = randomXPosition();

  
  function randomClassName () {
    var className = "mosquito" +(Math.floor(3 * Math.random()));
    return className;
  }
  function randomYPosition () {
    var alturaMosquito = document.getElementById("mosquito").height;
    var Yposition = Math.round((altura - alturaMosquito) * Math.random());
    return (Yposition+ "px");
  }
  function randomXPosition () {
    var larguraMosquito = document.getElementById("mosquito").width;
    var Xposition = Math.round((largura - larguraMosquito) * Math.random());
    return (Xposition+ "px");
  }
  function randomSide () {
    var lado = Math.floor(2 * Math.random());
    switch (lado) {
      case 0:
        return "ladoA";
      case 1:
        return "ladoB";
    }
  }
  function matarMosquito() {
    this.remove();
  }
}

// ----------------------------------INDEX.HTML---------------------------
