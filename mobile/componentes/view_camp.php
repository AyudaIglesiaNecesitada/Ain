<?php

if (isset($_GET['donativo'])) {
	$donativo_id = $_GET['donativo'];
}else{
	$donativo_id = '';
} 
  $campana = array(
	'post_type' => 'campana',
	'post_status' => 'publish',
	'ignore_sticky_posts' => true,
	'posts_per_page' => 6,
	'order' => 'DESC',
	'orderby' => 'date',
	'meta_query' => array(
			  array(
				  'key'     => 'state_camp',
				  'value'   => 1,
			  ),
		  ),  
);  ?>

<style>
	.info_tarjeta_hover {
		z-index: 1!important;
		width: 86%!important;
		top: 0!important;
	}
	.content_cvc {
		width: 30%!important;
		position: absolute;
		margin-top: 2.1em!important;
	}
	.info_cvv {
		width: 70%!important;
		position: relative;
		float: right!important;
	}
	.stipeErrorMessage {
		color: #b81325!important;
	}
	.spin-loader {
		-webkit-animation:spin 3s linear infinite;
		-moz-animation:spin 3s linear infinite;
		animation:spin 3s linear infinite;
	}
	@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
	@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
	@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
	.validacion-errors {
		color: #b81325!important;
    font-size: 12px!important;
    line-height: 24px!important;
		display: block!important;
		text-align: center!important;
	}
	.dnone {
		display: none!important;
	}
	.field {
		box-sizing: border-box;
    font-weight: 400;
    border-radius: 5px;
    color: #32315E;
    border: 1px solid #959595;
    outline: none;
    line-height: 48px;
    cursor: text;
    padding: 14px;
    height: 44px;
    flex: 1;
    width: 90%;
    position: absolute;
	}
	.tarjeta_credito_label1 {
		margin-top: 0!important;
	}
	.tarjeta_credito_label {
		margin-top: 1em!important;
	}
	.tarjeta_credito_label2 {
		margin-top: 0!important;
	}
	.cvv-container {
		margin-top: 3em!important;
		margin-bottom: 4em!important;
	}
	.brand {
		float: right;
    padding-top: 4px;
    padding-right: 11px;
    font-size: 25px;
		color: #607D8B;
	}
	@media only screen and (min-width: 500px) and (max-width: 1024px) {
		.field {
			width: 95%!important;
		}
	}
</style>

<div class="container-companas">
	<!---LISTA/MODULO---->
	<div class="col m12 s12 header_tipo_ayuda">
		<p class="titulos_donaciones">Selecciona el tipo de ayuda:</p>
		<span id="view_module" class="mod_active">
			<i class="material-icons">view_module</i>
		</span>
		<span id="view_list">
			<i class="material-icons">view_list</i>
		</span>
	</div>
	<!---MODULO--->

	<div class="content_tipo_ayuda" id="modulo">
						<?php 
                                $campana_data = new WP_Query($campana); 
                        ?>
                        <?php if (empty($donativo_id)){ ?>
                        <?php 
                                if($campana_data->have_posts()):

                                while($campana_data->have_posts()):
                                    $campana_data->the_post();
                                    $activo  = get_field('state');
									$img_campana  = get_field('imagen_destacada');
									$utm_campaign_mod = get_field('utm_campaign');
									$utm_source_mod = get_field('utm_source');
									$utm_medium_mod = get_field('utm_medium');   
									$utm_content_mod = get_field('utm_content');
									$utm_term_mod = get_field('utm_term');
									$appeal_mod = get_field('appeal');
									$fund_mod = get_field('fund');
                         ?> 

        <?php if ($activo == 1) { ?>                     
		<article class="col s6" id="<?php echo get_the_ID() ?>">
			<img src="<?php echo $img_campana ?>" alt="">
			<div class="info_content">
				<span>
					<i class="material-icons">check_circle</i>
				</span>
				<p><?php echo wp_trim_words (get_the_title(),15)?></p>
				<span class="utm_campaign_mod hide"><?php echo $utm_campaign_mod; ?></span>
				<span class="utm_source_mod hide"><?php echo $utm_source_mod; ?></span>
				<span class="utm_medium_mod hide"><?php echo $utm_medium_mod; ?></span>
				<span class="utm_content_mod hide"><?php echo $utm_content_mod; ?></span>
				<span class="utm_term_mod hide"><?php echo $utm_term_mod; ?></span>
				<span class="appeal_mod hide"><?php echo $appeal_mod; ?></span>
				<span class="fund_mod hide"><?php echo $fund_mod; ?></span>
			</div>
		</article>
		<?php } ?>
     <?php  
      	endwhile;
        wp_reset_postdata();
        endif;
	?>	
	<?php } ?>	
	</div>

	<!---LISTA---->
	<div id="lista">
						<?php 
                                $campana_data = new WP_Query($campana); 
                        ?>
                        <?php if (empty($donativo_id)){ ?>
                        <?php 
                                if($campana_data->have_posts()):

                                while($campana_data->have_posts()):
                                    $campana_data->the_post();
                                    $activo  = get_field('state');
									$img_campana  = get_field('imagen_destacada');
									$utm_campaign_mod = get_field('utm_campaign');
									$utm_source_mod = get_field('utm_source');
									$utm_medium_mod = get_field('utm_medium');   
									$utm_content_mod = get_field('utm_content');
									$utm_term_mod = get_field('utm_term');
									$appeal_mod = get_field('appeal');
									$fund_mod = get_field('fund');
                         ?>
        <?php if ($activo == 1) { ?>
		<article class="col" id="<?php echo get_the_ID() ?>">
			<div class="check_img_content col">
				<div class="cnt_img">
					<img src="<?php echo $img_campana ?>" alt="">
					<div class="info_content">
						<span>
							<i class="material-icons">check_circle</i>
						</span>
					</div>
				</div>
			</div>
			<div class="info_content_list col">
				<p><?php echo wp_trim_words (get_the_title(),15,'...') ?></p>
				<span class="utm_campaign_mod hide"><?php echo $utm_campaign_mod; ?></span>
				<span class="utm_source_mod hide"><?php echo $utm_source_mod; ?></span>
				<span class="utm_medium_mod hide"><?php echo $utm_medium_mod; ?></span>
				<span class="utm_content_mod hide"><?php echo $utm_content_mod; ?></span>
				<span class="utm_term_mod hide"><?php echo $utm_term_mod; ?></span>
				<span class="appeal_mod hide"><?php echo $appeal_mod; ?></span>
				<span class="fund_mod hide"><?php echo $fund_mod; ?></span>
			</div>
		</article>
		<?php } ?>
     <?php  
      	endwhile;
        wp_reset_postdata();
        endif;
	?>
	<?php } ?>			
	</div>
	<div class="s12 col">
		<span class="validacion vali_campana hide">
			<i class="material-icons">info_outline</i>Seleccione una campaña a donar</span>
	</div>

	<div class="col s12 right-align">
		<a href="#!" class="waves-effect waves-light btn-large btn_principal" title="" id="btn_continuar_1">CONTINUAR</a>
	</div>
</div>
<div class="container-principal">

	<!-----FORMULARIO DATOS PERSONALES-->

	<div id="form_datos_personales" class="col">
	<?php 	echo $id_camp_seleccionada; ?>
		<p class="titulos_donaciones">Datos personales:</p>
		<div class="row">
			<form class="col s12">
				<div class="row">
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
	            $utm_campaign = get_field('utm_campaign');
                $utm_source = get_field('utm_source');
				$utm_medium = get_field('utm_medium');   
				$utm_content = get_field('utm_content');
				$utm_term = get_field('utm_term');
				$appeal = get_field('appeal');
				$fund = get_field('fund');									 		  

           ?>					
					<div class="input-field col s12 hide">
						<div class="col label_form_datos_personales">
							<span class="label_form">*UTM</span>
						</div>
						<?php           	
						if (isset($_GET['utm_source'])) {
							$utm_source_url = $_GET['utm_source'];
						}if(isset($_GET['utm_medium'])){
							$utm_medium_url = $_GET['utm_medium'];
						}if(isset($_GET['utm_campaign'])){
							$utm_campaign_url = $_GET['utm_campaign'];
						}if(isset($_GET['utm_term'])){
							$utm_term_url = $_GET['utm_term'];
						}if(isset($_GET['utm_content'])){
							$utm_content_url = $_GET['utm_content'];
						}		
						?>
						<div class="col datos_basicos">
						    <input id="utm_campaign" type="text" value="<?php if(!empty($utm_campaign_url)){echo $utm_campaign_url;}else{echo $utm_campaign;}?>">
							<input id="utm_source" type="text" value="<?php if(!empty($utm_source_url)){echo $utm_source_url;}else{echo $utm_source;} ?>">
							<input id="utm_medium" type="text" value="<?php if(!empty($utm_medium_url)){echo $utm_medium_url;}else{echo $utm_medium;} ?>">
							<input id="utm_content" type="text" value="<?php if(!empty($utm_content_url)){echo $utm_content_url;}else{echo $utm_content;} ?>">
							<input id="utm_term" type="text" value="<?php if(!empty($utm_term_url)){echo $utm_term_url;}else{echo $utm_term;} ?>">

						</div>
					</div>
					<div class="input-field col s12 hide">
						<div class="col label_form_datos_personales">
							<span class="label_form">*Appeal</span>
						</div>
						<div class="col datos_basicos">
							<input id="appeal" type="text" value="<?php echo $appeal ?>">
						</div>
					</div>
					<div class="input-field col s12 hide">
						<div class="col label_form_datos_personales">
							<span class="label_form">*Fund</span>
						</div>
						<div class="col datos_basicos">
							<input id="fund" type="text" value="<?php echo $fund ?>">
						</div>
					</div>
	          <?php        
      		  endwhile;
              endif;
               ?>
               <?php }else{



               	?>	
					<div class="input-field col s12 hide">
						<div class="col label_form_datos_personales">
							<span class="label_form">*UTM</span>
						</div>
						<div class="col datos_basicos">
							<input id="utm_campaign" type="text" value="" disabled>
							<input id="utm_source" type="text" value="" disabled>
							<input id="utm_medium" type="text" value="" disabled>
							<input id="utm_content" type="text" value="" disabled>
							<input id="utm_term" type="text" value="" disabled>
						</div>
					</div>
					<div class="input-field col s12 hide">
						<div class="col label_form_datos_personales">
							<span class="label_form">*Appeal</span>
						</div>
						<div class="col datos_basicos">
							<input id="appeal" type="text" value="<?php echo $appeal ?>" disabled>
						</div>
					</div>
					<div class="input-field col s12 hide">
						<div class="col label_form_datos_personales">
							<span class="label_form">*Fund</span>
						</div>
						<div class="col datos_basicos">
							<input id="fund" type="text" value="<?php echo $fund ?>" disabled>
						</div>
					</div>
				<?php } ?> 	
				<div class="input-field col s12">
						<div class="col datos_basicos">
							<select id="tratamiento">
							<option value="" disabled selected>Seleccionar tratamiento</option>
							
							<option value="D.">Don</option>
							<option value="DA.">Doña</option>
							</select>
						</div>
						<div class="col vali_datos_basicos">
							<span class="validacion hide vali_nombre">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
					</div>				               																				
					<div class="input-field col s12">
						<div class="col datos_basicos">
							<input id="nombre" type="text" placeholder="*Nombre:">
						</div>
						<div class="col vali_datos_basicos">
							<span class="validacion hide vali_nombre">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
					</div>
					<div class="input-field col s12">
						<div class="col datos_basicos">
							<input id="apellido" type="text" placeholder="*Apellido:">
						</div>
						<div class="col vali_datos_basicos">
							<span class="validacion hide vali_apellido">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
					</div>
					<div class="input-field col s12">
						<div class="col datos_basicos">
							<input id="email" type="text" class="validate" placeholder="*Email:">
						</div>
						<div class="col vali_datos_basicos">
							<span class="validacion hide vali_email">
								<i class="material-icons">info_outline</i>Email inválido</span>
						</div>
					</div>
					<div class="input-field col s12">
						<div class="col datos_basicos">
							<input id="telefono" type="tel" placeholder="*Teléfono:">
						</div>
						<div class="col vali_datos_basicos">
							<span class="validacion hide vali_telef">
								<i class="material-icons">info_outline</i>Telefono inválido</span>
						</div>
					</div>
				</div>
				<!--AVISO-->
				<p class="aviso">Tus donativos desgravan, para ello, es necesario que completes el formulario al finalizar el proceso de donación.</p>
				<!--CHECKBOX-->
				<p class="no_desgravacion">
					<label>
						<input type="checkbox" class="filled-in" id="check_desgravacion" />
						<span>No deseo recibir certificado de desgravación para la renta.</span>
					</label>
				</p>
				<p class="donacion_anonima hide">
					<label>
						<input type="checkbox" class="filled-in" id="check_donacion_anonima" />
						<span>Deseo que mi donación sea anonima.</span>
					</label>
				</p>
				<!--RADIO BUTTONS TIPOS DE PAGO-->
				<div class="input-field tipos_pago col s12">
					<div class="col s12 domiciliacion">
						<p>
							<label>
								<input class="with-gap" name="group1" value="1" id="domi_bancaria" type="radio" />
								<span>DOMICILIACIÓN BANCARIA</span>
							</label>
						</p>
					</div>
					<div class="col s12 tarjeta">
						<p>
							<label>
								<input class="with-gap" name="group1" value="2" id="tarj_credito" type="radio" />
								<span>TARJETA DE CRÉDITO</span>
							</label>
						</p>
					</div>
				</div>

				<!--form2-->
				<section id="form_domiciliacion">
					<div class="input-field col s12">
						<div class="col label_form_datos_personales">
							<span class="label_form">*Titular:</span>
						</div>
						<div class="col datos_basicos">
							<input id="titular_domiciliacion" type="text">
						</div>
						<div class="col vali_datos_basicos">
							<span class="validacion hide vali_titular_domi">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
					</div>
					<div class="input-field col s12">
						<div class="col label_form_datos_personales">
							<span class="label_form">*IBAN:</span>
						</div>
						<div class="col datos_domiciliacion">
							<input id="iban" type="text" maxlength="4">
							<span class="validacion hide vali_iban">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
						<div class="col label_form_datos_personales">
							<span class="label_form">*Entidad</span>
						</div>
						<div class="col datos_domiciliacion">
							<input id="entidad" type="text" maxlength="4">
							<span class="validacion hide vali_entidad">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
						<div class="col label_form_datos_personales">
							<span class="label_form">*Oficina</span>
						</div>
						<div class="col datos_domiciliacion">
							<input id="oficina" type="text" maxlength="4">
							<span class="validacion hide vali_oficina">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
					</div>
					<div class="input-field col s12">
						<div class="col label_form_datos_personales">
							<span class="label_form">*D.C:</span>
						</div>
						<div class="col datos_domiciliacion">
							<input id="dc" type="text" maxlength="2">
							<span class="validacion hide vali_dc">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
						<div class="col label_numero_cuenta">
							<span class="label_form">*Número de cuenta:</span>
						</div>
						<div class="col input_numero_cuenta">
							<input id="numero_cuenta_domiciliacion" type="text" maxlength="10">
							<span class="validacion hide vali_numero_cuenta_domiciliacion">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
					</div>
				</section>


				<section id="form_tarjeta_credito">
					<div class="input-field col s12">
						<div class="col tarjeta_credito_label">
							<span class="label_form">*Titular:</span>
						</div>
						<div class="col datos_tarjeta">
							<input id="titular_tarjeta" type="text">
						</div>
						<div class="col vali_tit_card hide">
							<span class="validacion ">
								<i class="material-icons">info_outline</i>Campo Requerido</span>
						</div>
					</div>
					<div class="input-field col s12">
						<div class="col tarjeta_credito_label1">
							<span class="label_form">*Número de tarjeta:</span>
						</div>
						<div class="col datos_tarjeta">
							<span id="cardNumber" class="StripeElement field"></span>
							<span class="brand"><i class="pf pf-credit-card" id="brand-icon"></i></span>
						</div>
					</div>
					<div class="col stipeErrorMessage" id="stripeError"><span id="stripeErrorMessage"></span></div>
					<div class="input-field col s12">
						<div class="col tarjeta_credito_label1">
							<span class="label_form">*Fecha de vencimiento:</span>
						</div>
						<div class="col vencimiento_tarjeta">
							<span id="cardExpiry" class="field"></span>
						</div>
					</div>
					<div class="input-field col s12 cvv-container">
						<div class="col tarjeta_credito_label2">
							<span class="label_form">*Código de verificación:</span>
						</div>
						<div class="col content_cvc">
							<span id="cardCvc" class="field"></span>
						</div>
						<div class="col info_cvv">
							<span class="icon_info">
								<i class="material-icons">info</i>
							</span>
							<span class="validacion hide vali_cvv">
								<i class="material-icons">info_outline</i>Campo Requerido
							</span>
							<div class="info_tarjeta_hover">
								<img src="assets/img/cvv.png" alt="cvv">
								<span>Número de tres dígitos al respaldo de la tarjeta</span>
							</div>
						</div>
					</div>
				</section>
				<!--secure-->
				<div class="input-field col s12">
					<div class="col s12">
						<img src="assets/img/syma.png" alt="symantec" style="width: 150px;">
					</div>
					<div class="col s12 secure">
						<p>
							<span>
								<i class="material-icons">lock_outline</i>
							</span> Tu donación está en un ambiente seguro</p>
					</div>
				</div>

			</form>
		</div>

	</div>
	<div class="input-field col s12">
		<div class="col info_renovacion">
		      <label>
		        <input type="checkbox" class="filled-in" id="aceptar_politicas" />
		        <span class="acept_politicas">Otorgo consentimiento expreso, inequívoco e informado para el tratamiento  de mis datos personales de conformidad con las  finalidades detalladas  en la <a target="_blank" href="https://www.ayudaalaiglesianecesitada.org/politica-de-privacidad/"> Política de Privacidad </a>con la que estoy conforme.</span>
		      </label>
				<span class="validacion hide vali_politicas">
					<i class="material-icons">info_outline</i>Aceptar Políticas de Privacidad
				</span>		      
		    </p>						        			
		</div>				                            
	</div>	
	<div class="col s12 right-align">
		<a href="#!" class="waves-effect waves-light btn-large btn_principal" title="" id="btn_continuar">CONTINUAR</a>
		<span class="validacion-errors dnone">
			<i class="material-icons">info_outline</i>Ocurrio un error, intente de nuevo
		</span>
	</div>
</div>