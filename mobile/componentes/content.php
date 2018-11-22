<main class="container" id="content_main">
	<!--SECCION DONATIVOS-->
	<div id="content_info">
		<div class="row">
			<p class="titulos_donaciones titulo_tipo_donativo">Tipo de donativo:</p>
			<div class="tipo_donativos">
			<a class="waves-effect waves-light btn-large">MENSUAL</a>
			<a class="waves-effect waves-light btn-large">PUNTUAL</a>
			<span class="validacion vali_tipo_donativo hide"><i class="material-icons">info_outline</i> Seleccione si su donación es mensual o puntual</span>				
			</div>			
		</div>
		<div class="row">
			<p class="titulos_donaciones titulo_cantidad">¿Qué cantidad?</p>
			<div class="cantidades col m12 s12">
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
                $cant1  = get_field('cant1');
                $cant2  = get_field('cant2'); 
                $cant3  = get_field('cant3');

                $descrip1  = get_field('descrip1'); 
                $descrip2  = get_field('descrip2'); 
                $descrip3  = get_field('descrip3');  		  

           ?>				
				<article id="opt1">
					<a class="waves-effect waves-light btn-large"><span id="valor1"><?php echo $cant1 ?></span><span>€</span></a>
					<span class="descrip_causa"><?php echo $descrip1 ?></span>
				</article>
				<article id="opt2">			
					<a class="waves-effect waves-light btn-large"><span id="valor2"><?php echo $cant2 ?></span><span>€</span></a>
					<span class="descrip_causa"><?php echo $descrip2 ?></span>
				</article>	
				<article id="opt3">
					<a class="waves-effect waves-light btn-large"><span id="valor3"><?php echo $cant3 ?></span><span>€</span></a>
					<span class="descrip_causa"><?php echo $descrip3 ?></span>
				</article>
	          <?php        
      		  endwhile;
              endif;
               ?>
               <?php }else{
				             $posts = get_posts(array(
								'post_type' => 'campana_general',
								'post_status' => 'publish',
								'posts_per_page' => 1,
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
				  'p'=> $id_camp_general,
			      'posts_per_page' => 1,
			  );

			  $campana_gneral_data = new WP_Query($campana_gnral); 

			if($campana_gneral_data->have_posts()):

            while($campana_gneral_data->have_posts()):
                $campana_gneral_data->the_post();
				$cant1  = get_field('cant1');
				$cant2  = get_field('cant2'); 
				$cant3  = get_field('cant3');

				$descrip1  = get_field('descrip1'); 
				$descrip2  = get_field('descrip2'); 
				$descrip3  = get_field('descrip3');                	

               	?>
				<article id="opt1">
					<a class="waves-effect waves-light btn-large"><span id="valor1"><?php echo $cant1 ?></span><span>€</span></a>
					<span class="descrip_causa"><?php echo $descrip1 ?></span>
				</article>
				<article id="opt2">			
					<a class="waves-effect waves-light btn-large"><span id="valor2"><?php echo $cant2 ?></span><span>€</span></a>
					<span class="descrip_causa"><?php echo $descrip2 ?></span>
				</article>	
				<article id="opt3">
					<a class="waves-effect waves-light btn-large"><span id="valor3"><?php echo $cant3 ?></span><span>€</span></a>
					<span class="descrip_causa"><?php echo $descrip3 ?></span>
				</article>
				<?php 
				endwhile;
				endif;
				 ?> 
				<?php } ?>               					
				<input type="tel" name="" placeholder="Otra cantidad" id="input_cantidad" class="text-center" maxlength="5">
				<span class="validacion vali_cantidad hide"><i class="material-icons">info_outline</i>Seleccione una cantidad a donar</span>	
			</div>
			<div class="col s12 quitar-padding">
			<a href="#!" class="waves-effect waves-light btn-large btn_principal" title="" id="btn_donar">DONAR</a>				
			</div>

			<!------------------------------------CAMPAÑAS------------------------->
				<?php require 'componentes/view_camp.php'; ?>	
		</div>		
	</div>
	<!--FIN SECCION DONATIVOS-->

	<!--SECCION INFORMACIÓN PAGOS-->

	<div id="info_pagos">
		<p class="text-center title">TAMBIÉN PUEDES DONAR POR</p>
		<div class="row text-center" id="content_info_pagos">
			<div class="col border padding telefono">
				<p class="titles">TELÉFONO</p>
				<P>91 725 92 12</P>
				<P>93 237 37 63</P>
			</div>
			<div class="col border padding transferencia">
				<p class="titles">TRANSFERENCIA BANCARIA</p>
				<p><span class="titles">SANTANDER</span> ES74 0049 2674 59 2814342966</p>
				<p><span class="titles">LA CAIXA</span> ES21 2100 2415 42 0200140293</p>
			</div>
			<div class="col padding internacional">
				<P>Para transferencias internacionales <br> <a href="https://s3-eu-west-1.amazonaws.com/pro-ain-static/main-files/uploads/2017/09/27163100/cuentas_bancarias-transferencias_internacionales.pdf" title="cuentas" target="_blank">Haz click aquí</a></P>
			</div>						
		</div>
	</div>
	<!--FIN SECCION INFORMACIÓN PAGOS-->

	<!--SECCION INFORMACIÓN EJEMPLO-->
	<div id="info_ejemplo">
		<div class="row">
			<div class="text-center content1">
				  <i class="material-icons">lock_outline</i>
				  <p>Tu donación está en un ambiente seguro</p>
			</div>
			<div class="content2 text-center">
				  <span>75%</span>
				  <p>Todos los donativos desgravan hasta un 75%</p>
			</div>			
		</div>
	</div>
	<!-- FIN SECCION INFORMACIÓN EJEMPLO-->

	<!--SECCION ACORDION-->
	<div class="info_acordion">
		  <ul class="collapsible">
		    <li>
		      <div class="collapsible-header">
		      	<h5>¿A quién y como llega tu donativo?</h5>
		      	<i class="material-icons">add_circle_outline</i>
		      </div>
		      <div class="collapsible-body"><span>Si tú has querido colaborar con una campaña específica, tu donativo se destinará a la financiación de proyectos de esa campaña en cuestión. En caso de que al recibir tu aportación, las necesidades ya estuvieran cubiertas, <span class="italic"><strong>Ayuda a la Iglesia Necesitada </strong></span>destinará tu donativo a proyectos similares o a paliar necesidades pastorales o de emergencia en el mismo país.<br>
 
			Si no especificas el destino concreto de tu donativo, <span class="italic"><strong>Ayuda a la Iglesia Necesitada</strong></span> lo destinará a las necesidades más urgentes.<br>
			 
			Los donativos que recibimos tenemos el deber moral de canalizarlos con pulcritud extrema; nos debemos a nuestros benefactores, que depositan su confianza en la gestión impecable de Ayuda a la Iglesia Necesitada y a nuestros beneficiarios, la Iglesia que sufre, que son la razón de ser de esta Fundación.<br>


			Ahora, que vas a realizar tu donativo, es importante que conozcas cuánto desgravan tus aportaciones ya que ahora desgravan más que nunca.<br>
			Los primeros 150 € anuales que donas desgravan el 75 %, es decir que hacienda te devuelve 112,5 €.<br>
			A partir de ahí, tus donativos podrán deducir el 30 %, y el 35% si el donativo es recurrente.</span></div>
		    </li>
		    <li>
		      <div class="collapsible-header">
		      	<h5>¿Cómo y cuánto desgravan tus donativos?</h5>
		      	<i class="material-icons">add_circle_outline</i></div>
		      <div class="collapsible-body">
		      	<span>Ahora, que vas a realizar tu donativo, es importante que conozcas cuánto desgravan tus aportaciones ya que <strong>ahora desgravan más que nunca.</strong>
				<strong>Los primeros 150 €</strong> anuales que donas <strong>desgravan el 75 %,</strong> es decir que hacienda te devuelve 112,5 €. 
				A partir de ahí, tus donativos podrán deducir el 30 %, y el 35% si el donativo es recurrente.
				</span>
				<img src="assets/img/img-infografia.png" alt="infografia" class="responsive-img"><br>
				<span>
				<strong>¿Que considera Hacienda como donativo recurrente?</strong><br>

				Se considera donativo recurrente a toda aquella cantidad entregada a la misma institución de forma mensual/anual y periódica durante al menos 4 años consecutivos y que es igual o mayor cada año.

				Todo esto significa que <strong>el coste real de tus donativos es menor que nunca,</strong> y por ello, queremos animarte a ser generoso en tus aportaciones, y que, a ser posible, <strong>te comprometas de manera mensual</strong> con los cristianos que más necesitan tu ayuda.
				</span>
</div>
		    </li>
		    <li>
		      <div class="collapsible-header">		      	
		      	<h5>¿Problemas con tu donativo?</h5>
		      	<i class="material-icons">add_circle_outline</i></div>
		      <div class="collapsible-body">
		      	<span>Si te ha surgido alguna incidencia al realizar tu donativo, aquí estamos para ayudarte:<br><br>
 
				-       Llámanos: 91 725 92 12 / 93 237 37 63 (de L a V de 7.30 a 16 h)<br>
				-       Escríbenos: <strong>info@ayudaalaiglesianecesitada.org</strong><br><br>
				 
				En caso de que no te podamos resolver la incidencia en este momento, puedes donar haciendo una transferencia bancaria a estos números de cuenta:<br><br>
				 
				Banco Popular ES12 0075 0080 1706 0166 7548<br>
				La Caixa ES21 2100 2415 42 0200140293<br>
				Santander ES74 0049 2674 59 2814342966<br>
				Bankia ES87 2038 1115 24 6000703295<br><br>
				 
				No olvides especificar en el concepto, tu nombre y DNI y el destino de tu donativo, si es para una campaña en concreto.<br>

				<strong>¿Quieres que sea periódico pero que no sea mensual?</strong><br><br>

				Si quieres hacer un donativo periódico pero que no sea mensual, sino trimestral, semestral o anual puedes poner en contacto con nosotros a través del teléfono 91 725 92 12 o por correo electrónico a info@ayudaalaiglesianecesitada.org
				</span>
				</div>
		    </li>
		  </ul>		
	</div>
<!-- FIN SECCION ACORDION-->

<!--SECCION INFORMATIVA DE DONACIONES-->
	<div class="info_donaciones text-center">
		<p>Tus donativos se registran a nombre de Ayuda a la Iglesia Necesitada, con número de identifación fiscal <span>R-2800175-H y domicilio en C/ Ferrer del Río, 14. 28028 Madrid</span></p>
		<p>Puedes contactar con nosotros, llamando a: 91 725 92 12 / 93 237 37 63 o escribiendo a: <a href="mailto:info@ayudaalaiglesianecesitada.org?subject=Contacto" "email me">info@ayudaalaiglesianecesitada.org</a></p>
	</div>
</main>