<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

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
    $arrival = "arrived";

    $sql = "UPDATE egatepass_info SET arrival = ? WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameters to the prepared statement as strings
        $stmt->bind_param("si", $arrival, $ticketId);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Arrival updated successfully";
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