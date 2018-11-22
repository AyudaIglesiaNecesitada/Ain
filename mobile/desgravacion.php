<?php 
define('WP_USE_THEMES', false);

/** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/../wp-blog-header.php' );

require 'componentes/encabezado-desgravacion.php';
require 'componentes/content-desgravacion.php';
require 'componentes/footer-desgravacion.php';

 ?>