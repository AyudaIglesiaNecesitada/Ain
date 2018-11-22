$(document).ready(function(){
    // Cargamos los estados
    var estados = "<option value='' disabled selected>Seleccionar</option>";


    provincias = JSON.stringify(provincias);

    provincias = JSON.parse(provincias);

    ciudades = JSON.stringify(ciudades);

    ciudades = JSON.parse(ciudades);

    // for (var key in ciudades) {
    //     if (ciudades.hasOwnProperty(key)) {
    //         estados = estados + "<option value='" + key + "'>" + key + "</option>";
    //     }
    // }

    provincias.forEach(element => {
        estados = estados + "<option value='" + element.id + "'>" + element.name + "</option>";
    })

    $('#provincia').html(estados);
    $('#provincia_organizacion').html(estados);

    // Al detectar
    $( "#provincia" ).change(function() {
        var html = "<option value='' disabled selected>Seleccionar</option>";
        $( "#provincia option:selected" ).each(function() {
            var estado = $(this).text();
            var value = $(this).val();
            if(estado != "Selecciona el estado"){
                // var ciudad_sel = ciudades[estado];
                // for (var i = 0; i < ciudad_sel.length; i++)
                //     html += "<option value='" + ciudad_sel[i].id + "'>" + ciudad_sel[i].ciudad + "</option>";
                 ciudades.forEach(element => {
                    if(element.state_id == value){
                       html += "<option value='" + element.id + "'>" + element.name + "</option>";
                    }
                    
                })
            }
        });
        $('#ciudad').html(html);
        $('select').formSelect();
    })

    // Al detectar
    $( "#provincia_organizacion" ).change(function() {
        var html = "<option value='' disabled selected>Seleccionar</option>";
        $( "#provincia_organizacion option:selected" ).each(function() {
            var estado = $(this).text();
            var value = $(this).val();
            if(estado != "Selecciona el estado"){
                // var ciudad_sel = ciudades[estado];
                // for (var i = 0; i < ciudad_sel.length; i++)
                //     html += "<option value='" + ciudad_sel[i].id + "'>" + ciudad_sel[i].ciudad + "</option>";
                 ciudades.forEach(element => {
                    if(element.state_id == value){
                       html += "<option value='" + element.id + "'>" + element.name + "</option>";
                    }
                    
                })
            }
        });
        $('#ciudad_organizacion').html(html);
        $('select').formSelect();
    })    

});