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
            'p'=> $id_camp_seleccionada,
            'ignore_sticky_posts' => true,
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

          <div id="imagen_content">
            <div id="titulo_container">
                  <div class="row">
                    <div class="imagen_campaña" style="background-image: url(<?php echo $img_campana_gnral; ?>);">
                    </div>
                    <div class="titulo_campaña">
                      <span class="img_fondo" style="background-image: url(<?php echo $img_campana_gnral; ?>);"></span>
                      <h4>¡Gracias por tu donación!</h4>
                    </div>
                  </div>                 
            </div>
          </div>
        <?php         
        endwhile;
        endif; ?>
      </header><!-- /header -->
