var MONTO = 0;
var tokenId = ""
var operation = 0
var arrayProvincias = {};
var stripe = null;
var cardNumber = null,
    cardExpiry = null, 
    cardCvc = null, 
    elements = null;
var elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
};
var elementStyles = {
    base: {
      color: '#fff',
      fontWeight: 600,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '20px',
      fontSmoothing: 'antialiased',
      ':focus': {
        color: '#424770',
      },
      '::placeholder': {
        color: '#9BACC8',
      },
      ':focus::placeholder': {
        color: '#CFD7DF',
      },
    },
    invalid: {
      color: '#fff',
      ':focus': {
        color: '#FA755A',
      },
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
};
function scrollWin() {
    window.scrollTo(0,0);
}

$(document).ready(function () {
    stripe = Stripe('pk_live_982mkIekStj9hUS1tp3yMUmq');
    elements = stripe.elements();
    window.localStorage.setItem('clientID', '');
    window.localStorage.setItem('donationID', '');
    window.localStorage.setItem('newClient', '');
    window.localStorage.setItem('renovalDate', '');
    cardNumber = elements.create('cardNumber', /*{
        style: elementStyles,
        classes: elementClasses
    }*/);
    
    cardExpiry = elements.create('cardExpiry', /*{
        style: elementStyles,
        classes: elementClasses
    }*/);
    
    cardCvc = elements.create('cardCvc', /*{
        style: elementStyles,
        classes: elementClasses
    }*/);
    
    cardNumber.mount('#cardNumber');
    cardExpiry.mount('#cardExpiry');
    cardCvc.mount('#cardCvc');

    var elementos = [cardNumber, cardExpiry, cardCvc]
    var error = $('#stripeError');
    error.hide();
    var errorMessage = $('#stripeErrorMessage');
    var savedErrors = {};
    elementos.forEach(function(element, idx) {
        element.on('change', function(event) {
            console.log(event);
            if (event.error) {
                console.log(event);
                error.show();
                savedErrors[idx] = event.error.message;
                errorMessage.text(event.error.message);
            } else {
                console.log(event);
                savedErrors[idx] = null;

                // Loop over the saved errors and find the first one, if any.
                var nextError = Object.keys(savedErrors)
                .sort()
                .reduce(function(maybeFoundError, key) {
                    return maybeFoundError || savedErrors[key];
                }, null);

                if (nextError) {
                // Now that they've fixed the current error, show another one.
                errorMessage.text(nextError);
                } else {
                // The user fixed the last error; no more errors.
                error.hide();
                }
            }
        });
    });

    var cardBrandToPfClass = {
    'visa': 'pf-visa',
      'mastercard': 'pf-mastercard',
      'amex': 'pf-american-express',
      'discover': 'pf-discover',
      'diners': 'pf-diners',
      'jcb': 'pf-jcb',
      'unknown': 'pf-credit-card',
    }
    
    function setBrandIcon(brand) {
        var brandIconElement = document.getElementById('brand-icon');
      var pfClass = 'pf-credit-card';
      if (brand in cardBrandToPfClass) {
          pfClass = cardBrandToPfClass[brand];
      }
      for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
          brandIconElement.classList.remove(brandIconElement.classList[i]);
      }
      brandIconElement.classList.add('pf');
      brandIconElement.classList.add(pfClass);
    }
    
    cardNumber.on('change', function(event) {
        // Switch brand logo
        if (event.brand) {
          setBrandIcon(event.brand);
      }
    });

    $('#iban').css("text-transform","uppercase");
})

$('#iban').keyup((e) => {
    if($('#iban').val().length == 2) {
        if($('#iban').val() === 'ES' || $('#iban').val() === 'es') {
            $('#iban').removeClass('border-danger');
            $('#btn_continuar').removeAttr('disabled');
            console.log('permitido');
        } else {
            $('#btn_continuar').attr('disabled', 'disabled');
            $('#iban').addClass('border-danger');
            console.log('no permitido');
        }
    }
});


// Continuar luego de haber seleccionado la campaña
$("#btn_continuar_1").click(function (e) {
    if (campana === 0) {
        $('.vali_campana').removeClass('hide');
    } else {
        scrollWin()
        $('.vali_campana').addClass('hide');
        $(e.target).slideUp('slow')
        $(".container-companas").slideUp('slow')
        $(".container-principal").slideDown('slow')
        
    }
})

//VALIDAR EL CLICK DE LOS BOTONES DEL TIPO DE DONATIVO
$("#btn_continuar").click(function (e) {
    e.preventDefault();
    $('.validacion-errors').addClass('dnone');
    $(this).prop("disabled", true);
    if(getParameterByName('donativo')) {
        if(getParameterByName('donativo') != "0") {
            objectData.campana = getParameterByName('donativo');
            objectData.nombreCampana = $('#titulo_container h4').text();
            console.log(objectData);
        } else {
            console.log('Campaña General');
            console.log(objectData);
        }
    }

    operation = $("input[name=group1]:checked").val()
    objectData.monto = $('#input_cantidad').val().trim();
    // datos comunes
    objectData.treatment = $("#tratamiento").val()
    objectData.nombre = $("#nombre").val().trim()
    objectData.apellido = $("#apellido").val().trim()
    objectData.email = $('#email').val().trim()
    objectData.telefono = $('#telefono').val().trim()
    // si el tipo de pago es domiciliacion bancaria
    if (operation == 1) {
        objectData.titular = $("#titular_domiciliacion").val().trim()
        objectData.iban = $("#iban").val().trim()
        objectData.entidad = $("#entidad").val().trim()
        objectData.oficina = $("#oficina").val().trim()
        objectData.dc = $("#dc").val().trim()
        objectData.num_cuenta = $("#numero_cuenta_domiciliacion").val().trim()


        //QUITAR ERRORES FORM TARJETA DE CREDITO
        $('#titular_tarjeta,#numero_tarjeta,#mm,#aa,#cvv').removeClass('border-danger');
        $('.vali_tit_card,.vali_num_card,.vali_date_card,.vali_cvv').addClass('hide');


        if (objectData.nombre != "" && objectData.apellido != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(objectData.email) && objectData.telefono != "" && objectData.titular != "" && objectData.iban != "" && objectData.entidad != "" && objectData.oficina != "" && objectData.dc != "" && objectData.num_cuenta != "" && $('#aceptar_politicas').is(':checked')) {
            console.log(objectData);
            $('#btn_continuar').attr('disabled', 'disabled');
            $('#btn_continuar').append('<i class="material-icons" id="loading-i">autorenew</i>');
            $('#loading-i').addClass('spin-loader')
            $.ajax({
                url: window.location.origin+'/donar/service.php',
                method: 'POST',
                data: {
                    op: 'at',
                },
                success: (data) => {
                    var data2 = JSON.parse(data);
                    if(data2.data.auth_token) {
                        console.log('Paso')
                        var authToken = data2.data.auth_token;
                        createDonationIban(objectData, authToken);
                    } else {
                        console.log('No Paso');
                        $('#btn_continuar').removeAttr('disabled');
                        $('.validacion-errors').removeClass('dnone');
                        $('#loading-i').remove();
                    }
                },
                error: (error) => {
                    $('#btn_continuar').removeAttr('disabled');
                    $('.validacion-errors').removeClass('dnone');
                    $('#loading-i').remove();
                    console.log(error);
                }
            })
        } else {
            validateCommons()
            if ($('#titular_domiciliacion').val() == '') {
                $('#titular_domiciliacion').addClass('border-danger');
                $('.vali_titular_domi').removeClass('hide');
            } else {
                $('#titular_domiciliacion').removeClass('border-danger');
                $('#titular_domiciliacion').addClass('border-success');
                $('.vali_titular_domi').addClass('hide');
            }
            if ($('#iban').val() == '') {
                $('#iban').addClass('border-danger');
                $('.vali_iban').removeClass('hide');
            } else {
                $('#iban').removeClass('border-danger');
                $('#iban').addClass('border-success');
                $('.vali_iban').addClass('hide');
            }
            if ($('#entidad').val() == '') {
                $('#entidad').addClass('border-danger');
                $('.vali_entidad').removeClass('hide');
            } else {
                $('#entidad').removeClass('border-danger');
                $('#entidad').addClass('border-success');
                $('.vali_entidad').addClass('hide');
            } 
            if ($('#oficina').val() == '') {
                $('#oficina').addClass('border-danger');
                $('.vali_oficina').removeClass('hide');
            } else {
                $('#oficina').removeClass('border-danger');
                $('#oficina').addClass('border-success');
                $('.vali_oficina').addClass('hide');
            }
            if ($('#dc').val() == '') {
                $('#dc').addClass('border-danger');
                $('.vali_dc').removeClass('hide');
            } else {
                $('#dc').removeClass('border-danger');
                $('#dc').addClass('border-success');
                $('.vali_dc').addClass('hide');
            }
            if ($('#numero_cuenta_domiciliacion').val() == '') {
                $('#numero_cuenta_domiciliacion').addClass('border-danger');
                $('.vali_numero_cuenta_domiciliacion').removeClass('hide');
            } else {
                $('#numero_cuenta_domiciliacion').removeClass('border-danger');
                $('#numero_cuenta_domiciliacion').addClass('border-success');
                $('.vali_numero_cuenta_domiciliacion').addClass('hide');
            }
            if ($('#aceptar_politicas').prop("checked")) {
                $('.vali_politicas').addClass('hide');
            }else{
                $('.vali_politicas').removeClass('hide');
            }


        }
        // de lo contrario si eltipo de pago es por tarjeta de credito
    } else if (operation == 2) {
        
        //QUITAR ERRORES FORM DOMICILIACION
        $('#titular_domiciliacion,#iban,#entidad,#oficina,#dc,#numero_cuenta_domiciliacion').removeClass('border-danger');
        $('.vali_titular_domi,.vali_iban,.vali_entidad,.vali_oficina,.vali_dc,.vali_numero_cuenta_domiciliacion').addClass('hide');
        
        objectData.titular = $("#titular_tarjeta").val().trim()
        /*objectData.tarjeta = $("#numero_tarjeta").val().trim()
        objectData.vencimiento = '${$("#mm").val().trim()}-${$("#aa").val().trim()}'
        objectData.cvv = $("#cvv").val().trim()*/
        if (objectData.nombre != "" && objectData.apellido != "" && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(objectData.email) && objectData.telefono != "" && objectData.titular != "" && $('#aceptar_politicas').is(':checked')) {
            $('#btn_continuar').attr('disabled', 'disabled');
            $('#btn_continuar').append('<i class="material-icons" id="loading-i">autorenew</i>');
            $('#loading-i').addClass('spin-loader')
            stripe.createToken(cardNumber).then( result => {
                if(result.token) {
                    $.ajax({
                        url: window.location.origin+'/donar/service.php',
                        method: 'POST',
                        data: {
                            op: 'at',
                        },
                        success: (data) => {
                            var data2 = JSON.parse(data);
                            if(data2.data.auth_token) {                                
                                console.log('Paso');
                                var authToken = data2.data.auth_token;
                                createDonation(result, objectData, authToken);
                            } else {
                                console.log('No Paso');
                                $('#btn_continuar').removeAttr('disabled');
                                $('.validacion-errors').removeClass('dnone');
                                $('#loading-i').remove();
                            }
                        },
                        error: (error) => {
                            $('#btn_continuar').removeAttr('disabled');
                            $('.validacion-errors').removeClass('dnone');
                            $('#loading-i').remove();
                            console.log(error);
                        }
                    })
                    console.log(objectData);
                    
                } else {
                    $('#btn_continuar').removeAttr('disabled');
                    $('.validacion-errors').removeClass('dnone');
                    $('#loading-i').remove();
                    console.log(result);
                }
            });
        } else {
            validateCommons()
            if ($('#titular_tarjeta').val() == '') {
                $('#titular_tarjeta').addClass('border-danger');
                $('.vali_tit_card').removeClass('hide');
            } else {
                $('#titular_tarjeta').removeClass('border-danger');
                $('#titular_tarjeta').addClass('border-success');
                $('.vali_tit_card').addClass('hide');
            }
            if ($('#numero_tarjeta').val() == '') {
                $('#numero_tarjeta').addClass('border-danger');
                $('.vali_num_card').removeClass('hide');
            } else {
                $('#numero_tarjeta').removeClass('border-danger');
                $('#numero_tarjeta').addClass('border-success');
                $('.vali_num_card').addClass('hide');
            }
            if ($('#mm').val() == '' || $('#aa').val() == '') {
                $('#mm').addClass('border-danger');
                $('#aa').addClass('border-danger');
                $('.vali_date_card').removeClass('hide');
            } else {
                $('#mm').removeClass('border-danger');
                $('#mm').addClass('border-success');
                $('#aa').removeClass('border-danger');
                $('#aa').addClass('border-success');
                $('.vali_date_card').addClass('hide');
            }
            if ($('#cvv').val() == '') {
                $('#cvv').addClass('border-danger');
                $('.vali_cvv').removeClass('hide');
            } else {
                $('#cvv').removeClass('border-danger');
                $('#cvv').addClass('border-success');
                $('.vali_cvv').addClass('hide');
            }
            if ($('#aceptar_politicas').prop("checked")) {
                $('.vali_politicas').addClass('hide');
            }else{
                $('.vali_politicas').removeClass('hide');
            }            
        }
    }
});

function createDonation(stripeToken, dataLead, authToken) {
    if(stripeToken.token) {
        var token = stripeToken.token.id;
        var frequency = null;
        var tipoSessionPago = null;
        if(dataLead.tipo == 1) {
            frequency = 'Mensual';
            tipoSessionPago = 1
        } else {
            frequency = 'Puntual';
            tipoSessionPago = 2
        }
        sessionStorage.setItem('tipo', tipoSessionPago)
        localStorage.setItem('tipo', tipoSessionPago)

        var dataToDrm = {
            "op": "donc",
            "tk": authToken,
            "frequency": frequency,
            "amount": dataLead.monto,
            "campaign": dataLead.nombreCampana,
            "campaign_id": dataLead.campana,
            "appeal": $('#appeal').val().trim(),
            "fund": $('#fund').val().trim(),
            "url_landing": window.location.href,
            "treatment": dataLead.treatment,
            "name": dataLead.nombre,
            "surname": dataLead.apellido,
            "email": dataLead.email,
            "phone": dataLead.telefono,
            "tax_exemption": $('#check_desgravacion').prop('checked') == true ? false : true,
            "anonymous": $('#check_donacion_anonima').prop('checked'),
            "payment_type": "Tarjeta de crédito",
            "stripe_token": token,
            "utm_campaign": $('#utm_campaign').val().trim(),
            "utm_source": $('#utm_source').val().trim(),
            "utm_medium": $('#utm_medium').val().trim(),
            "utm_content": $('#utm_content').val().trim(),
            "utm_term": $('#utm_term').val().trim(),
            "personal_data_auth" : $('#aceptar_politicas').val()
        }
        $.ajax({
            url: window.location.origin+'/donar/service.php',
            method: 'POST',
            data: dataToDrm,
            success: (data) => {
                var data2 = JSON.parse(data);
                if(data2.data.client) {
                    /*window.MONTO = $('#input_cantidad').val().trim();
                    window.dataLayer.push({
                        event: 'donationEnd'
                    });*/
                    var response = data2.data;
                    var fecha = new Date();
                    var dia = String(fecha.getDate());
                    var diaF = dia.lenght > 1 ? `0${dia}` : `${dia}`;
                    var mes = String(fecha.getMonth() + 1);
                    var mesF = mes.length + 1 > 1 ? `${mes}`: `0${mes}`;
                    var fechaF = `${diaF}-${mesF}-${fecha.getFullYear()}`;
                    sessionStorage.setItem('lead', dataLead.nombre);
                    sessionStorage.setItem('monto', $('#input_cantidad').val().trim());
                    sessionStorage.setItem('campaña', dataLead.nombreCampana);
                    sessionStorage.setItem('cid', objectData.campana);
                    window.localStorage.setItem('clientID', response.client.id);
                    window.localStorage.setItem('donationID', response.donation.donation_id);
                    window.localStorage.setItem('newClient', response.client.new_client);
                    window.localStorage.setItem('renovalDate', fechaF);
                    switch ($('#check_desgravacion').prop('checked')) {
                        case true:
                            if($('#check_donacion_anonima').prop('checked')) {
                                window.setTimeout(() => {
                                    window.location.href = '/mobile/gracias.php?cid='+objectData.campana
                                }, 4000);
                            } else {
                                if(response.client.new_client) {
                                    window.setTimeout(() => {
                                        window.location.href = '/mobile/gracias.php?cid='+objectData.campana
                                    }, 4000);
                                } else {
                                    window.setTimeout(() => {
                                        window.location.href = '/mobile/form-gracias.php?cid='+objectData.campana
                                    }, 4000);
                                }
                            }
                            break;
                        case false:
                            if(response.client.new_client) {
                                window.setTimeout(() => {
                                    window.location.href = '/mobile/desgravacion.php?cid='+objectData.campana
                                }, 4000);
                            } else {
                                window.setTimeout(() => {
                                    window.location.href = '/mobile/desgravacion.php?cid='+objectData.campana
                                }, 4000);
                            }
                            break;
                        default:
                            break;
                    }
                } else {
                    $('.validacion-errors').removeClass('dnone');
                    console.log(data);
                    $('#btn_continuar').removeAttr('disabled');
                    $('#loading-i').remove();
                }
            },
            error: (err) => {
                $('#btn_continuar').removeAttr('disabled');
                $('#loading-i').remove();
                $('.validacion-errors').removeClass('dnone');
                console.error(err);
            }
        })
    }
}
function createDonationIban(dataLead, authToken) {
    var frequency = null;
    var tipoSessionPago = null;
    if(dataLead.tipo == 1) {
        frequency = 'Mensual';
        tipoSessionPago = 1;
    } else {
        frequency = 'Puntual';
        tipoSessionPago = 2;
    }
    sessionStorage.setItem('tipo', tipoSessionPago);
    localStorage.setItem('tipo', tipoSessionPago);

    var dataToDrm = {
        "op": "doni",
        "tk": authToken,
        "frequency": frequency,
        "amount": dataLead.monto,
        "campaign": dataLead.nombreCampana,
        "campaign_id": dataLead.campana,
        "appeal": $('#appeal').val().trim(),
        "fund": $('#fund').val().trim(),
        "url_landing": window.location.href,
        "treatment": dataLead.treatment,
        "name": dataLead.nombre,
        "surname": dataLead.apellido,
        "email": dataLead.email,
        "phone": dataLead.telefono,
        "tax_exemption": $('#check_desgravacion').prop('checked') == true ? false : true,
        "anonymous": $('#check_donacion_anonima').prop('checked'),
        "payment_type": "Domiciliación bancaria",
        "b_owner": dataLead.titular,
        "b_iban": dataLead.iban,
        "b_bank":  dataLead.entidad,
        "b_office": dataLead.oficina,
        "b_dc": dataLead.dc,
        "b_number": dataLead.num_cuenta,
        "utm_campaign": $('#utm_campaign').val().trim(),
        "utm_source": $('#utm_source').val().trim(),
        "utm_medium": $('#utm_medium').val().trim(),
        "utm_content": $('#utm_content').val().trim(),
        "utm_term": $('#utm_term').val().trim(),
        "personal_data_auth" : $('#aceptar_politicas').val()
    }
    $.ajax({
        url: window.location.origin+'/donar/service.php',
        method: 'POST',
        data: dataToDrm,
        success: (data) => {
            var data2 = JSON.parse(data);
            if(data2.data.client) {
                var response = data2.data;
                /*window.MONTO = $('#input_cantidad').val().trim();
                window.dataLayer.push({
                    'event': 'DonationEnd'
                });
                */
                var response = data.data;
                var fecha = new Date();
                var dia = String(fecha.getDate());
                var diaF = dia.lenght > 1 ? `0${dia}` : `${dia}`;
                var mes = String(fecha.getMonth() + 1);
                var mesF = mes.length + 1 > 1 ? `${mes}`: `0${mes}`;
                var fechaF = `${diaF}-${mesF}-${fecha.getFullYear()}`;
                sessionStorage.setItem('lead', dataLead.nombre);
                sessionStorage.setItem('monto', $('#input_cantidad').val().trim());
                sessionStorage.setItem('campaña', dataLead.nombreCampana);
                sessionStorage.setItem('cid', objectData.campana);
                window.localStorage.setItem('clientID', response.client.id);
                window.localStorage.setItem('donationID', response.donation.donation_id);
                window.localStorage.setItem('newClient', response.client.new_client);
                window.localStorage.setItem('renovalDate', fechaF);
                switch ($('#check_desgravacion').prop('checked')) {
                    case true:
                        if($('#check_donacion_anonima').prop('checked')) {
                            window.setTimeout(() => {
                                window.location.href = '/mobile/gracias.php?cid='+objectData.campana
                            }, 4000);
                        } else {
                            if(response.client.new_client) {
                                window.setTimeout(() => {
                                    window.location.href = '/mobile/gracias.php?cid='+objectData.campana
                                }, 4000);
                            } else {
                                window.setTimeout(() => {
                                    window.location.href = '/mobile/form-gracias.php?cid='+objectData.campana
                                }, 4000);
                            }
                        }
                        break;
                    case false:
                        if(response.client.new_client) {
                            window.setTimeout(() => {
                                window.location.href = '/mobile/desgravacion.php?cid='+objectData.campana
                            }, 4000);
                        } else {
                            window.setTimeout(() => {
                                window.location.href = '/mobile/desgravacion.php?cid='+objectData.campana
                            }, 4000);
                        }
                        break;
                    default:
                        break;
                }
            } else {
                console.log(data);
                $('.validacion-errors').removeClass('dnone');
                $('#btn_continuar').removeAttr('disabled');
                $('#loading-i').remove();
            }
        },
        error: (err) => {
            $('#btn_continuar').removeAttr('disabled');
            $('#loading-i').remove();
            $('.validacion-errors').removeClass('dnone');
            console.error(err);
        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function validateCommons() {
    if ($('#nombre').val() == '') {
        $('#nombre').addClass('border-danger');
        $('.vali_nombre').removeClass('hide');
    } else {
        $('#nombre').removeClass('border-danger');
        $('.vali_nombre').addClass('hide');
        $('#nombre').addClass('border-success');
    }
    if ($('#apellido').val() == '') {
        $('#apellido').addClass('border-danger');
        $('.vali_apellido').removeClass('hide');
    } else {
        $('#apellido').removeClass('border-danger');
        $('.vali_apellido').addClass('hide');
        $('#apellido').addClass('border-success');
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
    
    if($('#telefono').val() == '') {
        $('#telefono').addClass('border-danger');
        $('#telefono').removeClass('border-success');
        $('.vali_telef').removeClass('hide');
     } else {
         $('#telefono').removeClass('border-danger');
         $('#telefono').addClass('border-success');
         $('.vali_telef').addClass('hide');
     }
}