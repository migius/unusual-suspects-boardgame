var righe = 5;
var colonne = 3;
var idObiettivo = 0;
var obiettivoMostrato = false;

///ritorna un array di numeri random.
///numero: numero di random array
///max: massimo dell'array (il minimo è sempre 0)
GeneraNumeriRandom = function(numero, max)
{
  "use strict";
  if(numero >= max) 
  {
     alert("Massimo " + max + " foto");
     return ;
  }
  var NumeriRandom = [];
  while(NumeriRandom.length < numero){
    var randomnumber = Math.floor(Math.random()*max);
    if(NumeriRandom.indexOf(randomnumber) > -1) continue;
    NumeriRandom[NumeriRandom.length] = randomnumber;
  }
  console.log(NumeriRandom);
  return NumeriRandom;
}

GeneraUrlFoto_randomuser = function(NumeriRandom)
{
  "use strict";
  var UrlRandom = [];
  $.each(NumeriRandom, function( index, value ) { 
    var num = value;
    var genere = "men";
    if(num > 99 )
    {
      genere = "women";
      num = num-100;
    }
    UrlRandom.push("https://randomuser.me/api/portraits/" + genere + "/" +  num + ".jpg");
  });
  console.log(UrlRandom);
  return UrlRandom;
}

CaricaFoto = function(UrlRandom)
{
  "use strict";
  $.each(UrlRandom, function( index, value ) { 
    var item;
    item= document.createElement("div");
    item.id = "sospetto_" + (index+1);
    item.style.cssText = "display: inline-block"
    item.classList.add("col-md-" + Math.floor(12/colonne) );
    var img = document.createElement("img");    
    img.src = value;
    
    item.appendChild(img);
    document.getElementById("griglia").appendChild(item);
  });
}

mostraObiettivo = function()
{
  "use strict";
  if(!obiettivoMostrato)
  {
    if(confirm("Attenzione! Premendo Ok sarà mostrato l'obiettivo!"))
    {
      $("#sospetto_" + idObiettivo).toggleClass('obiettivo');
      $("#mostraObiettivo").text( "Nascondi obiettivo");
      obiettivoMostrato = !obiettivoMostrato;
    }
  }
  else
  {
      $("#sospetto_" + idObiettivo).toggleClass('obiettivo');
      $("#mostraObiettivo").text("Mostra obiettivo");
      obiettivoMostrato = !obiettivoMostrato;
  }
  
}

$(document).ready(function(){
  console.log("start");
  var numeri = GeneraNumeriRandom(righe*colonne, 200);
  var url = GeneraUrlFoto_randomuser(numeri);
  CaricaFoto(url);
  idObiettivo = GeneraNumeriRandom(1, righe*colonne)[0];
  console.log(idObiettivo);
  console.log("end"); 
})


