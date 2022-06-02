<?php

use Nullix\CryptoJsAes\CryptoJsAes;
require "CryptoJsAes.php";
function CryptoJSAesEncrypt($passphrase, $plain_text){

    // $salt = openssl_random_pseudo_bytes(256);
    // $iv = openssl_random_pseudo_bytes(16);
    // //on PHP7 can use random_bytes() istead openssl_random_pseudo_bytes()
    // //or PHP5x see : https://github.com/paragonie/random_compat

    // $iterations = 999;  
    // $key = hash_pbkdf2("sha512", $passphrase, $salt, $iterations, 64);

    // $encrypted_data = openssl_encrypt($plain_text, 'aes-256-cbc', hex2bin($key), OPENSSL_RAW_DATA, $iv);

    // $data = array("ciphertext" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "salt" => bin2hex($salt));
    // return ($data);
    // //return json_encode($data);
    $data=CryptoJsAes::encrypt($plain_text, $passphrase);
    
    return ($data);
}
//         echo "hello";
//        // Initialize cookie name
		$cookie_name = "user";
		$cookie_value =  CryptoJSAesEncrypt("soppanasund@r1", "https://sosdaily.000webhostapp.com/hemaraja/gettodayword.php");
	//	print($cookie_value);
		// Set cookie
		setcookie($cookie_name, $cookie_value);
		
		if(!isset($_COOKIES[$cookie_name])) {
		//	print("Cookie created | ");
		}
	?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="sollanguli.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
 
<link
    rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
  <style>
h1 {text-align: center;} </style>
    <title>சொல்லாங்குழி</title>
</head>
<body style="background-color:mistyrose ;">

    <h1> <span style="color:#bb67c2;">சொ</span><span style="color:#a2ff23;">ல்</span><span style="color:#25ff92;">லா</span><span style="color:#2371e2">ங்</span><span style="color:#ff77aa">கு</span><span style="color:#41ff21">ழி </span><h1>
    <div id="game-board"></div>
    <script
src="https://code.jquery.com/jquery-3.6.0.min.js"
integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin="anonymous"></script>
<!--<script src=
"https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.0/sweetalert.min.js">
  </script> -->
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 
  <!-- <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"> </script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/aes.min.js"> </script>
<script src="cryptojs-aes-format.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/enc-utf8.min.js"> </script>


<script src="sollanguli.js" type="module"></script>

</body>
</html>