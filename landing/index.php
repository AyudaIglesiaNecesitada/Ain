<?php 
define('WP_USE_THEMES', false);

/** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/../wp-blog-header.php' );

require 'componentes/encabezado.php';
require 'componentes/content.php';
require 'componentes/footer-index.php';

 ?>