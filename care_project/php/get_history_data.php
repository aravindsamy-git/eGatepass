<?php
session_start();

$servername = "localhost";
$username = "root";
$pass = ""; 
$dbname = "care_epass"; 

$conn = new mysqli($servername, $username, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the user's rollno from the request parameter
if (isset($_GET['rollno'])) {
    $rollno = $_GET['rollno'];
    
    // Fetch data from the database for the specific user
    $sql = "SELECT * FROM egatepass_info WHERE rollno = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $rollno);
    $stmt->execute();
    $result = $stmt->get_result();

    // Create an array to hold the data
    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Add each row of data to the $data array
            $data[] = $row;
        }
    } else {
        // If no data found, set a flag in the $data array to indicate no history
        $data[] = array('no_data' => true);
    }

    // Close the database connection
    $conn->close();

    // Send the data as JSON response
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // If the rollno parameter is not set in the request, send an empty response
    $response = array('no_data' => true);
    echo json_encode(array($response));
}
?>
