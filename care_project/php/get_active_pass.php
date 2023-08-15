<?php
// Start the session to access the user data
session_start();

// Assuming you have a database connection established
// Replace the database credentials with your actual values
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "care_epass";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the user data from the session
$user_data = $_SESSION['user_data'];

// Retrieve the empid from the user data
$empid = $user_data['empid'];

$arrival = "no";

// SQL query
$sql = "SELECT eGatepass_info.*, student_info.username, student_info.batch, student_info.dept, student_info.h_d, student_info.phone_no
        FROM eGatepass_info
        JOIN student_info ON eGatepass_info.rollno = student_info.rollno
        WHERE egatepass_info.status = 'approved' 
        AND student_info.incharge = '$empid'
        AND egatepass_info.arrival = '$arrival'
        AND CONCAT(egatepass_info.proposed_in_date, ' ', egatepass_info.proposed_in_time) >= NOW()";

// Execute the query

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        // Add each row to the data array
        $data[] = $row;
    }

    // Convert the data array to JSON format
    $json_data = json_encode($data);

    // Send the JSON response back to the JavaScript function
    echo $json_data;
} else {
    // If no pending eGatepass data found, send an empty JSON array
    echo "[]";
}

// Close the database connection
$conn->close();
?>
