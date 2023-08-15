<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
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

    // Get the ticket_id and status from the POST request
    $ticketId = $_POST['ticket_id'];
    $status = $_POST['status'];


    // Prepare the SQL statement with placeholders
    $sql = "UPDATE egatepass_info SET status = ? WHERE id = ?";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameters to the prepared statement as strings
        $stmt->bind_param("si", $status, $ticketId);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Status updated successfully";
        } else {
            echo "Error updating status: " . $stmt->error;
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }

    // Close the database connection
    $conn->close();
}
?>
