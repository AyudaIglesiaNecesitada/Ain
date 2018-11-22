<style>
	.validacion-errors {
		color: #b81325!important;
    font-size: 12px!important;
    line-height: 24px!important;
		display: block!important;
	}
	.dnone {
		display: none!important;
	}
	.spin-loader {
		-webkit-animation:spin 3s linear infinite;
		-moz-animation:spin 3s linear infinite;
		animation:spin 3s linear infinite;
	}
	@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
	@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
	@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5LR7WFB');</script>
<!-- End Google Tag Manager -->
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5LR7WFB"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<main class="container" id="content_main">
	<!--SECCION DONATIVOS-->
	<div id="content_info">
		<h5 class="title_gracias" id="title_no_existe">Por favor <span class="nombre_donante"></span>, <span id="client_exist"></span>completa los siguientes datos para recibir el certificado de desgravación fiscal.</h5>
		<h5 class="title_gracias hide" id="title_no_existe">Por favor </h5>

	  <!--RADIO BUTTONS INDIVIDUAL / ORGANIZACION-->
	<div class="row">
        <div class="input-field tipos_pago col s7">
          <div class="col m6 s12 individual">
		    <p>
		      <label>
		        <input class="with-gap" name="tipo" id="desgra_individual" value="1" type="radio"  />
		        <span>INDIVIDUAL</span>
		      </label>
		    </p>		          	
          </div>
          <div class="col m6 s12 organizacion">
		    <p>
		      <label>
		        <input class="with-gap" name="tipo" id="desgra_organizacion" value="2" type="radio"  />
		        <span>ORGANIZACIÓN</span>
		      </label>
		    </p>
          </div>                  
        </div>
	</div>	        
	 <!--FORM DESGRAVACIÓN INDIVIDUAL-->
	<form class="col s12" id="form_desgravacion_individual">	  
		<div class="row">    
	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*NIF:</span>
	          </div>
	          <div class="col datos">
	          	<input id="nif" type="text" maxlength="9">
	          	<span class="validacion vali_nif hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>
	          </div>
	          <div class="col datos float-right">
		          	  <!-- Switch -->
				  <div class="switch switch_content float-right">
				    <label>
				      <input type="checkbox" id="modificar_datos_individual">
				      <span class="lever">Modificar datos</span>
				    </label>
				  </div>
	          </div>	          	                            
	        </div>	
	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Nombre:</span>
	          </div>
	          <div class="col datos border-none">
	          	<input id="nombre" type="text" disabled>
	          	<span class="validacion vali_nombre hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">*Apellidos:</span>
	          </div>
	          <div class="col datos border-none">
	          	<input id="apellido" type="text" disabled>
	          	<span class="validacion vali_apellido hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
	          </div> 	                            
	        </div>
	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Email:</span>
	          </div>
	          <div class="col datos border-none">
	          	<input id="email" type="email" disabled>
	          	<span class="validacion vali_email hide">
					<i class="material-icons">info_outline</i>Email inválido
				</span>	          	
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">*Teléfono:</span>
	          </div>
	          <div class="col datos border-none">
	          	<input id="telefono" type="tel" disabled>
	          	<span class="validacion vali_telefono hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
	          </div> 	                            
	        </div>


	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*País:</span>
	          </div>
	          <div class="col datos">
			    		<select id="pais">
			    		</select>	          	
	        	</div>
						<div class="col label_form_desgravacion text-right data_hide">
	          	<span class="label_form">*Tipo de vía:</span>
	          </div>
	          <div class="col datos tipo_via_individual data_hide">
							<select id="tipo_via">
								<option value="" disabled selected>Seleccionar</option>
								<option value="Avenidad">Avenida</option>
								<option value="Calle">Calle</option>
								<option value="Callejón">Callejón</option>
								<option value="Camino">Camino</option>
								<option value="Carretera">Carretera</option>
								<option value="Glorieta">Glorieta</option>
								<option value="Pasaje">Pasaje</option>
								<option value="Paseo">Paseo</option>
								<option value="Plaza">Plaza</option>
								<option value="Poligono">Poligono</option>
								<option value="Rambla">Rambla</option>
								<option value="Residencia">Residencia</option>
								<option value="Ronda">Ronda</option>
								<option value="Travesía">Travesía</option>
								<option value="Urbanización">Urbanización</option>
								<option value="Vía">Vía</option>
							</select>
	          	<span class="validacion vali_tipo_via hide">
								<i class="material-icons">info_outline</i>Campo Requerido
							</span>			    	          								          	                            
	      		</div>
					</div>	

	        <div class="input-field col s12 data_hide">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Nombre de vía:</span>
	          </div>
	          <div class="col datos">
	          	<input id="nombre_via" type="text">
	          	<span class="validacion vali_nombre_via hide">
									<i class="material-icons">info_outline</i>Campo Requerido
							</span>	          	
	          </div>

	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">Resto de vía:</span>
	          </div>
	          <div class="col datos">
	          	<input id="resto_via" type="text">          	
	          </div> 						 	                            
	        </div>



	        <div class="input-field col s12 data_hide">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Número:</span>
	          </div>
	          <div class="col numero_cp">
	          	<input id="numero" type="tel">
	          	<span class="validacion vali_numero hide">
					<i class="material-icons">info_outline</i>Requerido
				</span>	          	
	          </div>	        	
	          <div class="col label_form_desgravacion_piso_cp text-right">
	          	<span class="label_form">Piso:</span>
	          </div>
	          <div class="col datos_ubicacion">
	          	<input id="piso" type="text">
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">Letra:</span>
	          </div>
	          <div class="col datos_ubicacion">
	          	<input id="letra" type="text">
						</div>
	          <div class="col label_form_desgravacion_piso_cp text-right">
	          	<span class="label_form">*CP:</span>
	          </div>
	          <div class="col numero_cp">
	          	<input id="cp" type="number">
	          	<span class="validacion vali_cp hide">
					<i class="material-icons">info_outline</i>Requerido
				</span>	          	
	          </div>						 	                            
	        </div>
	        <div class="input-field col s12 data_hide">        	
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Provincia / Region</span>
	          </div>
	          <div class="col datos_ubicacion_pro_ciu provincia">
			    <select id="provincia">
			    </select>
	          	<span class="validacion vali_provincia hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>			    	
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">*Localidad / Ciudad</span>
	          </div>
	          <div class="col datos_ubicacion_pro_ciu ciudad">
			    <select id="ciudad">
			    </select>
	          	<span class="validacion vali_ciudad hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>			    	
	          </div> 	                            
	        </div>
	        <div class="input-field col s12 data_hide">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">Fecha de nacimiento:</span>
	          </div>
	          <div class="col datos">
	          	<input type="date" id="birth_date" class="datepicker" placeholder="Fecha de nacimiento">
	          </div>
	          <div class="col m5 s12">
	          	<span class="label_form">Rezaremos por tí el día de tu cumpleaños</span>
	          </div> 	                            
	        </div>
	        <div class="input-field col s12">
	        	<div class="col info_renovacion">
						<div class="renoval">
	        		<p class="dnone">Puntual / Periódico: Fecha de renovación mensual: <span class="renovalDate"></span></p>
						</div>
					<p class="recordatorio">Recuerda que todos los donativos a Ayuda a la Iglesia Necesitada, desgravan hasta un 75%.</p>
				    <p>
				      <label>
				        <input type="checkbox" class="filled-in" id="testamentos" />
				        <span class="acept_politicas">Deseo recibir información sobre<a target="_blank" href=" https://www.ayudaalaiglesianecesitada.org/colabora/herencias-y-legados/"> Testamentos </a></span>
				      </label>
				    </p>					
<!-- 				    <p>
				      <label>
				        <input type="checkbox" class="filled-in" id="aceptar_politicas_individual" />
				        <span class="acept_politicas">Otorgo consentimiento expreso, inequívoco e informado para el tratamiento  de mis datos personales de conformidad con las  finalidades detalladas  en la <a href="" title=""> Política de Privacidad </a>con la que estoy conforme.</span>				        
				      </label>					      
				    </p>
					<span class="validacion hide vali_politicas_individual">
						<i class="material-icons">info_outline</i>Aceptar Políticas de Privacidad
					</span>	 -->			    						        			
	        	</div>				                            
	        </div>		        
		</div>
	</form>

<!--FORM DE DESGRAVACIÓN ORGANIZACION-->
	<form class="col s12" id="form_desgravacion_organizacion">
		<div class="row">
	        <div class="input-field col s12">
	          <div class="col datos float-right">
		          	  <!-- Switch -->
				  <div class="switch switch_content float-right">
				    <label>
				      <input type="checkbox" id="modificar_datos_organizacion">
				      <span class="lever">Modificar datos</span>
				    </label>
				  </div>
	          </div>	                            
	        </div>				
	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Nombre de la organización:</span>
	          </div>
	          <div class="col nombre_empresa">
	          	<input id="nombre_empresa" type="text">
	          	<span class="validacion vali_nombre_empresa hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
	          </div>	                            
	        </div>	
	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*CIF:</span>
	          </div>
	          <div class="col datos">
	          	<input id="cif" type="text" maxlength="9">
	          	<span class="validacion vali_cif hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">Nombre Persona contacto:</span>
	          </div>
	          <div class="col datos">
	          	<input id="nombre_per_contacto" type="text" disabled>
	          </div> 	                            
	        </div>
	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Email:</span>
	          </div>
	          <div class="col datos">
	          	<input id="email_empresa" type="email" disabled>
	          	<span class="validacion vali_email_empresa hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">*Teléfono:</span>
	          </div>
	          <div class="col datos">
	          	<input id="telefono_empresa" type="tel" disabled>
	          	<span class="validacion vali_telefono_empresa hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
	          </div> 	                            
	        </div>
	        <div class="input-field col s12">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*País:</span>
	          </div>
	          <div class="col datos">
			    <select id="pais_organizacion">
			    </select>	          	
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">*Tipo de vía:</span>
	          </div>
	          <div class="col datos tipo_via_empresa">
			    <select id="tipo_via_empresa">
			      <option value="" disabled selected>Seleccionar</option>
			      <option value="Avenidad">Avenida</option>
			      <option value="Calle">Calle</option>
			      <option value="Callejón">Callejón</option>
			      <option value="Camino">Camino</option>
			      <option value="Carretera">Carretera</option>
			      <option value="Glorieta">Glorieta</option>
			      <option value="Pasaje">Pasaje</option>
			      <option value="Paseo">Paseo</option>
			      <option value="Plaza">Plaza</option>
			      <option value="Poligono">Poligono</option>
			      <option value="Rambla">Rambla</option>
			      <option value="Residencia">Residencia</option>
			      <option value="Ronda">Ronda</option>
			      <option value="Travesía">Travesía</option>
			      <option value="Urbanización">Urbanización</option>
			      <option value="Vía">Vía</option>
			    </select>
	          	<span class="validacion vali_tipovia_empresa hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>								          	                            
	        </div>

	        <div class="input-field col s12 data_hide_organizacion">
		    	          	
	          </div>
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Nombre de vía:</span>
	          </div>
	          <div class="col datos">
	          	<input id="nombre_via_empresa" type="text">
	          	<span class="validacion vali_nombrevia_empresa hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>	          	
						</div> 
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form">Resto de vía:</span>
	          </div>
	          <div class="col datos">
	          	<input id="resto_via_empresa" type="text">          	
	          </div> 								                            
	        </div>
	        <div class="input-field col s12 data_hide_organizacion">
	          <div class="col label_form_desgravacion">
	          	<span class="label_form">*Número:</span>
	          </div>
	          <div class="col numero_cp">
	          	<input id="numero_empresa" type="text">
	          	<span class="validacion vali_numero_empresa hide">
					<i class="material-icons">info_outline</i>Requerido
				</span>	          	
	          </div>
	          <div class="col label_form_desgravacion_piso_cp">
	          	<span class="label_form float-right">Piso:</span>
	          </div>
	          <div class="col datos_ubicacion">
	          	<input id="piso_empresa" type="text">
	          </div>
	          <div class="col label_form_desgravacion">
	          	<span class="label_form float-right">Letra:</span>
	          </div>
	          <div class="col datos_ubicacion">
	          	<input id="letra_empresa" type="text">
						</div> 
	          <div class="col label_form_desgravacion_piso_cp text-right">
	          	<span class="label_form">*CP:</span>
	          </div>
	          <div class="col numero_cp">
	          	<input id="cp_empresa" type="number">
	          	<span class="validacion vali_cp_empresa hide">
					<i class="material-icons">info_outline</i>Requerido
				</span>	          	
	          </div>							           	                            
	        </div>
	        <div class="input-field col s12 data_hide_organizacion">
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form float-right">*Provincia / Región</span>
	          </div>
	          <div class="col datos_ubicacion_pro_ciu ciudad provincia_empresa">
			    <select id="provincia_organizacion">
			    </select>
	          	<span class="validacion vali_provincia_empresa hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>			    
	          </div>
	          <div class="col label_form_desgravacion text-right">
	          	<span class="label_form float-right">*Localidad / Ciudad</span>
	          </div>
	          <div class="col datos_ubicacion_pro_ciu ciudad ciudad_empresa">
			    <select id="ciudad_organizacion">
			    </select>
	          	<span class="validacion vali_ciudad_empresa hide">
					<i class="material-icons">info_outline</i>Campo Requerido
				</span>			    
	          </div> 	           	                            
	        </div>
	        <div class="input-field col s12">
	        	<div class="col info_renovacion">
						<div class="renoval">
	        		<p class="dnone">Puntual / Periódico: Fecha de renovación mensual: <span class="renovalDate"></span></p>
						</div>
					<p class="recordatorio">Recuerda que todos los donativos a Ayuda a la Iglesia Necesitada, desgravan hasta un 75%.</p>
<!-- 				    <p>
				      <label>
				        <input type="checkbox" class="filled-in" id="vali_politicas_organizacion" />
				        <span class="acept_politicas">Otorgo consentimiento expreso, inequívoco e informado para el tratamiento  de mis datos personales de conformidad con las  finalidades detalladas  en la <a href="" title=""> Política de Privacidad </a>con la que estoy conforme.</span>
				      </label>
				    </p>
					<span class="validacion  vali_politicas_organizacion hide">
						<i class="material-icons">info_outline</i>Aceptar Políticas de Privacidad
					</span>	 -->				    						        			
	        	</div>				                            
	        </div>	        		        	        	        	        			
		</div>
	</form>	 
	<div class="col s12 right-align">
	 		<a class="waves-effect waves-light btn-large btn_principal" title="" id="btn_enviar">ENVIAR</a>
			 <span class="validacion-errors dnone">
					<i class="material-icons">info_outline</i>Ocurrio un error, intente de nuevo
				</span>
	 </div> 
	</div>
	<!--FIN SECCION DONATIVOS-->
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

</main>