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
          <?php
      $id_camp_seleccionada = $_GET['cid'];

    $campana_gnral = array(
  'post_type' => 'campana',
  'post_status' => 'publish',
  'p' => $id_camp_seleccionada,
  'posts_per_page' => 1,
);

$campana_gneral_data = new WP_Query($campana_gnral); 

if($campana_gneral_data->have_posts()):

  while($campana_gneral_data->have_posts()):
      $campana_gneral_data->the_post();
      $img_campana_gnral  = get_field('imagen_destacada'); 
      $titulo_campana_gnral  = get_field('titulo_campaña'); 
      $descripcion_campana_gnral  = get_field('descripcion_campaña');  
          ?>

          <div id="imagen_content2">
            <div id="titulo_container">
                  <div class="row">
                    <div class="imagen_campaña2" style="background-image: url(<?php echo $img_campana_gnral; ?>);">
                      <div class="titulo_campaña2">
                      <h4>¡Gracias por tu donación!</h4>
                    </div>
                    </div>                  
                  </div>                 
            </div>
              <div id="content_info" class="text-center textos_gracias">
                        <p class="title_info_donacion">Con tu donación de <span class="donation_amount"></span></p>
                      <p class="title_info_donacion">Apoyaras a la causa: <span class="campana_name"></span></p>
              </div>  
          </div>
        <?php         
        endwhile;
        endif; ?>
      </header><!-- /header -->
      <script>

      var name = sessionStorage.getItem('lead');
var monto = sessionStorage.getItem('monto');
var campaña = sessionStorage.getItem('campaña');
console.log('Name: '+ name + ', monto: '+ monto+ ', campaña: '+campaña);
window.addEventListener('load', () => {
  if(name != null || name != '' && monto != null || monto != '' && campaña != null || campaña != '') {
    //$('.nombre_client').text(sessionStorage.getItem('lead')+',');
    $('.donation_amount').text(sessionStorage.getItem('monto'));
    $('.campana_name').text(sessionStorage.getItem('campaña'));
  } else {
    console.log('session null');
  }

})
      /*var testUrl = 'https://drmbackend.localtunnel.me/';
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