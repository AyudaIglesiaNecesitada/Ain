<!DOCTYPE html>
  <html>
    <head>

      <!--ENLACES DE LAS LIBRERÍAS-->
      <?php require 'componentes/enlaces-head.php'; ?>
      

      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>

    <body>
      <!--Encabezado-->
      <header id="header">
        <!--nav logo-->
          <nav>
            <div class="nav-wrapper container">
              <a href="/" class="logo"><img src="assets/img/logo.png" alt="logo"></a>
            </div>
          </nav>
          <div id="imagen_content_gracias" style="background-image: url(assets/img/encabezado.png);">
            <div id="titulo_container_gracias" class="container">
                  <div class="row">
                      <h2><span class="nombre_client"></span> ¡Gracias por <br> tu Generosidad!</h2>
                      <p>Con tu donación de <span class="donation_amount"></span></p>
                      <p>Apoyarás: <span class="campana_name"></span></p>
                  </div>               
            </div>
            <span class="sombra"></span>  
          </div>
      </header><!-- /header -->
<script>
var name = sessionStorage.getItem('lead');
var monto = sessionStorage.getItem('monto');
var campaña = sessionStorage.getItem('campaña');
console.log('Name: '+ name + ', monto: '+ monto+ ', campaña: '+campaña);
window.addEventListener('load', () => {
  if(name != null || name != '' && monto != null || monto != '' && campaña != null || campaña != '') {
    $('.nombre_client').text(sessionStorage.getItem('lead')+',');
    $('.donation_amount').text(sessionStorage.getItem('monto'));
    $('.campana_name').text(sessionStorage.getItem('campaña'));
  } else {
    console.log('session null');
  }

})

/*
var testUrl = 'https://drmbackend2.localtunnel.me/';
var prodUrl = 'https://test-api4drmv1.ayudaalaiglesianecesitada.org/';
window.addEventListener('load', ()=> {
  $.ajax({
    url: prodUrl+'donation_via_landing_page/authenticate',
    method: 'POST',
    data: {
      front: 'landing-page',
      user: 'andres.morales@dar.agency',
      password: 'Ihn9CkJBAcuN'
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
            }
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        console.log(data);    
      }
    },
    error: (error) => {
      console.log(error);
    }
  });
});*/
</script>