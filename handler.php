<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/*
Tested working with PHP5.4 and above (including PHP 7 )
*/
require_once './vendor/autoload.php';
use FormGuide\Handlx\FormHandler;
$pp = new FormHandler();
$validator = $pp->getValidator();
$validator->fields(['name','organization','designation','email','phone'])->areRequired()->maxLength(50);
$validator->field('email')->isEmail();
$validator->field('message')->maxLength(6000);

$mailer = $pp->getMailer();

//Using Aamazon AWS SES SMTP account
$mailer->IsSMTP();
$mailer->SMTPAuth   = true;
$mailer->SMTPSecure = "tls";
$mailer->Host       = "mail.office365.com";
$mailer->Username   = "smtp-relay@v2solutions.com";
$mailer->Password   = "\$En*2qosmz&#";
$mailer->Port = 587;   

$mailer->setFrom('smtp-relay@v2solutions.com', 'Info');
    
//$pp->sendEmailTo('riya@yopmail.com'); // ← Your email here
$pp->sendEmailTo(['pradeep.jadhav@v2solutions.com','prasad.chaugule@v2solutions.com']); // ← Your email here
//$pp->sendEmailTo(['niladri.panigrahi@v2solutions.com','info@v2solutions.com']); // ← Your email here


echo $pp->process($_POST);

