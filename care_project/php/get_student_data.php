<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "care_epass";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (!isset($_SESSION['user_data'])) {
        $response = array('success' => false, 'message' => 'You are not authorized to access this page.');
        echo json_encode($response);
        exit;
    }

    $userData = $_SESSION['user_data'];
    $rollno = $userData['rollno'];


    $conn = new mysqli($servername, $username, $password, $dbname);


    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the query to fetch the student data based on the rollno
    $sql = " SELECT s.rollno, s.username , s.batch, s.dept, s.h_d, s.phone_no, a.username as admin_username , s.gender FROM student_info s JOIN admin_info a ON s.incharge = a.empid WHERE s.rollno = ?";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $rollno);
    $stmt->execute();
    $result = $stmt->get_result();
    $studentData = $result->fetch_assoc();


    $stmt->close();
    $conn->close();

    if ($studentData) {
        $response = array('success' => true, 'data' => $studentData);
        echo json_encode($response);
    } else {
        $response = array('success' => false, 'message' => 'Student data not found.');
        echo json_encode($response);
    }
}
?>
