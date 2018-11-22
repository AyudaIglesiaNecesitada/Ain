var testUrl = 'https://drmbackend1.localtunnel.me/';
var prodUrl = 'https://api4drmv1.ayudaalaiglesianecesitada.org/';
var UserAuth = 'drm_system@ayudaalaiglesianecesitada.org';
var UserPass = 'hXsQRame46';

$(document).ready(function(){
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



//Al cargar dejar activo el pago de domiciliacion
  $(document).ready(function(){
    $('#form_desgravacion_organizacion').hide();
    $('.individual span').addClass('active_pago');
    $('#desgra_individual').prop('checked', true);
    var tipo = localStorage.getItem('tipo');
    if(tipo == 1) {
        $('.renoval').show();
    } else if(tipo == 2) {
        $('.renoval').hide();
    }
  });


//verificar el check  de pago
$( "#desgra_individual" ).change(function() {
    if ($('#desgra_individual').prop("checked")) {
        $('.individual span').addClass('active_pago');
        $('.organizacion span').removeClass('active_pago');
        $('#form_desgravacion_individual').show();
        $('#form_desgravacion_organizacion').hide();
    }  });
//verificar el check de pago
$( "#desgra_organizacion" ).change(function() {
    if ($('#desgra_organizacion').prop("checked")) {
        $('.individual span').removeClass('active_pago');
        $('.organizacion span').addClass('active_pago');
        $('#form_desgravacion_organizacion').show();
        $('#form_desgravacion_individual').hide();

    }
  });       



/////VALIDACIÓN//////////////

var tokenId = ""
var operation = 0
var idClient = window.localStorage.getItem('clientID');
var idDonacion = window.localStorage.getItem('donationID');
var newClient = window.localStorage.getItem('newClient');
var renovalDate = window.localStorage.getItem('renovalDate');
if(newClient) {
    $('#client_exist').hide();
} else {
    $('#client_exist').show();
}
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
                            $('.nombre_donante').text(info.client.first_name);
                            $('#monto_donacion').text(info.donation.amount+'€');
                            $('#nombre_campaña').text(info.donation.campaign);
                            //Set In Session
                            sessionStorage.setItem('campaña', info.donation.campaign);
                            sessionStorage.setItem('monto', info.donation.amount+'€');
                            //individual
                            $('#nif').val(info.client.identification != null ? info.client.identification : "");
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
                                $('#nombre_via_empresa').val(info.client.address.street_name);
                                $('#resto_via_empresa').val(info.client.address.street_rest);
                                $('#numero_empresa').val(info.client.address.number);
                                $('#piso_empresa').val(info.client.address.floor);
                                $('#letra_empresa').val(info.client.address.letter);
                                $('#cp_empresa').val(info.client.address.zip_code);
                                $('#tipo_via_empresa').val(info.client.address.street_type);
                                $('#provincia_organizacion').val(info.client.address.state_id);
                                $('#ciudad_organizacion').val(info.client.address.city_id);
                            }
                            //organizacion
                            $('#cif').val(info.client.identification != null ? info.client.identification : "");
                            $('#nombre_per_contacto').val(info.client.first_name+' '+info.client.last_name);
                            $('#email_empresa').val(info.client.emails.email);
                            $('#telefono_empresa').val(info.client.phones.number);
                            localStorage.clear();
                        } else {
                            console.log(data2);
                            $('.validacion-errors').removeClass('dnone');
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
    })
    if ($('#modificar_datos_individual').prop("checked")) {
      $('#nombre,#apellido,#email,#telefono,#pais,#nombre_via,#resto_via,#numero,#piso,#letra,#cp,#tipo_via,#provincia,#ciudad').removeClass('input_disabled');
    }else{
      $('#nombre,#apellido,#email,#telefono,#pais,#nombre_via,#resto_via,#numero,#piso,#letra,#cp,#tipo_via,#provincia,#ciudad').addClass('input_disabled');
    }
  });

      ////MOFICICAR DATOS INDIVIDUAL
      $("#modificar_datos_individual").change(function () {
      if ($('#modificar_datos_individual').prop("checked")) {
          $('#nombre,#apellido,#email,#telefono,#pais,#nombre_via,#resto_via,#numero,#piso,#letra,#cp,#tipo_via,#provincia,#ciudad').prop("disabled",false);
          $('#nombre,#apellido,#email,#telefono,#pais,#nombre_via,#resto_via,#numero,#piso,#letra,#cp,#tipo_via,#provincia,#ciudad').removeClass('input_disabled');

      }else{
        $('#nombre,#apellido,#email,#telefono,#pais,#nombre_via,#resto_via,#numero,#piso,#letra,#cp,#tipo_via,#provincia,#ciudad').prop("disabled",true);
        $('#nombre,#apellido,#email,#telefono,#pais,#nombre_via,#resto_via,#numero,#piso,#letra,#cp,#tipo_via,#provincia,#ciudad').addClass('input_disabled');
      }

      }); 


  $(document).ready(function(){
          if ($('#modificar_datos_individual').prop("checked")) {
          $('#nombre_per_contacto,#email_empresa,#telefono_empresa').removeClass('input_disabled');

      }else{
        $('#nombre_per_contacto,#email_empresa,#telefono_empresa').addClass('input_disabled');
      }
  });
      ////MOFICICAR DATOS ORGANIZACION
      $("#modificar_datos_organizacion").change(function () {
      if ($('#modificar_datos_organizacion').prop("checked")) {
          $('#nombre_per_contacto,#email_empresa,#telefono_empresa,#pais_organizacion,#nombre_via_empresa,#resto_via_empresa,#numero_empresa,#piso_empresa,#letra_empresa,#cp_empresa,#tipo_via_empresa,#provincia_organizacion,#ciudad_organizacion').prop("disabled",false);
          $('#nombre_per_contacto,#email_empresa,#telefono_empresa,#pais_organizacion,#nombre_via_empresa,#resto_via_empresa,#numero_empresa,#piso_empresa,#letra_empresa,#cp_empresa,#tipo_via_empresa,#provincia_organizacion,#ciudad_organizacion').removeClass('input_disabled');
      }else{
        $('#nombre_per_contacto,#email_empresa,#telefono_empresa,#pais_organizacion,#nombre_via_empresa,#resto_via_empresa,#numero_empresa,#piso_empresa,#letra_empresa,#cp_empresa,#tipo_via_empresa,#provincia_organizacion,#ciudad_organizacion').prop("disabled",true);
        $('#nombre_per_contacto,#email_empresa,#telefono_empresa,#pais_organizacion,#nombre_via_empresa,#resto_via_empresa,#numero_empresa,#piso_empresa,#letra_empresa,#cp_empresa,#tipo_via_empresa,#provincia_organizacion,#ciudad_organizacion').addClass('input_disabled');
      }
      });      


$("#btn_enviar").click(function (e) {
    e.preventDefault();
    $('.validacion-errors').addClass('dnone');
    $(this).prop("disabled", true);
    operation = $("input[name=tipo]:checked").val()
    // datos comunes
    if (operation == 1) {
     
       var nif = $("#nif").val().trim()
       var nombre = $("#nombre").val().trim()
       var apellido = $("#apellido").val().trim()
       var email = $("#email").val().trim()
       var telefono = $("#telefono").val().trim()
       var pais = $("#pais").val()
       var tipovia = $("#tipo_via").val()
       var nombre_via = $("#nombre_via").val().trim()
       var numero = $("#numero").val().trim()
       var piso = $("#piso").val().trim()
       var letra = $("#letra").val().trim()
       var rest = $('#resto_via').val().trim()
       var cp = $("#cp").val().trim()
       var provincia = $("#provincia").val()
       var ciudad = $("#ciudad").val()
       var birth_date = $('#birth_date').val()
       
       var renew_date2 = renovalDate.split('-');
       var renovalDate2 = renew_date2[2]+"-"+renew_date2[1]+"-"+renew_date2[0];

        //QUITAR ERRORES ORGANIZACION
        $('#nombre_empresa,#cif,#email_empresa,#telefono_empresa,#tipo_via_empresa,#nombre_via_empresa,#numero_empresa,#cp_empresa,#provincia_organizacion,#ciudad_empresa,.tipo_via_empresa input,.provincia_empresa input,.ciudad_empresa input').removeClass('border-danger');
        $('.vali_nombre_empresa,.vali_cif,.vali_email_empresa,.vali_telefono_empresa,.vali_tipovia_empresa,.vali_nombrevia_empresa,.vali_numero_empresa,.vali_cp_empresa,.vali_provincia_empresa,.vali_ciudad_empresa,.vali_politicas_organizacion').addClass('hide');
        $('#email_empresa,#telefono_empresa').removeClass('border-success');

        if (pais == "España") {
            //console.log("España")
              if (nif != "" && nombre != "" && apellido != "" && telefono != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) && tipovia != "" && nombre_via != "" && numero != "" && piso != "" && letra != "" && rest != "" && cp != "" && provincia != "" && ciudad != "") {
                $('#btn_enviar').attr('disabled', 'disabled');
                $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                $('#loading-i').addClass('spin-loader')
                var objectDataTax = {
                    front: 'landing-page',
                    donation_id: idDonacion,
                    new_client: newClient,
                    update_data: $('#modificar_datos_individual').prop('checked') ? true: false,
                    info_wills: $('#testamentos').prop('checked') ? true: false,
                    tax_exemption: {
                        person_type: 'Individual',
                        nif_cif: nif,
                        identification_type: 'nif',
                        business_name: '',
                        name: nombre,
                        surname: apellido,
                        email: email,
                        phone: telefono,
                        address: `${tipovia} ${nombre_via} ${numero}, ${piso}, ${letra}, ${rest}`,
                        street_type: tipovia,
                        street_name: nombre_via,
                        number: numero,
                        floor: piso,
                        apt_number: letra,
                        street_rest: rest,
                        zip_code: cp,
                        city_id: ciudad,
                        country_id: pais,
                        birth_date: birth_date,
                        renew_date: renovalDate2                        
                    }
                };
                console.log(objectDataTax);
                //https://api4paulusv1.dar.agency
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
                            taxExemption(objectDataTax, authToken);
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
                
              } else {
                if ($('#nif').val() == '') {
                    $('#nif').addClass('border-danger');
                    $('.vali_nif').removeClass('hide');
                } else {
                    $('#nif').removeClass('border-danger');
                    $('#nif').addClass('border-success');
                    $('.vali_nif').addClass('hide');
                }
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
                    $('#telefono').removeClass('border-success');
                    $('.vali_telefono').removeClass('hide');
                } else {
                    $('#telefono').removeClass('border-danger');
                    $('#telefono').addClass('border-success');
                    $('.vali_telefono').addClass('hide');
                }            
                if ($( "#tipo_via option:selected" ).val() == '') {
                    $('.tipo_via_individual input').addClass('border-danger');
                    $('.vali_tipo_via').removeClass('hide');
                } else {
                    $('#tipo_via option:selected').removeClass('border-danger');
                    $('.tipo_via_individual input').addClass('border-success');
                    $('.vali_tipo_via').addClass('hide');
                }
                if ($('#nombre_via').val() == '') {
                    $('#nombre_via').addClass('border-danger');
                    $('.vali_nombre_via').removeClass('hide');
                } else {
                    $('#nombre_via').removeClass('border-danger');
                    $('#nombre_via').addClass('border-success');
                    $('.vali_nombre_via').addClass('hide');
                }
                if ($('#numero').val() == '') {
                    $('#numero').addClass('border-danger');
                    $('.vali_numero').removeClass('hide');
                } else {
                    $('#numero').removeClass('border-danger');
                    $('#numero').addClass('border-success');
                    $('.vali_numero').addClass('hide');
                }
                if ($('#cp').val() == '') {
                    $('#cp').addClass('border-danger');
                    $('.vali_cp').removeClass('hide');
                } else {
                    $('#cp').removeClass('border-danger');
                    $('#cp').addClass('border-success');
                    $('.vali_cp').addClass('hide');
                }   
                if ($( "#provincia option:selected" ).val() == '') {
                    $('.provincia input').addClass('border-danger');
                    $('.vali_provincia').removeClass('hide');
                } else {
                    $('#provincia option:selected').removeClass('border-danger');
                    $('.provincia input').addClass('border-success');
                    $('.vali_provincia').addClass('hide');
                } 
                if ($( "#ciudad option:selected" ).val() == '') {
                    $('.ciudad input').addClass('border-danger');
                    $('.vali_ciudad').removeClass('hide');
                } else {
                    $('#ciudad option:selected').removeClass('border-danger');
                    $('.ciudad input').addClass('border-success');
                    $('.vali_ciudad').addClass('hide');
                }

              }

        }else{
          console.log("No españa")

            if (nif != "" && nombre != "" && apellido != "" && telefono != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) && pais != "") {
                $('#btn_enviar').attr('disabled', 'disabled');
                $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                $('#loading-i').addClass('spin-loader')
                
                var objectDataTax = {
                    front: 'landing-page',
                    donation_id: idDonacion,
                    new_client: newClient,
                    update_data: $('#modificar_datos_individual').prop('checked') ? true: false,
                    info_wills: $('#testamentos').prop('checked') ? true: false,
                    tax_exemption: {
                        person_type: 'Individual',
                        nif_cif: nif,
                        identification_type: 'nif',
                        business_name: '',
                        name: nombre,
                        surname: apellido,
                        email: email,
                        phone: telefono,
                        address: `${tipovia} ${nombre_via} ${numero}, ${piso}, ${letra}, ${rest}`,
                        street_type: tipovia,
                        street_name: nombre_via,
                        number: numero,
                        floor: piso,
                        apt_number: letra,
                        street_rest: rest,
                        zip_code: cp,
                        city_id: ciudad,
                        country_id: pais,
                        birth_date: birth_date,
                        renew_date: renovalDate2
                    }
                };
                console.log(objectDataTax);
                //https://api4paulusv1.dar.agency
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
                            taxExemption(objectDataTax, authToken);
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
              } else {
                if ($('#nif').val() == '') {
                    $('#nif').addClass('border-danger');
                    $('.vali_nif').removeClass('hide');
                } else {
                    $('#nif').removeClass('border-danger');
                    $('#nif').addClass('border-success');
                    $('.vali_nif').addClass('hide');
                }
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
                    $('#telefono').removeClass('border-success');
                    $('.vali_telefono').removeClass('hide');
                } else {
                    $('#telefono').removeClass('border-danger');
                    $('#telefono').addClass('border-success');
                    $('.vali_telefono').addClass('hide');
                }
              }

        }
        //ORGANIZACION 
    } else if (operation == 2) {

       var nombre_empresa = $("#nombre_empresa").val().trim()
       var cif = $("#cif").val().trim()
       var personacontacto = $("#nombre_per_contacto").val().trim()
       var email_empresa = $("#email_empresa").val().trim()
       var telefono_empresa = $("#telefono_empresa").val().trim()
       var pais_organizacion = $("#pais_organizacion").val().trim()
       var tipo_via_empresa = $("#tipo_via_empresa").val()
       var nombre_via_empresa = $("#nombre_via_empresa").val().trim()
       var numero_empresa = $("#numero_empresa").val().trim()
       var piso_empresa = $("#piso_empresa").val().trim()
       var letra_empresa = $("#letra_empresa").val().trim()
       var cp_empresa = $("#cp_empresa").val().trim()
       var provincia_empresa = $( "#provincia_organizacion").val()
       var ciudad_empresa = $( "#ciudad_empresa" ).val()
       var rest_empresa = $("#resto_via_empresa").val()
       var renew_date2 = renovalDate.split('-');
       var renovalDate2 = renew_date2[2]+"-"+renew_date2[1]+"-"+renew_date2[0];

        //QUITAR ERRORES INDIVIDUAL
        $('#nif,#nombre,#apellido,#email,#telefono,.tipo_via_individual input,#nombre_via,#numero,#cp,.provincia input,.ciudad input').removeClass('border-danger');
        $('.vali_nif,.vali_nombre,.vali_apellido,.vali_email,.vali_telefono,.vali_tipo_via,.vali_nombre_via,.vali_numero,.vali_cp,.vali_provincia,.vali_ciudad').addClass('hide');
        $('#nombre,#apellido,#email,#telefono').removeClass('border-success');

        if (pais_organizacion == "España") {
           //console.log('Empresa españa')
              if (nombre_empresa != "" && cif != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email_empresa) && telefono_empresa !="" && pais_organizacion != "" && tipo_via_empresa != "" && nombre_via_empresa != "" && numero_empresa != "" && piso_empresa != "" && letra_empresa != "" && rest_empresa != "" && cp_empresa != "" && provincia_empresa != "" && ciudad_empresa != "") {
                $('#btn_enviar').attr('disabled', 'disabled');
                $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                $('#loading-i').addClass('spin-loader')
                var objectDataTaxOrg = {
                    front: 'landing-page',
                    donation_id: idDonacion,
                    new_client: newClient,
                    update_data: $('#modificar_datos_organizacion').prop('checked') ? true: false,
                    info_wills: false,
                    tax_exemption: {
                        person_type: 'Organización',
                        nif_cif: cif,
                        identification_type: 'cif',
                        business_name: nombre_empresa,
                        name: personacontacto,
                        surname: '',
                        email: email_empresa,
                        phone: telefono_empresa,
                        address: `${tipo_via_empresa} ${nombre_via_empresa} ${numero_empresa}, ${piso_empresa} ${letra_empresa}, ${rest_empresa}`,
                        street_type: tipo_via_empresa,
                        street_name: nombre_via_empresa,
                        number: numero_empresa,
                        floor: piso_empresa,
                        apt_number: letra_empresa,
                        street_rest: rest_empresa,
                        zip_code: cp_empresa,
                        city_id: ciudad_empresa,
                        country_id: pais_organizacion,
                        birth_date: "",
                        renew_date: renovalDate2
                    }
                };
                //https://api4paulusv1.dar.agency
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
                            taxExemption(objectDataTaxOrg, authToken);
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
                  if ($('#nombre_empresa').val() == '') {
                      $('#nombre_empresa').addClass('border-danger');
                      $('.vali_nombre_empresa').removeClass('hide');
                  } else {
                      $('#nombre_empresa').removeClass('border-danger');
                      $('#nombre_empresa').addClass('border-success');
                      $('.vali_nombre_empresa').addClass('hide');
                  }
                  if ($('#cif').val() == '') {
                      $('#cif').addClass('border-danger');
                      $('.vali_cif').removeClass('hide');
                  } else {
                      $('#cif').removeClass('border-danger');
                      $('#cif').addClass('border-success');
                      $('.vali_cif').addClass('hide');
                  } 
                  if ($('#email_empresa').val() == '') {
                      $('#email_empresa').addClass('border-danger');
                      $('.vali_email_empresa').removeClass('hide');
                  } else {
                      if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test($('#email_empresa').val())) {
                          $('#email_empresa').removeClass('border-danger');
                          $('.vali_email_empresa').addClass('hide');
                          $('#email_empresa').removeClass('border-danger');
                          $('#email_empresa').addClass('border-success');
                      } else {
                          $('#email_empresa').removeClass('border-success');
                          $('#email_empresa').addClass('border-danger');
                          $('.vali_email_empresa').removeClass('hide');
                      }
                  } 
                  if ($('#telefono_empresa').val() == '') {
                      $('#telefono_empresa').addClass('border-danger');
                      $('.vali_telefono_empresa').removeClass('hide');
                  } else {
                      $('#telefono_empresa').removeClass('border-danger');
                      $('#telefono_empresa').addClass('border-success');
                      $('.vali_telefono_empresa').addClass('hide');
                  }  
                  if ($( "#tipo_via_empresa option:selected" ).val() == '') {
                      $('.tipo_via_empresa input').addClass('border-danger');
                      $('.vali_tipovia_empresa').removeClass('hide');
                  } else {
                      $('#tipo_via_empresa option:selected').removeClass('border-danger');
                      $('.tipo_via_empresa input').addClass('border-success');
                      $('.vali_tipovia_empresa').addClass('hide');
                  } 
                  if ($('#nombre_via_empresa').val() == '') {
                      $('#nombre_via_empresa').addClass('border-danger');
                      $('.vali_nombrevia_empresa').removeClass('hide');
                  } else {
                      $('#nombre_via_empresa').removeClass('border-danger');
                      $('#nombre_via_empresa').addClass('border-success');
                      $('.vali_nombrevia_empresa').addClass('hide');
                  } 
                  if ($('#numero_empresa').val() == '') {
                      $('#numero_empresa').addClass('border-danger');
                      $('.vali_numero_empresa').removeClass('hide');
                  } else {
                      $('#numero_empresa').removeClass('border-danger');
                      $('#numero_empresa').addClass('border-success');
                      $('.vali_numero_empresa').addClass('hide');
                  }   
                  if ($('#cp_empresa').val() == '') {
                      $('#cp_empresa').addClass('border-danger');
                      $('.vali_cp_empresa').removeClass('hide');
                  } else {
                      $('#cp_empresa').removeClass('border-danger');
                      $('#cp_empresa').addClass('border-success');
                      $('.vali_cp_empresa').addClass('hide');
                  } 
                  if ($( "#provincia_organizacion option:selected" ).val() == '') {
                      $('.provincia_empresa input').addClass('border-danger');
                      $('.vali_provincia_empresa').removeClass('hide');
                  } else {
                      $('#provincia_organizacion option:selected').removeClass('border-danger');
                      $('.provincia_empresa input').addClass('border-success');
                      $('.vali_provincia_empresa').addClass('hide');
                  }    
                  if ($( "#ciudad_empresa option:selected" ).val() == '') {
                      $('.ciudad_empresa input').addClass('border-danger');
                      $('.vali_ciudad_empresa').removeClass('hide');
                  } else {
                      $('#ciudad_empresa option:selected').removeClass('border-danger');
                      $('.ciudad_empresa input').addClass('border-success');
                      $('.vali_ciudad_empresa').addClass('hide');
                  } 
                  if ($('#vali_politicas_organizacion').prop("checked")) {
                      $('.vali_politicas_organizacion').addClass('hide');
                  } else {
                      $('.vali_politicas_organizacion').removeClass('hide');
                  }                                                                                                                                        
            }

        }else{
         console.log('No Empresa españa')
             if (nombre_empresa != "" && cif != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email_empresa) && telefono_empresa != "") {
                $('#btn_enviar').attr('disabled', 'disabled');
                $('#btn_enviar').append('<i class="material-icons" id="loading-i">autorenew</i>');
                $('#loading-i').addClass('spin-loader')
                var objectDataTaxOrg = {
                    front: 'landing-page',
                    donation_id: idDonacion,
                    new_client: newClient,
                    update_data: $('#modificar_datos_organizacion').prop('checked') ? true: false,
                    info_wills: false,
                    tax_exemption: {
                        person_type: 'Organización',
                        nif_cif: cif,
                        identification_type: 'cif',
                        business_name: nombre_empresa,
                        name: personacontacto,
                        surname: '',
                        email: email_empresa,
                        phone: telefono_empresa,
                        address: `${tipo_via_empresa} ${nombre_via_empresa} ${numero_empresa}, ${piso_empresa} ${letra_empresa}, ${rest_empresa}`,
                        street_type: tipo_via_empresa,
                        street_name: nombre_via_empresa,
                        number: numero_empresa,
                        floor: piso_empresa,
                        apt_number: letra_empresa,
                        street_rest: rest_empresa,
                        zip_code: cp_empresa,
                        city_id: ciudad_empresa,
                        country_id: pais_organizacion,
                        birth_date: "",
                        renew_date: renovalDate2
                    }
                };
                //https://api4paulusv1.dar.agency
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
                            taxExemption(objectDataTaxOrg, authToken);
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
            }else {
                if ($('#nombre_empresa').val() == '') {
                    $('#nombre_empresa').addClass('border-danger');
                    $('.vali_nombre_empresa').removeClass('hide');
                } else {
                    $('#nombre_empresa').removeClass('border-danger');
                    $('#nombre_empresa').addClass('border-success');
                    $('.vali_nombre_empresa').addClass('hide');
                }
                if ($('#cif').val() == '') {
                    $('#cif').addClass('border-danger');
                    $('.vali_cif').removeClass('hide');
                } else {
                    $('#cif').removeClass('border-danger');
                    $('#cif').addClass('border-success');
                    $('.vali_cif').addClass('hide');
                } 
                if ($('#email_empresa').val() == '') {
                    $('#email_empresa').addClass('border-danger');
                    $('.vali_email_empresa').removeClass('hide');
                } else {
                    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test($('#email_empresa').val())) {
                        $('#email_empresa').removeClass('border-danger');
                        $('.vali_email_empresa').addClass('hide');
                        $('#email_empresa').removeClass('border-danger');
                        $('#email_empresa').addClass('border-success');
                    } else {
                        $('#email_empresa').removeClass('border-success');
                        $('#email_empresa').addClass('border-danger');
                        $('.vali_email_empresa').removeClass('hide');
                    }
                } 
                if ($('#telefono_empresa').val() == '') {
                    $('#telefono_empresa').addClass('border-danger');
                    $('.vali_telefono_empresa').removeClass('hide');
                } else {
                    $('#telefono_empresa').removeClass('border-danger');
                    $('#telefono_empresa').addClass('border-success');
                    $('.vali_telefono_empresa').addClass('hide');
                }  
                if ($('#vali_politicas_organizacion').prop("checked")) {
                    $('.vali_politicas_organizacion').addClass('hide');
                } else {
                    $('.vali_politicas_organizacion').removeClass('hide');
                }                                        
            }
        }
    }
});



function taxExemption(dataLead, authToken) {
    //https://api4paulusv1.dar.agency/donation_via_landing_page/tax_exemption
    $.ajax({
        url: prodUrl+'donation_via_landing_page/tax_exemption',
        method: 'POST',
        data: dataLead,
        headers: { "Authorization": authToken },
        success: (data) => {
            console.log(data);
            if(data.codeError == false) {
                //Set In Session
                window.dataLayer.push({
                    'event': 'Desgravacion'
                });
                sessionStorage.setItem('lead', dataLead.tax_exemption.name);
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
  $("[type=number]").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
               return false;
    }
   });

   
});

