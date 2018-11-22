var testUrl = 'https://drmbackend1.localtunnel.me/';
var prodUrl = 'https://api4drmv1.ayudaalaiglesianecesitada.org/';
var UserAuth = 'drm_system@ayudaalaiglesianecesitada.org';
var UserPass = 'hXsQRame46';

var idClient = window.localStorage.getItem('clientID');
var idDonacion = window.localStorage.getItem('donationID');
var newClient = window.localStorage.getItem('newClient');
var renovalDate = window.localStorage.getItem('renovalDate');
$(document).ready(function(){
    $('.renovalDate').text(renovalDate);
    $.ajax({
        url: prodUrl+'donation_via_landing_page/authenticate',
        method: 'POST',
        data: {
            front: 'landing-page',
            user: UserAuth,
            password: UserPass
        },
        success: (data) => {
            console.log(data);
            if(data.data.auth_token) {
                var authToken = data.data.auth_token;
                $.ajax({
                    url: prodUrl+'donation_via_landing_page/get_client_and_donation_info',
                    method: 'POST',
                    headers: {"Authorization": authToken },
                    data: {
                        front: "landing-page",
                        client_id: idClient,
                        donation_id: idDonacion
                    },
                    success: (data2) => {
                        var info = data2.data;
                        console.log(info);
                        if(data2.codeError == false) {
                            $('.nombre_client').text(info.client.first_name);
                            $('.donation_amount').text(info.donation.amount+'€');
                            $('.campana_name').text(info.donation.campaign);
                            //Set In Session
                            sessionStorage.setItem('monto', info.donation.amount+'€');
                            sessionStorage.setItem('campaña', info.donation.campaign);
                            //individual
                            $('#nombre').val(info.client.first_name);
                            $('#apellido').val(info.client.last_name);
                            $('#email').val(info.client.emails.email);
                            $('#telefono').val(info.client.phones.number);
                            if(info.client.address != null) {
                                //individual
                                $('#pais').val(info.client.address.country_id);
                                $('#nombre_via').val(info.client.address.street_name);
                                $('#resto_via').val(info.client.address.street_rest);
                                $('#numero').val(info.client.address.number);
                                $('#piso').val(info.client.address.floor);
                                $('#letra').val(info.client.address.letter);
                                $('#cp').val(info.client.address.zip_code);
                                $('#tipo_via').val(info.client.address.street_type);
                                $('#provincia').val(info.client.address.state_id);
                                $('#ciudad').val(info.client.address.city_id);
                                //organizacion
                                $('#pais_organizacion').val(info.client.address.country_id);
                                $('#nombre_via_organizacion').val(info.client.address.street_name);
                                $('#resto_via_organizacion').val(info.client.address.street_rest);
                                $('#numero_organizacion').val(info.client.address.number);
                                $('#piso_organizacion').val(info.client.address.floor);
                                $('#letra_organizacion').val(info.client.address.letter);
                                $('#cp_organizacion').val(info.client.address.zip_code);
                                $('#tipo_via_organizacion').val(info.client.address.street_type);
                                $('#provincia_organizacion').val(info.client.address.state_id);
                                $('#ciudad_organizacion').val(info.client.address.city_id);
                            }
                            //organizacion
                            $('#nombre_persona_contacto').val(info.client.first_name+' '+info.client.last_name);
                            $('#email_organizacion').val(info.client.emails.email);
                            $('#telefono_organizacion').val(info.client.phones.number);
                            localStorage.clear();
                        }
                    },
                    error: (err) => {
                        $('.validacion-errors').removeClass('dnone');
                        console.error(err);
                    }
                });
            } else {
                $('.validacion-errors').removeClass('dnone');
                console.log(data);    
            }
        },
        error: (error) => {
            $('.validacion-errors').removeClass('dnone');
            console.log(error);
        }
    });
    $('select').formSelect();
     $('.collapsible').collapsible();

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

//Al cargar dejar activo individual
  $(document).ready(function(){
    $('#form_gracias_organizacion').hide();
    $('.individual span').addClass('active_pago');
    $('#gracias_individual').prop('checked', true);
  });

//verificar el check  de pago
$( "#gracias_individual" ).change(function() {
    if ($('#gracias_individual').prop("checked")) {
        $('.individual span').addClass('active_pago');
        $('.organizacion span').removeClass('active_pago');
        $('#form_gracias_individual').show();
        $('#form_gracias_organizacion').hide();
    }  });
//verificar el check de pago
$( "#gracias_organizacion" ).change(function() {
    if ($('#gracias_organizacion').prop("checked")) {
        $('.individual span').removeClass('active_pago');
        $('.organizacion span').addClass('active_pago');
        $('#form_gracias_organizacion').show();
        $('#form_gracias_individual').hide();

    }
  });   



    $( window ).resize(function() {
          //ALTO MODULOS
          if (window.matchMedia('(min-width: 1368px)').matches) {
              var encabezado = $("#titulo_container_gracias").height();
              $('#imagen_content_gracias').css("height",encabezado*2+90);            
          }else{
              var encabezado = $("#titulo_container_gracias").height();
              $('#imagen_content_gracias').css("height",encabezado*2+90); 
          }


});
//tamaños contenedores
       $(document).ready(function($){
          //ALTO MODULOS
          if (window.matchMedia('(min-width: 1368px)').matches) {
              var encabezado = $("#titulo_container_gracias").height();
              $('#imagen_content_gracias').css("height",encabezado*2+90);             
          }else{
              var encabezado = $("#titulo_container_gracias").height();
              $('#imagen_content_gracias').css("height",encabezado*2+90); 
          }
      });


       //VALIDAR EL CLICK DE LOS BOTONES DEL TIPO DE DONATIVO
$("#btn_enviar").click(function (e) {
    e.preventDefault();
    $('.validacion-errors').addClass('dnone');
    $(this).prop("disabled", true);
    operation = $("input[name=group3]:checked").val()


    if (operation == 1) {
       var nombre = $("#nombre").val().trim()
       var apellido = $("#apellido").val().trim()
       var email = $("#email").val().trim()
       var telefono = $("#telefono").val().trim()
       var pais = $("#pais").val().trim()
       var tipovia = $("#tipo_via").val()
       var nombrevia = $("#nombre_via").val().trim()
       var numero = $("#numero").val().trim()
       var piso = $("#piso").val().trim()
       var letra = $("#letra").val().trim()
       var cp = $("#cp").val().trim()
       var provincia = $("#provincia").val()
       var ciudad = $("#ciudad").val()
        var rest = $('#resto_via').val()
       $('#nombre_persona_contacto,#email_organizacion,#telefono_organizacion').removeClass('border-success');
       $('.vali_politicas_organizacion').addClass('hide');


       if (pais == "España") {
          // console.log(nombre,apellido,email,telefono)
               //console.log('España');
             if(nombre != "" && apellido != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) && telefono != ""){
                $('.vali_politicas_individual').addClass('hide');
                $('#btn_enviar').attr('disabled', 'disabled');
                $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                $('#loading-i').addClass('spin-loader')
                var objectDataUpdate = {
                    "front": "landing-page",
                    "client_id": idClient,
                    "person_type": "Individual",
                    "business_name": "",
                    "name": nombre,
                    "surname": apellido,
                    "email": email,
                    "phone": telefono,
                    "address": `${tipovia} ${nombrevia} ${numero}, ${piso}, ${letra}, ${cp}, ${provincia}, ${rest}`,
                    "street_type": tipovia,
                    "street_name": nombrevia,
                    "street_rest": rest,
                    "number": numero,
                    "floor": piso,
                    "apt_number": letra,
                    "zip_code": cp,
                    "city_id": ciudad
                };
                $.ajax({
                    url: prodUrl+'donation_via_landing_page/authenticate',
                    method: 'POST',
                    data: {
                        front: 'landing-page',
                        user: UserAuth,
                        password: UserPass
                    },
                    success: (data) => {
                        console.log(data);
                        if(data.data.auth_token) {
                            var authToken = data.data.auth_token;
                            updateDataCliente(objectDataUpdate, authToken);
                        } else {
                            console.log(data);
                            $('.validacion-errors').removeClass('dnone');
                        }
                    },
                    error: (error) => {
                        $('#btn_enviar').removeAttr('disabled');
                        $('#loading-i').remove();
                        $('.validacion-errors').removeClass('dnone');
                        console.log(error);
                    }
                });
             }else{
                  if ($('#nombre').val() == '') {
                      $('#nombre').addClass('border-danger');
                      $('#nombre').removeClass('border-success');
                      $('.vali_nombre').removeClass('hide');

                  } else {
                      $('#nombre').removeClass('border-danger');
                      $('#nombre').addClass('border-success');
                      $('.vali_nombre').addClass('hide');
                      console.log("lleno")
                  }
                  if ($('#apellido').val() == '') {
                      $('#apellido').addClass('border-danger');
                      $('#apellido').removeClass('border-success');
                      $('.vali_apellido').removeClass('hide');
                  } else {
                      $('#apellido').removeClass('border-danger');
                      $('#apellido').addClass('border-success');
                      $('.vali_apellido').addClass('hide');
                  }
                  if ($('#email').val() == '') {
                      $('#email').addClass('border-danger');
                      $('#email').removeClass('border-success');
                      $('.vali_email').removeClass('hide');
                  } else {
                      if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test($('#email').val())) {
                          $('#email').removeClass('border-danger');
                          $('.vali_email').addClass('hide');
                          $('#email').removeClass('border-danger');
                          $('#email').addClass('border-success');
                      } else {
                          $('#email').removeClass('border-success');
                          $('#email').addClass('border-danger');
                          $('.vali_email').removeClass('hide');
                      }
                  }            
                  if ($('#telefono').val() == '') {
                      $('#telefono').addClass('border-danger');
                      $('.vali_telefono').removeClass('hide');
                  } else {
                      $('#telefono').removeClass('border-danger');
                      $('#telefono').addClass('border-success');
                      $('.vali_telefono').addClass('hide');
                  }                               
                  // if ($('#vali_politicas_individual').prop("checked")) {
                  //     $('.vali_politicas_individual').addClass('hide');
                  // } else {
                  //     $('.vali_politicas_individual').removeClass('hide');
                  // }        
             }         
       }else{
               console.log('No España');
             if(nombre != "" && apellido != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) && telefono != ""){
                $('.vali_politicas_individual').addClass('hide');
                $('#btn_enviar').attr('disabled', 'disabled');
                $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                $('#loading-i').addClass('spin-loader')
                var objectDataUpdate = {
                    "front": "landing-page",
                    "client_id": idClient,
                    "person_type": "Individual",
                    "business_name": "",
                    "name": nombre,
                    "surname": apellido,
                    "email": email,
                    "phone": telefono,
                    "address": `${tipovia} ${nombrevia} ${numero}, ${piso}, ${letra}, ${cp}, ${provincia}, ${rest}`,
                    "street_type": tipovia,
                    "street_name": nombrevia,
                    "street_rest": rest,
                    "number": numero,
                    "floor": piso,
                    "apt_number": letra,
                    "zip_code": cp,
                    "city_id": ciudad
                };
                $.ajax({
                    url: prodUrl+'donation_via_landing_page/authenticate',
                    method: 'POST',
                    data: {
                        front: 'landing-page',
                        user: UserAuth,
                        password: UserPass
                    },
                    success: (data) => {
                        console.log(data);
                        if(data.data.auth_token) {
                            var authToken = data.data.auth_token;
                            updateDataCliente(objectDataUpdate, authToken);
                        } else {
                            $('.validacion-errors').removeClass('dnone');
                            console.log(data);
                        }
                    },
                    error: (error) => {
                        $('#btn_enviar').removeAttr('disabled');
                        $('#loading-i').remove();
                        $('.validacion-errors').removeClass('dnone');
                        console.log(error);
                    }
                });
             }else{
                  if ($('#nombre').val() == '') {
                      $('#nombre').addClass('border-danger');
                      $('#nombre').removeClass('border-success');
                      $('.vali_nombre').removeClass('hide');
                  } else {
                      $('#nombre').removeClass('border-danger');
                      $('#nombre').addClass('border-success');
                      $('.vali_nombre').addClass('hide');
                  }
                  if ($('#apellido').val() == '') {
                      $('#apellido').addClass('border-danger');
                      $('#apellido').removeClass('border-success');
                      $('.vali_apellido').removeClass('hide');
                  } else {
                      $('#apellido').removeClass('border-danger');
                      $('#apellido').addClass('border-success');
                      $('.vali_apellido').addClass('hide');
                  }
                  if ($('#email').val() == '') {
                      $('#email').addClass('border-danger');
                      $('#email').removeClass('border-success');
                      $('.vali_email').removeClass('hide');
                  } else {
                      if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test($('#email').val())) {
                          $('#email').removeClass('border-danger');
                          $('.vali_email').addClass('hide');
                          $('#email').removeClass('border-danger');
                          $('#email').addClass('border-success');
                      } else {
                          $('#email').removeClass('border-success');
                          $('#email').addClass('border-danger');
                          $('.vali_email').removeClass('hide');
                      }
                  }            
                  if ($('#telefono').val() == '') {
                      $('#telefono').addClass('border-danger');
                      $('.vali_telefono').removeClass('hide');
                  } else {
                      $('#telefono').removeClass('border-danger');
                      $('#telefono').addClass('border-success');
                      $('.vali_telefono').addClass('hide');
                  }                               
                  // if ($('#vali_politicas_individual').prop("checked")) {
                  //     $('.vali_politicas_individual').addClass('hide');
                  // } else {
                  //     $('.vali_politicas_individual').removeClass('hide');
                  // }        
             }          

       }

    }else if (operation == 2) {
       var nombre_empresa = $("#nombre_empresa").val().trim()
       var nombre_persona_contacto = $("#nombre_persona_contacto").val().trim()
       var email_organizacion = $("#email_organizacion").val().trim()
       var telefono_organizacion = $("#telefono_organizacion").val().trim()
       var pais_organizacion = $("#pais_organizacion").val().trim()
       var tipo_via_organizacion = $("#tipo_via_organizacion").val()
       var nombre_via_organizacion = $("#nombre_via_organizacion").val().trim()
       var numero_organizacion = $("#numero_organizacion").val().trim()
       var piso_organizacion = $("#piso_organizacion").val().trim()
       var letra_organizacion = $("#letra_organizacion").val().trim()
       var cp_organizacion = $("#cp_organizacion").val().trim()
       var provincia_organizacion = $("#provincia_organizacion").val()
       var ciudad_organizacion = $("#ciudad_organizacion").val()
       var res_organizacion = $('#resto_via_organizacion').val()

       $('#nombre,#apellido,#email,#telefono').removeClass('border-success');
       $('.vali_politicas_individual').addClass('hide');

       if (pais_organizacion == "España") {
          //console.log(pais_organizacion, nombre_persona_contacto,email_organizacion,telefono_organizacion)
             if(nombre_persona_contacto != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email_organizacion) && telefono_organizacion != ""){
                $('.vali_politicas_individual').addClass('hide');
                $('#btn_enviar').attr('disabled', 'disabled');
                $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                $('#loading-i').addClass('spin-loader')
                var objectDataUpdateOrg = {
                    "front": "landing-page",
                    "client_id": idClient,
                    "person_type": "Organización",
                    "business_name": nombre_empresa,
                    "name": nombre_persona_contacto,
                    "surname": "",
                    "email": email_organizacion,
                    "phone": telefono_organizacion,
                    "address": `${tipo_via_organizacion} ${nombre_via_organizacion} ${numero_organizacion}, ${piso_organizacion}, ${letra_organizacion}, ${cp_organizacion}, ${provincia_organizacion}, ${res_organizacion}`,
                    "street_type": tipo_via_organizacion,
                    "street_name": nombre_via_organizacion,
                    "street_rest": res_organizacion,
                    "number": numero_organizacion,
                    "floor": piso_organizacion,
                    "apt_number": letra_organizacion,
                    "zip_code": cp_organizacion,
                    "city_id": ciudad_organizacion
                };
                $.ajax({
                    url: prodUrl+'donation_via_landing_page/authenticate',
                    method: 'POST',
                    data: {
                        front: 'landing-page',
                        user: UserAuth,
                        password: UserPass
                    },
                    success: (data) => {
                        console.log(data);
                        if(data.data.auth_token) {
                            var authToken = data.data.auth_token;
                            updateDataCliente(objectDataUpdateOrg, authToken);
                        } else {
                            console.log(data);
                            $('.validacion-errors').removeClass('dnone');
                        }
                    },
                    error: (error) => {
                        $('#btn_enviar').removeAttr('disabled');
                        $('#loading-i').remove();
                        $('.validacion-errors').removeClass('dnone');
                        console.log(error);
                    }
                });
             }else{
                  if ($('#nombre_persona_contacto').val() == '') {
                      $('#nombre_persona_contacto').addClass('border-danger');
                      $('#nombre_persona_contacto').removeClass('border-success');
                      $('.vali_persona_contacto').removeClass('hide');
                  } else {
                      $('#nombre_persona_contacto').removeClass('border-danger');
                      $('#nombre_persona_contacto').addClass('border-success');
                      $('.vali_persona_contacto').addClass('hide');
                  }
                  if ($('#email_organizacion').val() == '') {
                      $('#email_organizacion').addClass('border-danger');
                      $('#email_organizacion').removeClass('border-success');
                      $('.vali_email_organizacion').removeClass('hide');
                  } else {
                      if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test($('#email_organizacion').val())) {
                          $('#email_organizacion').removeClass('border-danger');
                          $('.vali_email_organizacion').addClass('hide');
                          $('#email_organizacion').removeClass('border-danger');
                          $('#email_organizacion').addClass('border-success');
                      } else {
                          $('#email_organizacion').removeClass('border-success');
                          $('#email_organizacion').addClass('border-danger');
                          $('.vali_email_organizacion').removeClass('hide');
                      }
                  } 
                  if ($('#telefono_organizacion').val() == '') {
                      $('#telefono_organizacion').addClass('border-danger');
                      $('#telefono_organizacion').removeClass('border-success');
                      $('.vali_telefono_organizacion').removeClass('hide');
                  } else {
                      $('#telefono_organizacion').removeClass('border-danger');
                      $('#telefono_organizacion').addClass('border-success');
                      $('.vali_telefono_organizacion').addClass('hide');
                  }                               
                  // if ($('#vali_politicas_individual').prop("checked")) {
                  //     $('.vali_politicas_organizacion').addClass('hide');
                  // } else {
                  //     $('.vali_politicas_organizacion').removeClass('hide');
                  // }        
             }          
       }else{
         //console.log('España no organizacion')
               if(nombre_persona_contacto != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email_organizacion) && telefono_organizacion != ""){
                    $('.vali_politicas_organizacion').addClass('hide');
                    $('#btn_enviar').attr('disabled', 'disabled');
                    $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                    $('#loading-i').addClass('spin-loader')
                    var objectDataUpdateOrg = {
                        "front": "landing-page",
                        "client_id": idClient,
                        "person_type": "Organización",
                        "business_name": nombre_empresa,
                        "name": nombre_persona_contacto,
                        "surname": "",
                        "email": email_organizacion,
                        "phone": telefono_organizacion,
                        "address": `${tipo_via_organizacion} ${nombre_via_organizacion} ${numero_organizacion}, ${piso_organizacion}, ${letra_organizacion}, ${cp_organizacion}, ${provincia_organizacion}, ${res_organizacion}`,
                        "street_type": tipo_via_organizacion,
                        "street_name": nombre_via_organizacion,
                        "street_rest": res_organizacion,
                        "number": numero_organizacion,
                        "floor": piso_organizacion,
                        "apt_number": letra_organizacion,
                        "zip_code": cp_organizacion,
                        "city_id": ciudad_organizacion
                    };
                    $.ajax({
                        url: prodUrl+'donation_via_landing_page/authenticate',
                        method: 'POST',
                        data: {
                            front: 'landing-page',
                            user: UserAuth,
                            password: UserPass
                        },
                        success: (data) => {
                            console.log(data);
                            if(data.data.auth_token) {
                                var authToken = data.data.auth_token;
                                updateDataCliente(objectDataUpdateOrg, authToken);
                            } else {
                                console.log(data);
                                $('.validacion-errors').removeClass('dnone');
                            }
                        },
                        error: (error) => {
                            $('#btn_enviar').removeAttr('disabled');
                            $('#loading-i').remove();
                            $('.validacion-errors').removeClass('dnone');
                            console.log(error);
                        }
                    });
               }else{
                    if ($('#nombre_persona_contacto').val() == '') {
                        $('#nombre_persona_contacto').addClass('border-danger');
                        $('#nombre_persona_contacto').removeClass('border-success');
                        $('.vali_persona_contacto').removeClass('hide');
                    } else {
                        $('#nombre_persona_contacto').removeClass('border-danger');
                        $('#nombre_persona_contacto').addClass('border-success');
                        $('.vali_persona_contacto').addClass('hide');
                    }
                    if ($('#email_organizacion').val() == '') {
                        $('#email_organizacion').addClass('border-danger');
                        $('#email_organizacion').removeClass('border-success');
                        $('.vali_email_organizacion').removeClass('hide');
                    } else {
                        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test($('#email_organizacion').val())) {
                            $('#email_organizacion').removeClass('border-danger');
                            $('.vali_email_organizacion').addClass('hide');
                            $('#email_organizacion').removeClass('border-danger');
                            $('#email_organizacion').addClass('border-success');
                        } else {
                            $('#email_organizacion').removeClass('border-success');
                            $('#email_organizacion').addClass('border-danger');
                            $('.vali_email_organizacion').removeClass('hide');
                        }
                    } 
                    if ($('#telefono_organizacion').val() == '') {
                        $('#telefono_organizacion').addClass('border-danger');
                        $('#telefono_organizacion').removeClass('border-success');
                        $('.vali_telefono_organizacion').removeClass('hide');
                    } else {
                        $('#telefono_organizacion').removeClass('border-danger');
                        $('#telefono_organizacion').addClass('border-success');
                        $('.vali_telefono_organizacion').addClass('hide');
                    }                               
                    // if ($('#vali_politicas_individual').prop("checked")) {
                    //     $('.vali_politicas_organizacion').addClass('hide');
                    // } else {
                    //     $('.vali_politicas_organizacion').removeClass('hide');
                    // }        
               }
       }

    }

});


function updateDataCliente(dataLead, authToken) {
    $.ajax({
        url: prodUrl+'donation_via_landing_page/update_client',
        method: 'PUT',
        data: dataLead,
        headers: { "Authorization": authToken },
        success: (data) => {
            console.log(data);
            if(data.codeError == false) {
                window.dataLayer.push({
                    'event': 'basics'
                });
                //Set In Session
                sessionStorage.setItem('lead', dataLead.name);
                var cid = sessionStorage.getItem('cid');
                window.setTimeout(() => {
                    window.location.href = '/donar/gracias.php?cid='+cid
                }, 3000);
            } else {
                $('.validacion-errors').removeClass('dnone');
            }
        },
        error: (err) => {
            $('#btn_enviar').removeAttr('disabled');
            $('#loading-i').remove();
            $('.validacion-errors').removeClass('dnone');
            console.log(err);
        }
    });
}

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