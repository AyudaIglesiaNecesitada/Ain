$(document).ready(function(){
    // Cargamos los paises del archivo paises.js
    var pais = 0;

    for (i=1; i <= Paises.length; i++) {
               pais += "<option value='" + i + "'>" + Paises[i] + "</option>";
    }    

    //ESPAÑA POR DEFECTO
    $('#pais').html(pais);
    $('#pais_organizacion').html(pais);
    var España = 60;
    $('#pais').find('option[value='+España+']').attr('selected',true);
    $('#pais_organizacion').find('option[value='+España+']').attr('selected',true);   
});

//OCULTAR CONTENIDO O MOSTRAR SI ES ESPAÑA O NO
$("#pais").on('change', function() {
    if ($(this).val() != 60){
        $('.data_hide').hide();
    } else {
        $('.data_hide').show();
    }
});
//OCULTAR CONTENIDO O MOSTRAR SI ES ESPAÑA O NO
$("#pais_organizacion").on('change', function() {
    if ($(this).val() != 60){
        $('.data_hide_organizacion').hide();
    } else {
        $('.data_hide_organizacion').show();
    }
});




