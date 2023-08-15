<?php
session_start();

$servername = "localhost";
$username = "root";
$password = ""; // Replace with your database password
$dbname = "care_epass";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $Data = json_decode(file_get_contents("php://input"), true);
    error_log("Received JSON data: " . json_encode($Data));

    $egatepassId = $Data['id'];
    $dateTime = $Data['dateTime'];
    $type = $Data['action'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($type === 'in') {
        $sql = "UPDATE egatepass_info SET arrival_time = ?, arrival = 'yes' WHERE id = ? AND arrival_time IS NULL";
    } else {
        $sql = "UPDATE egatepass_info SET depature_time = ? WHERE id = ? AND depature_time IS NULL";
    }

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si" , $dateTime, $egatepassId);
    
    if ($stmt->execute()) {
        if ($conn->affected_rows > 0) {
            $response = array('success' => true, 'message' => 'Updated successfully.');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'No records were updated.');
            echo json_encode($response);
        }
    } else {
        $response = array('success' => false, 'message' => 'Update failed.');
        echo json_encode($response);
    }

    $stmt->close();
    $conn->close();

} else {
    $response = array('success' => false, 'message' => 'Invalid request method.');
    echo json_encode($response);
}
?>
