$(document).ready(function(){
  $('select').formSelect();
});

$(document).ready(function(){
  var id_rul =  $('.id_rul').text();
  var hola = 30056;
  if(hola == id_rul){
  }

});

//ACTIVAR ANIMACIÓN 75%

  // declare variable
  var scrollTop = $(".dato1");

  $(window).scroll(function() {
    // declare variable
    var topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 500) {
            $('.determinate').addClass('determinate2');
            $('.dato1').addClass('margen');

    } else {
      
    }

  }); // scroll END



  var elem = document.getElementById("dato1");
  if (elem !== null) {
    var dato1 = 10;
    var id = setInterval(frame1, 20);

    function frame1() {
      if (dato1 >= 75) {
        clearInterval(id);
      } else {
        dato1++;
        //elem.style.width = width + '%'; 
        elem.innerHTML = dato1 * 1 + '%';
      }
    }
  }


  var elem2 = document.getElementById("dato2");
  if (elem2 !== null) {
    var dato2 = 0;
    var id = setInterval(frame2, 20);

    function frame2() {
      if (dato2 >= 30) {
        clearInterval(id);
      } else {
        dato2++;
        //elem.style.width = width + '%'; 
        elem2.innerHTML = dato2 * 1 + '%';
      }
    }
  }


  ///FIN CARGA DE PORCENTAJE DE DESGRAVACION ANIMACION 



var objectData = new Object()
///CARGA DE PORCENTAJE DE DESGRAVACION ANIMACION 
$(document).ready(function () {
  //FUNCIONALIDAD CAMBIO ICONO ACORDION
  $(function () {
    $('.collapsible').on('click', function () {
      if ($('li').hasClass('active')) {
        $('li i.material-icons').text("add_circle_outline");
        $('li.active i.material-icons').text("remove_circle");

      } else {
        $('li i.material-icons').text("add_circle_outline");
      }

    });
  });


});



//////// ACORDION MATERIALIZE

$(document).ready(function () {
  $('.collapsible').collapsible();

});
//////// FIN ACORDION MATERIALIZE


//tipo de donativo
$(".tipo_donativos a").click(function (e) {
  objectData.tipo = $(this).text() == 'MENSUAL' ? 1 : 2;
  $(this).siblings().removeClass('activo');
  $(this).addClass('activo');
});

//ADD clase active cantidades a
$(".cantidades article").click(function () {
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  $('.header_tipo_ayuda').css("margin-top", "5%");
});
//ADD FIN clase active cantidades a


//ADD clase selected MODULO
var campana = 0
var nombreCampana = null;
var utm_campaign = null;
var utm_source = null;
var utm_medium = null;
var utm_content = null;
var utm_term = null;
var appeal = null;
var fund = null;
$(".content_tipo_ayuda article").click(function () {
  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
  campana = $(this).attr('id');
  nombreCampana = $('p',this).text();
  utm_campaign = $('.utm_campaign_mod', this).text();
  utm_source = $('.utm_source_mod', this).text();
  utm_medium = $('.utm_medium_mod', this).text();
  utm_content = $('.utm_content_mod', this).text();
  utm_term = $('.utm_term_mod',this).text();
  appeal = $('.appeal_mod',this).text();
  fund = $('.fund_mod',this).text();
  $('#utm_campaign').val(utm_campaign);
  $('#utm_source').val(utm_source);
  $('#utm_medium').val(utm_medium);
  $('#utm_content').val(utm_content);
  $('#utm_term').val(utm_term);
  $('#appeal').val(appeal);
  $('#fund').val(fund);
  

  console.log(nombreCampana)
  objectData.campana = campana
  objectData.nombreCampana = nombreCampana;
  console.log(objectData.campana);
  //AGREGAR ID AL DOM PARA CONSULTA DE UTMS

  //AGREGAR ID AL DOM PARA CONSULTA DE UTMS
  console.log(objectData.nombreCampana);
  $('#lista article').siblings().removeClass('list_selected');
  //AGREGAR CLASE A LA LISTA DESDE MODULO
  $('#lista article'+'#'+objectData.campana).addClass('list_selected');

  if ($('#lista article').hasClass('list_selected')) {
    $('#lista article i.material-icons').text("check_box_outline_blank");
    $('#lista article.list_selected i.material-icons').text("check_box");

  } else {
    $('#lista article.list_selected i.material-icons').text("check_box");
  }
});

$("#lista article").click(function () {
  $(this).siblings().removeClass('list_selected');
  $(this).addClass('list_selected');
  campana = $(this).attr('id');
  nombreCampana = $('p',this).text();
  utm_campaign = $('.utm_campaign_mod', this).text();
  utm_source = $('.utm_source_mod', this).text();
  utm_medium = $('.utm_medium_mod', this).text();
  utm_content = $('.utm_content_mod', this).text();
  utm_term = $('.utm_term_mod',this).text();
  appeal = $('.appeal_mod',this).text();
  fund = $('.fund_mod',this).text();
  $('#utm_campaign').val(utm_campaign);
  $('#utm_source').val(utm_source);
  $('#utm_medium').val(utm_medium);
  $('#utm_content').val(utm_content);
  $('#utm_term').val(utm_term);
  $('#appeal').val(appeal);
  $('#fund').val(fund);
  objectData.campana = campana
  objectData.nombreCampana = nombreCampana;
  console.log(objectData.campana);

  console.log(objectData.nombreCampana);
  $('.content_tipo_ayuda article').siblings().removeClass('selected');
  $('.content_tipo_ayuda article'+'#'+objectData.campana).addClass('selected');
});

//FIN ADD clase selected MODULO

//CANTIDADES

var btnOpt1 = document.getElementById('opt1');
if (btnOpt1 !== null) {
  $(btnOpt1).click(function (){
    var valor1 = $('#valor1').text();
    $('#input_cantidad').val(valor1);
    objectData.monto = valor1;
  });
}


var btnOpt2 = document.getElementById('opt2');
if (btnOpt2 !== null) {
  $(btnOpt2).click(function (){
    var valor2 = $('#valor2').text();
    $('#input_cantidad').val(valor2);
    objectData.monto = valor2;
  });
}


var btnOpt3 = document.getElementById('opt3');
if (btnOpt3 !== null) {
  $(btnOpt3).click(function (){
    var valor3 = $('#valor3').text();
    $('#input_cantidad').val(valor3);
    objectData.monto = valor3;
  });
}

// FIN CANTIDADES

//CAPTURAR VALORES CANTIDADES
$(document).ready(function(){
  valor1 = $('#valor1').text();
  valor2 = $('#valor2').text();
  valor3 = $('#valor3').text();
});

//INPUT CANTIDAD VALIDAR ACTIVE
var inputAmount = document.getElementById('input_cantidad');
$(inputAmount).keyup(function(){
  if ($('#input_cantidad').val() == valor1) {
    $('#opt1').addClass('active');
    $('.header_tipo_ayuda').css("margin-top", "5%");
  } else if ($('#input_cantidad').val() == valor2) {
    $('#opt2').addClass('active');
    $('.header_tipo_ayuda').css("margin-top", "5%");
  } else if ($('#input_cantidad').val() == valor3) {
    $('#opt3').addClass('active');
    $('.header_tipo_ayuda').css("margin-top", "5%");
  } else {
    $('#opt1').removeClass('active');
    $('#opt2').removeClass('active');
    $('#opt3').removeClass('active');
    $('.header_tipo_ayuda').css("margin-top", "0%");
  }

});

//MODULO SELECCIONADO
$(".header_tipo_ayuda span").click(function () {
  console.log("click")
  $(this).siblings().removeClass('mod_active');
  $(this).addClass('mod_active');

  if ($('#view_module').hasClass('mod_active')) {
    console.log('modulo');
    $('#modulo').show();
        //ALTO MODULOS
    var div_alto = $(".content_tipo_ayuda article").height();
    $('.content_tipo_ayuda').css("max-height", div_alto * 2 + 80); 

    $('#lista').hide();
  } else if ($('#view_list').hasClass('mod_active')) {
    console.log('Lista');
    $('#modulo').hide();
    $('#lista').show();
    //ALTO LISTA
     
    
       //ALTO img lista
  var img_list = $(".check_img_content .cnt_img img").height();
  //$('.check_img_content .cnt_img').css("height", img_list);
  //$('.check_img_content .cnt_check').css("height", img_list);
  //$('.info_content_list').css("height", img_list);
  
  var div_lista = $("#lista article").height();
    //$('#lista').css("max-height", div_lista * 6 + 80);

  
  
    
  } else {
    $('#lista').hide();
    $('#modulo').show();
  }
});
///FIN MODULO SELECCIONADO

//tamaños contenedores
$(document).ready(function () {
   if (window.matchMedia('(min-width: 968px)').matches) {
    var encabezado = $("#titulo_container").height();
    $('#imagen_content').css("height", encabezado * 3 + 160);
  }else{
    console.log('movil')
    var encabezado = $("#titulo_container").height();
    $('#imagen_content').css("height", encabezado * 1 + 300);
    $('#imagen_content').css("background-position-y", 0);
  }

});

//tamaños contenedores
function setSize() {
  
  //ALTO MODULOS VALIDA LA ALTURA DEL DIV
  var div_alto = $(".content_tipo_ayuda article").height();
  $('.content_tipo_ayuda').css("max-height", div_alto * 2 + 80);

  //ALTO img lista, VALIDA EL TAMAÑO DE LA IMAGEN Y OPERA
  var img_list = $(".check_img_content .cnt_img img").height();
  //$('.check_img_content .cnt_img').css("height", img_list);
  //$('.check_img_content .cnt_check').css("height", img_list);
  $('.info_content_list').css("height", img_list);

  //ALTO LISTA
  var div_lista = $("#lista article").height();
  //$('#lista').css("max-height", div_lista * 6 + 80);

  if ($('#view_module').hasClass('mod_active')) {
    $('#modulo').show();
    $('#lista').hide();
  } else if ($('#view_list').hasClass('mod_active')) {
    $('#lista').show();
    $('#modulo').hide();
  } else {
    $('#lista').hide();
    $('#modulo').show();
  }
}


///RESIZE PANTALLA
$(window).resize(function () {

  if ($('#view_module').hasClass('mod_active')) {
        //ALTO MOD
    var div_alto = $(".content_tipo_ayuda article").height();
    $('.content_tipo_ayuda').css("max-height", div_alto * 2 + 80);
  } else if ($('#view_list').hasClass('mod_active')) {
        //ALTO LISTA
    var div_lista = $("#lista article").height();
    //$('#lista').css("max-height", div_lista * 6 + 80);
  }


  //ALTO img lista
  var img_list = $(".check_img_content .cnt_img img").height();
  //$('.check_img_content .cnt_img').css("height", img_list);
  //$('.check_img_content .cnt_check').css("height", img_list);
  //$('.info_content_list').css("height", img_list);

   if (window.matchMedia('(min-width: 968px)').matches) {
    var encabezado = $("#titulo_container").height();
    $('#imagen_content').css("height", encabezado * 3 + 160);
  }else{
    var encabezado = $("#titulo_container").height();
    $('#imagen_content').css("height", encabezado * 1 + 300);
    $('#imagen_content').css("background-position-y", 0);
  }

});




//tamaños contenedores     

var id_list;
//ADD clase selected list
$("#lista article").click(function () {
  $(this).siblings().removeClass('list_selected');
  $(this).addClass('list_selected');
  campana = $(this).attr('id');
  objectData.campana = campana
});
//ADD FIN clase selected list




//CHECK LIST CAMPAÑAS AGREGAR ICONO O NO
$(function () {
  //CHECK LIST CAMPAÑAS
  $('#lista article').on('click', function () {
    if ($('#lista article').hasClass('list_selected')) {
      $('#lista article i.material-icons').text("check_box_outline_blank");
      $('#lista article.list_selected i.material-icons').text("check_box");

    } else {
      $('#lista article.list_selected i.material-icons').text("check_box");
    }

  });
});



//////////////////// FORMULARIO DATOS PERSONALES////////////////////

//validar check de crtificado de desgravación
$("#check_desgravacion").change(function () {
  if ($('#check_desgravacion').prop("checked")) {
    $('.donacion_anonima').removeClass('hide');
  } else {
    $('.donacion_anonima').addClass('hide');
    $('#check_donacion_anonima').prop('checked', false);
  }
});

//Al cargar dejar activo el pago de domiciliacion
$(document).ready(function () {
  $('#form_tarjeta_credito').hide();
  $('.domiciliacion span').addClass('active_pago');
  $('#domi_bancaria').prop('checked', true);
});


//verificar el check  de pago
$("#domi_bancaria").change(function () {
  if ($('#domi_bancaria').prop("checked")) {
    $('.domiciliacion span').addClass('active_pago');
    $('.tarjeta span').removeClass('active_pago');
    $('#form_domiciliacion').show();
    $('#form_tarjeta_credito').hide();
  }
});
//verificar el check de pago
$("#tarj_credito").change(function () {
  if ($('#tarj_credito').prop("checked")) {
    $('.domiciliacion span').removeClass('active_pago');
    $('.tarjeta span').addClass('active_pago');
    $('#form_tarjeta_credito').show();
    $('#iban').val('');
    $('#iban').removeClass('border-danger');
    $('#btn_continuar').removeAttr('disabled');
    $('#form_domiciliacion').hide();

  }
});


////////////////////VALIDACIONES/////////////////////////

//VALIDAR EL CLICK DE LOS BOTONES DEL TIPO DE DONATIVO
$(".tipo_donativos a").click(function () {
  if ($('.tipo_donativos a').hasClass("activo")) {
    $('.vali_tipo_donativo').addClass('hide');
    $('.tipo_donativos a').removeClass('border-danger');
  } else {
    $('.vali_tipo_donativo').removeClass('hide');
    $('.tipo_donativos a').addClass('border-danger');
  }
});


var donativo = 0

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
donativo = getUrlVars()["donativo"];

//VALIDAR EL CLICK DEL BOTON DE DONAR
$("#btn_donar").click(function (e) {
  let validationDonative = false;
  let validationAmount = false;
  if ($('.tipo_donativos a').hasClass("activo")) {
    $('.vali_tipo_donativo').addClass('hide');
    $('.tipo_donativos a').removeClass('border-danger');
    validationDonative = true;
  } else {
    $('.vali_tipo_donativo').removeClass('hide');
    $('.tipo_donativos a').addClass('border-danger');
    validationDonative = false;
  }

  if ($("#input_cantidad").val().trim() == "") {
    $('.vali_cantidad').removeClass('hide');
    $('#input_cantidad').addClass('border-danger');
    validationAmount = false;
  } else {
    $('.vali_cantidad').addClass('hide');
    $('#input_cantidad').removeClass('border-danger');
    validationAmount = true;
  }


//MOSTRAR SEGUN EL ID, verificar si llega un parametro por la url o no

if (document.location.href.indexOf('donativo') === -1){ 
  console.log('vacio');
  if (validationDonative && validationAmount) {
    $(".container-companas").slideDown()
    $(e.target).slideUp('fast')
    setTimeout(function(){ setSize() }, 500);
  }
}else{
  if (donativo != 0) {
    objectData.campana = donativo;
    objectData.nombreCampana = $('#titulo_container h4').text();
    if (validationDonative && validationAmount) {
      $(".container-principal").slideDown()
    }
  }else{
    if (validationDonative && validationAmount) {
    $(".container-companas").slideDown()
    $(e.target).slideUp('fast')
setTimeout(function(){ setSize() }, 500);
  }
  }
}

/*MOSTRAR SEGUN EL ID
  if (donativo != 0) {
    if (validationDonative && validationAmount) {
      $(".container-principal").slideDown()
      console.log(donativo);
    }
  }else{
    console.log('vacio');
    if (validationDonative && validationAmount) {
    $(".container-companas").slideDown()
    $(e.target).slideUp('fast')
    setTimeout(() => {
      setSize()
    }, 500);
  }
  }
*/
});

$("#input_cantidad").change(function () {
  if ($("#input_cantidad").val().trim() != "") {
    $('.vali_cantidad').addClass('hide');
    $('#input_cantidad').removeClass('border-danger');
  } else {
    $('.vali_cantidad').removeClass('hide');
    $('#input_cantidad').addClass('border-danger');
  }
});

//VALIDAR EL CLICK DE LOS BOTONES DEL TIPO DE DONATIVO
$(".cantidades article").click(function () {
  if ($('.cantidades article').hasClass("active")) {
    $('.vali_cantidad').addClass('hide');
    $('#input_cantidad').removeClass('border-danger');
  } else {
    $('.vali_cantidad').removeClass('hide');
    $('#input_cantidad').addClass('border-danger');
  }
});


    $(".icon_info").mouseover(function(){
        $(".info_tarjeta_hover").show();
    });
    $(".icon_info").mouseout(function(){
        $(".info_tarjeta_hover").hide();
    });




///solo numeros
$(document).ready(function () {
  //called when key is pressed in textbox
  $("[type=tel]").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
               return false;
    }
   });
});

$(document).ready(function(){
  $( ".content_tipo_ayuda article" ).each(function( index ) {
      if(this.attr("id")== 30056){
        alert("yessss");
      }
  });
});

