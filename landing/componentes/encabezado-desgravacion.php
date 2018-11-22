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
                      <h2>¡Gracias <span id="nombre_donante" class="nombre_donante"></span>!</h2>
                      <h5 class="dato_informativo">Para que puedas desgravar <br> este donativo necesitamos tus datos</h5>
                      <p>Con tu donación de <span id="monto_donacion"></span></p>
                      <p>Apoyarás: <span id="nombre_campaña"></span></p>
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
    $('#nombre_donante').text(sessionStorage.getItem('lead'));
    $('#monto_donacion').text(sessionStorage.getItem('monto'));
    $('#nombre_campaña').text(sessionStorage.getItem('campaña'));
  } else {
    console.log('session null');
  }

})

</script>