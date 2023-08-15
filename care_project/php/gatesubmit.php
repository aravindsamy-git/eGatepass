<?php
session_start();

$servername = "localhost";
$username = "root";
$password = ""; // Replace with your database password
$dbname = "care_epass";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $Data = json_decode(file_get_contents("php://input"), true);
    error_log("Received JSON data: " . json_encode($Data));

    if (json_last_error() === JSON_ERROR_NONE) {

        if (
            isset($Data['student_rollno']) &&
            isset($Data['proposed_out_date']) &&
            isset($Data['proposed_out_time']) &&
            isset($Data['proposed_in_date']) &&
            isset($Data['proposed_in_time']) &&
            isset($Data['purpose'])
        ) {
            $rollno = $Data['student_rollno'];
            $proposedOutDate = $Data['proposed_out_date'];
            $proposedOutTime = $Data['proposed_out_time'];
            $proposedInDate = $Data['proposed_in_date'];
            $proposedInTime = $Data['proposed_in_time'];
            $purpose = $Data['purpose'];

            // Convert 12-hour format time strings to 24-hour format
            $proposedOutTime = date("H:i:s", strtotime($proposedOutTime));
            $proposedInTime = date("H:i:s", strtotime($proposedInTime));

            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "INSERT INTO egatepass_info (rollno, proposed_out_date, proposed_in_date, proposed_out_time , proposed_in_time, purpose) 
                    VALUES (?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
                "ssssss",
                $rollno,
                $proposedOutDate,
                $proposedInDate,
                $proposedOutTime,
                $proposedInTime,
                $purpose
            );
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $response = array('success' => true, 'message' => 'Gate pass request is submitted successfully!');
                echo json_encode($response);
            } else {
                $response = array('success' => false, 'message' => 'Error submitting gate pass request.');
                echo json_encode($response);
            }

            $stmt->close();
            $conn->close();
        } else {
            $response = array('success' => false, 'message' => 'Incomplete data received.');
            echo json_encode($response);
        }
    } else {
        $response = array('success' => false, 'message' => 'Invalid JSON data received.');
        echo json_encode($response);
    }
}
?>
