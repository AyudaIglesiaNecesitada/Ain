<?php 
define('WP_USE_THEMES', false);

/** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/../wp-blog-header.php' );
status_header(200);
/*header("HTTP/1.1 200 OK");
header("Status: 200 All rosy");*/

  $posts = get_posts(array(
    'post_type' => 'drm',
    'post_status' => 'publish',
    'posts_per_page' => 1,
  ));
  
  $user = "";
  $pass = "";
  $url = "";
  $test_url = "";

  if($posts){
  
    foreach($posts as $post)
    {
      $user = get_field('user');
      $pass = get_field('pass');
      $url = get_field('end_point');
      $test_url = get_field('test_url');
      
    }
  
  }

  //echo "Waiting...";
  //echo 'User='.$user.' Pass='.$pass.' url='.$url.' test='.$test_url;
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");
  $method = $_SERVER['REQUEST_METHOD'];
  if($method == "OPTIONS") {
      die();
  }

  if($_POST['op'] == 'at') {
    $curl = curl_init($url.'donation_via_landing_page/authenticate');
    $authData = array("front" => "landing-page", "user" => $user, "password" => $pass);
    $jsonAuth = json_encode($authData);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonAuth);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);
    if(curl_error($curl)) {
        echo 'error='.curl_error($curl);
    } else {
        curl_close($curl);
        echo $result;
    }
  }

  if($_POST['op'] == 'donc') {
    $jwtToken = $_POST['tk'];

    $frequency = $_POST['frequency'];
    $amount = $_POST['amount'];
    $campaign = $_POST['campaign'];
    $campaignId = $_POST['campaign_id'];
    $appeal = $_POST['appeal'];
    $fund = $_POST['fund'];
    $urlLanding = $_POST['url_landing'];
    $treatment = $_POST['treatment'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $taxExemption = $_POST['tax_exemption'];
    $anonymous = $_POST['anonymous'];
    $paymentType = $_POST['payment_type'];
    $stripeToken = $_POST['stripe_token'];
    //UTMs
    $utmCampaign = $_POST['utm_campaign'];
    $utmSource = $_POST['utm_source'];
    $utmMedium = $_POST['utm_medium'];
    $utmContent = $_POST['utm_content'];
    $utmTerm = $_POST['utm_term'];
    //UTMs END
    $personalDataAuth = $_POST['personal_data_auth'];

    $data = array(
        'front' => 'landing-page',
        'frequency' => $frequency,
        'amount' => $amount,
        'campaign' => $campaign,
        'campaign_id' => $campaignId,
        'appeal' => $appeal,
        'fund' => $fund,
        'url_landing' => $urlLanding,
        'treatment' => $treatment,
        'name' => $name,
        'surname' => $surname,
        'email' => $email,
        'phone' => $phone,
        'tax_exemption' => $taxExemption,
        'anonymous' => $anonymous,
        'payment_type' => $paymentType,
        'stripe_token' => $stripeToken,
        'direct_debit' => array(
            'b_owner' => '',
            'b_iban' => '',
            'b_bank' => '',
            'b_office' =>  '',
            'b_dc' => '',
            'b_number' => ''
        ),
        'utm' => array(
            'utm_campaign' => $utmCampaign,
            'utm_source' => $utmSource,
            'utm_medium' => $utmMedium,
            'utm_content' => $utmContent,
            'utm_term' => $utmTerm
        ),
        'personal_data_auth' => $personalDataAuth
    );

    $jsonDonation = json_encode($data);
    $curl = curl_init($url.'donation_via_landing_page/add_donation');
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDonation);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("authorization: ".$jwtToken, "Content-Type:application/json"));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);
    if(curl_error($curl)) {
        echo 'error='.curl_error($curl);
    } else {
        curl_close($curl);
        echo $result;
    }
  }

  if($_POST['op'] == 'doni') {
    $jwtToken = $_POST['tk'];
  
    $frequency = $_POST['frequency'];
    $amount = $_POST['amount'];
    $campaign = $_POST['campaign'];
    $campaignId = $_POST['campaign_id'];
    $appeal = $_POST['appeal'];
    $fund = $_POST['fund'];
    $urlLanding = $_POST['url_landing'];
    $treatment = $_POST['treatment'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $taxExemption = $_POST['tax_exemption'];
    $anonymous = $_POST['anonymous'];
    $paymentType = $_POST['payment_type'];
    //DOMICILIACION DATOS
    $bOwner = $_POST['b_owner'];
    $bIban = $_POST['b_iban'];
    $bBank = $_POST['b_bank'];
    $bOffice = $_POST['b_office'];
    $bDc = $_POST['b_dc'];
    $bNumber = $_POST['b_number'];
    //DOMICILIACION DATOS END
    //UTMs
    $utmCampaign = $_POST['utm_campaign'];
    $utmSource = $_POST['utm_source'];
    $utm_medium = $_POST['utm_medium'];
    $utm_content = $_POST['utm_content'];
    $utm_term = $_POST['utm_term'];
    //UTMs END
    $personalDataAuth = $_POST['personal_data_auth'];

    $data = array(
        'front' => 'landing-page',
        'frequency' => $frequency,
        'amount' => $amount,
        'campaign' => $campaign,
        'campaign_id' => $campaignId,
        'appeal' => $appeal,
        'fund' => $fund,
        'url_landing' => $urlLanding,
        'treatment' => $treatment,
        'name' => $name,
        'surname' => $surname,
        'email' => $email,
        'phone' => $phone,
        'tax_exemption' => $taxExemption,
        'anonymous' => $anonymous,
        'payment_type' => $paymentType,
        'direct_debit' => array(
            'b_owner' => $bOwner,
            'b_iban' => $bIban,
            'b_bank' => $bBank,
            'b_office' =>  $bOffice,
            'b_dc' => $bDc,
            'b_number' => $bNumber
        ),
        'utm' => array(
            'utm_campaign' => $utmCampaign,
            'utm_source' => $utmSource,
            'utm_medium' => $utmMedium,
            'utm_content' => $utmContent,
            'utm_term' => $utmTerm
        ),
        'personal_data_auth' => $personalDataAuth
    );

    $jsonDonation = json_encode($data);
    $curl = curl_init($url.'donation_via_landing_page/add_donation');
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDonation);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("authorization: ".$jwtToken, "Content-Type:application/json"));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);
    if(curl_error($curl)) {
        echo 'error='.curl_error($curl);
    } else {
        curl_close($curl);
        echo $result;
    }
  }

  if($_POST['op'] == 'gd') {
    $jwtToken = $_POST['tk'];
    $clientID = $_POST['client_id'];
    $donationID = $_POST['donation_id'];

    $curl = curl_init($url.'donation_via_landing_page/get_client_and_donation_info');
    $data = array("front" => "landing-page", "client_id" => $clientID, "donation_id" => $donationID);
    $jsonGET = json_encode($data);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonGET);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("authorization: ".$jwtToken, "Content-Type:application/json"));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);
    if(curl_error($curl)) {
        echo 'error='.curl_error($curl);
    } else {
        curl_close($curl);
        echo $result;
    }
  }

  if($_POST['op'] == 'ds') {
    $jwtToken = $_POST['tk'];

    $clientID = $_POST['client_id'];
    $donationID = $_POST['donation_id'];
    $newClient = $_POST['new_client'];
    $updateData = $_POST['update_data'];
    $infoWills = $_POST['info_wills'];
    $personType = $_POST['person_type'];
    $nifCif = $_POST['nif_cif'];
    $identificationType = $_POST['identification_type'];
    $businessName = $_POST['business_name'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $streetType = $_POST['street_type'];
    $streetName = $_POST['street_name'];
    $number = $_POST['number'];
    $floor = $_POST['floor'];
    $aptNumber = $_POST['apt_number'];
    $streetRest = $_POST['street_rest'];
    $zipCode = $_POST['zip_code'];
    $cityId = $_POST['city_id'];
    $countryId = $_POST['country_id'];
    $birthDate = $_POST['birth_date'];
    $renewDate = $_POST['renew_date'];

    $data = array(
        'front' => 'landing-page',
        'donation_id' => $donationID,
        'new_client' => $newClient,
        'update_data' => $updateData,
        'info_wills' => $infoWills,
        'tax_exemption' => array(
            'person_type' => $personType,
            'nif_cif' => $nifCif,
            'identification_type' => $identificationType,
            'business_name' => $businessName,
            'name' => $name,
            'surname' => $surname,
            'email' => $email,
            'phone' => $email,
            'address' => $address,
            'street_type' => $streetType,
            'street_name' => $streetName,
            'number' => $number,
            'floor' => $floor,
            'apt_number' => $aptNumber,
            'street_rest' => $streetRest,
            'zip_code' => $zipCode,
            'city_id' => $cityId,
            'country_id' => $countryId,
            'birth_date' => $birthDate,
            'renew_date' => $renewDate
        )
    );

    $jsonDesgravacion = json_encode($data);
    $curl = curl_init($url.'donation_via_landing_page/tax_exemption');
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDesgravacion);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("authorization: ".$jwtToken, "Content-Type:application/json"));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);
    if(curl_error($curl)) {
        echo 'error='.curl_error($curl);
    } else {
        curl_close($curl);
        echo $result;
    }
  }

  if($_POST['op'] == 'up') {
    $jwtToken = $_POST['tk'];

    $clientID = $_POST['client_id'];
    $personType = $_POST['person_type'];  
    $businessName = $_POST['business_name'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $streetType = $_POST['street_type'];
    $streetName = $_POST['street_name'];
    $streetRest = $_POST['street_rest'];
    $number = $_POST['number'];
    $floor = $_POST['floor'];
    $aptNumber = $_POST['apt_number'];
    $zipCode = $_POST['zip_code'];
    $cityId = $_POST['city_id'];
    
    $data = array(
        'front' => 'landing-page',
        'client_id' => $clientID,
        'person_type' => $personType,
        'business_name' => $businessName,
        'name' => $name,
        'surname' => $surname,
        'email' => $email,
        'phone' => $phone,
        'address' => $address,
        'street_type' => $streetType,
        'street_name' => $streetName,
        'street_rest' => $streetRest,
        'number' => $number,
        'floor' => $floor,
        'apt_number' => $aptNumber,
        'zip_code' => $zipCode,
        'city_id' => $cityId
    );

    $jsonUpdate = json_encode($data);
    $curl = curl_init($url.'donation_via_landing_page/update_client');    
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($jsonUpdate));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("authorization: ".$jwtToken, "Content-Type:application/json"));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($curl);
    curl_close($curl);
    if(curl_error($curl)) {
        echo 'error='.curl_error($curl);
    } else {
        curl_close($curl);
        echo $result;
    }
  }
?>
