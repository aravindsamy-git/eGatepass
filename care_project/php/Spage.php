<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "care_epass";

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the entryId from the query parameters
$entryId = $_GET['id'];

// Prepare the SQL query to fetch the data from the database using the entryId
$sql = "SELECT e.*, s.rollno, s.username, s.batch, s.dept, s.h_d, s.phone_no, a.username AS admin_username
        FROM egatepass_info e
        JOIN student_info s ON e.rollno = s.rollno
        JOIN admin_info a ON s.incharge = a.empid
        WHERE e.id = ?";

// Prepare and bind the parameter to the query
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $entryId);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Check if a row is found
if ($result->num_rows > 0) {
    // Fetch the data from the row
    $data = $result->fetch_assoc();

    // Close the statement and connection
    $stmt->close();
    $conn->close();

    // Return the data as JSON
    echo json_encode($data);
} else {
    // If no data is found, return an empty object
    echo json_encode([]);
}
?>
