<!DOCTYPE html>
  <html>
    <head>

      <!--ENLACES DE LAS LIBRERÍAS-->
      <?php require 'componentes/enlaces-head.php'; ?>
      
      <meta http-equiv="x-ua-compatible" content="IE=edge">
      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>

    <body>
      <!--cargador-->
        <div class="preloader-background">
            <div class="preloader-wrapper active">
              <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
        </div>
        <!--cargador-->    
          
      <!--Encabezado-->
      <header id="header">
        <!--nav logo-->
          <nav>
            <div class="nav-wrapper container">
              <a href="/" class="logo"><img src="assets/img/logo.png" alt="logo"></a>
            </div>
          </nav>
          <?php 

          	if (isset($_GET['donativo'])) {
          		$donativo_id = $_GET['donativo'];
          	}else{
          		$donativo_id = '';
          	}    
 				  $campana = array(
			      'post_type' => 'campana',
			      'p'=> $donativo_id,
			      'post_status' => 'publish',
			      'ignore_sticky_posts' => true,
			      'posts_per_page' => 30,
			      'order' => 'DESC',
			      'orderby' => 'date'
			  );

			  $campana_data = new WP_Query($campana); 			  

           ?>          
          <?php if (!empty($donativo_id)){ ?>

           <?php 
            if($campana_data->have_posts()):

            while($campana_data->have_posts()):
                $campana_data->the_post();
                $img_campana  = get_field('imagen_destacada'); 
            ?>
          <div id="imagen_content" style="background-image: url(<?php echo $img_campana ?>);">
            <div id="titulo_container" class="container">
                  <div class="row">
                      <h4><?php echo wp_trim_words (get_the_title(),15) ?></h4>
                      <p><?php echo the_excerpt() ?></p>
                  </div>                 
            </div>
          </div>
          <?php         
      	endwhile;
        endif; ?>

        <?php
    		}else{

          $posts = get_posts(array(
            'post_type' => 'campana_general',
            'post_status' => 'publish',
          ));
          
          if($posts){
          
            foreach($posts as $post)
            {
              $id_camp_general = get_field('id_camp_general');
              
            }
          
          }
         
        	 	 $campana_gnral = array(
			      'post_type' => 'campana',
            'post_status' => 'publish',
            'p' => $id_camp_general,
			      'ignore_sticky_posts' => true,
			      'posts_per_page' => 1,
			      'order' => 'DESC',
			      'orderby' => 'date'
			  );

			  $campana_gneral_data = new WP_Query($campana_gnral); 

			if($campana_gneral_data->have_posts()):

            while($campana_gneral_data->have_posts()):
                $campana_gneral_data->the_post();
                $img_campana_gnral  = get_field('imagen_destacada'); 
                $titulo_campana_gnral  = get_field('titulo_campaña'); 
                $descripcion_campana_gnral  = get_field('descripcion_campaña');  
        	?>

        	<div id="imagen_content" style="background-image: url(<?php echo $img_campana_gnral; ?>);">
            <div id="titulo_container" class="container">
                  <div class="row">
                      <h4><?php echo wp_trim_words (get_the_title(),15) ?></h4>
                      <p><?php echo the_excerpt() ?></p>
                      <span class="id_rul hide"><?php echo $id_camp_general; ?></span>
                  </div>                 
            </div>
          </div>
        <?php         
      	endwhile;
        endif; ?>
       	<?php } ?> 	

      </header><!-- /header -->
