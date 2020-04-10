var app = {};

var imagens = [
    {
        id: 1,
        img1:'img/android.png',
        img2:'img/cross.png',
    },{
        id:2,
        img1:'img/chrome.png',
        img2:'img/cross.png',
    },{
        id:3,
        img1:'img/facebook.png',
        img2:'img/cross.png',
    },{
        id:4,
        img1:'img/firefox.png',
        img2:'img/cross.png',
    },{
        id: 5,
        img1:'img/html5.png',
        img2:'img/cross.png',
    },{
        id:6,
        img1:'img/twitter.png',
        img2:'img/cross.png',
    },{
        id:7,
        img1:'img/windows.png',
        img2:'img/cross.png',
    },{    
        id:8,
        img1:'img/googleplus.png',
        img2:'img/cross.png',
    },{
        id: 1,
        img1:'img/android.png',
        img2:'img/cross.png',
    },{
        id:2,
        img1:'img/chrome.png',
        img2:'img/cross.png',
    },{
        id:3,
        img1:'img/facebook.png',
        img2:'img/cross.png',
    },{
        id:4,
        img1:'img/firefox.png',
        img2:'img/cross.png',
    },{
        id: 5,
        img1:'img/html5.png',
        img2:'img/cross.png',
    },{
        id:6,
        img1:'img/twitter.png',
        img2:'img/cross.png',
    },{
        id:7,
        img1:'img/windows.png',
        img2:'img/cross.png',
    },{    
        id:8,
        img1:'img/googleplus.png',
        img2:'img/cross.png',
    }
];

var tempo_total;
var tentativas_erro = 0;
var primeiro_card;
var segundo_card;
var bloquear_tabuleiro = false;
var card_virado = false;

(function (){

  $("#finalizar_jogo").hide();

  $("#iniciar_jogo").click(function(){       
      $("#iniciar_jogo").hide();
      $("#finalizar_jogo").show();

      iniciar();
  });

  $("#finalizar_jogo").click(function(){   
    $("#iniciar_jogo").show();
    $("#finalizar_jogo").hide();

    finalizar();
  });

})();

function updateTimer(){
    var tempo = parseInt($("#timer").html());
    $("#timer").html(++tempo);
}

function finalizar(){
  tentativas_erro = 0;
  $("#tentativas").html(tentativas_erro);
  clearInterval(tempo_total);

  card_virado = false;
  bloquear_tabuleiro = false;
  primeiro_card = null;
  segundo_card = null;

  $("#tabuleiro").hide();
  $("#timer").html(0);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function iniciar(){
  tempo_total = setInterval(updateTimer,1000);

  $("#tabuleiro").show();    
    imagens.sort(() => Math.random() - 0.5); //embaralhar
    
    card = "";
    //mostra cartas viradas
    imagens.forEach(element => {   
        card += "<div data-x='card-"+element.id+"' class='cards'>";
          card += "<div class='frente2'>";
          card += "<img src='"+element.img1+"'/>";
          card += "</div>";                    
        card += "</div>";        
    });
    $("#tabuleiro").html(card);
    
    sleep(3000).then(() => {    

      //mostra cartas desviradas apos 3 segundos
      card = "";
      imagens.forEach(element => {   
        card += "<div data-x='card-"+element.id+"' class='cards'>";
          card += "<div class='frente'>";
          card += "<img src='"+element.img1+"'/>";
          card += "</div>";                
          card += "<div class='tras'>";
          card += "<img src='"+element.img2+"'/>";
          card += "</div>";                
        card += "</div>";        
      });
      $("#tabuleiro").html(card);
      
      $(".cards").on("click", function(){
          if (bloquear_tabuleiro) return;
          if (this === primeiro_card) return;

          this.classList.add('flip');

          if (!card_virado) {
            card_virado = true;
            primeiro_card = this;
            return;
          }        
          segundo_card = this;
          card_virado = false;

          checar_pares();        
      })    
      
      function checar_pares() {
        if (primeiro_card.dataset.x === segundo_card.dataset.x) {
          bloquear_cards();
          return;
        }
        desvirar_cards();
      }
    
      function bloquear_cards() {    
        $(primeiro_card).off('click');
        $(segundo_card).off('click');
      }
        
      function desvirar_cards() {
        tentativas_erro++;
        $("#tentativas").html(tentativas_erro);

        bloquear_tabuleiro = true;

        setTimeout(() => {
          primeiro_card.classList.remove('flip');
          segundo_card.classList.remove('flip');
          bloquear_tabuleiro = false;
        }, 1500);
      }    
    })

}


//app.inicio();