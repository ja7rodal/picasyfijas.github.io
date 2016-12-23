
var context = {numero: "", fijas: "", picas:""};

function randonfp(){
  var n = _.sampleSize(_.shuffle(_.range(10)),4);
  //console.log(n);
  return n;
}

function validarfp(test,n){
  // validar
  var r= test.trim();
  var en = /^(?:([0-9])(?!.*\1)){4}$/.test(r);
  if (en){
    $("#mensaje").removeClass( "rojo" );
    r = r.split("");
    //console.log(r);
    r = _.map(r,function(i){return parseInt(i)} );
    var juego = fijas(n,r);
    return juego[0];
  }else{
    $("#mensaje").addClass("rojo");
  }
}



function fijas (n1, n2){
  var nv = n2.join("");;
  var fijas =[0,0];
  for (var i=0; i < n1.length; i++){
    if (n1[i] == n2[i]){
      n2.splice(i, 1, 'f');
      fijas[0]++;
    }
  }
  fijas[1]= _.intersection(n1,n2).length;
  //console.log("fijas: "+fijas[0] +" - picas: " + fijas[1]);
  $('tbody').append("<tr><td>"+nv+"</td><td>"+fijas[0]+"</td><td>"+fijas[1]+"</td></tr>");
  return fijas;
  //return
}
/*var juego = fijas(n,r);
console.log("fijas, picas: " + juego);
*/

$( document ).ready(function() {


  $("#numero").submit(function( event ) {
    event.preventDefault();
    var test = $(".test").val();
    var win = validarfp(test,n);
    $(".test").val("");
    $('table').removeClass('hides');
    if (win != 4){
      //alert("win: " + win);
      }else {
      //alert("win: " + win + "Ganador");
      $('#test').hide();
      $('#jugar').text('Jugar de  Nuevo!!');
      $('#jugar').removeClass('button-warning').addClass("button-secondary").removeClass("button-success");
      $('.ganador').removeClass('hides');
      $('#mensaje').hide();
      win = 0;
    }
  });

  $('#jugar').on('click',function(){
    //$('.antes').hide();
    $('tbody').find('tr').remove();
    $('.juego').removeClass("hides");
    $('.new').addClass("hides");
    $('table').addClass('hides');
    n =  randonfp();
    var win = 0;
    $('#mensaje').text("Debes ingresar cuatro (4) números diferentes y luego oprimir Enter").removeClass('winner');
    $(this).text('Reiniciar!!');
    $(this).removeClass('button-warning').removeClass("button-secondary").addClass("button-success");
    $('#test').show();
    });

});
