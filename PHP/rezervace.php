<?php
// Retrieve and sanitize the data
$name = htmlspecialchars(trim($_POST['jmeno']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST['tel']));
$date = htmlspecialchars(trim($_POST['date']));
$time = htmlspecialchars(trim($_POST['cas']));
$people = intval(trim($_POST['people']));

// Prepare the response
$response = ['status' => 'success', 'message' => 'Reservation created successfully. We are looking forward to it!'];

// Set the correct content type and encode the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>