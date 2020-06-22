var righe = 4;
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
        UrlRandom.push("https://randomuser.me/api/portraits/" + genere + "/" +    num + ".jpg");
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
        item.classList.add("col-" + Math.floor(12/colonne) );
        item.classList.add("sospetto-div" );
        var img = document.createElement("img");        
        img.src = value;
        img.classList.add("sospetto-img" );
        
        item.appendChild(img);
        document.getElementById("griglia").appendChild(item);
    });
}

mostraObiettivo = function()
{
    "use strict";
    if(!obiettivoMostrato)
    {
        if(confirm(s["SHOW_GUILTY_DIALOG"]))
        {
            $("img.sospetto-img.guilty").toggleClass('obiettivo');
            $("img.sospetto-img:not(.guilty)").toggleClass('no-obiettivo');
            $("#mostraObiettivo").text(s["HIDE_GUILTY"]);
            obiettivoMostrato = !obiettivoMostrato;
        }
    }
    else
    {
            $("img.sospetto-img.guilty").toggleClass('obiettivo');
            $("img.sospetto-img:not(.guilty)").toggleClass('no-obiettivo');
            $("#mostraObiettivo").text(s["SHOW_GUILTY"]);
            obiettivoMostrato = !obiettivoMostrato;
    }
    
}

$(document).ready(function(){
    console.log("start");
    var numeri = GeneraNumeriRandom(righe*colonne, 200);
    var url = GeneraUrlFoto_randomuser(numeri);
    CaricaFoto(url);
    idObiettivo = GeneraNumeriRandom(1, righe*colonne)[0];
    $("#sospetto_" + idObiettivo + " img").addClass('guilty');
    $("#mostraObiettivo").text(s["SHOW_GUILTY"]);
    console.log(idObiettivo);
    console.log("end"); 
})


