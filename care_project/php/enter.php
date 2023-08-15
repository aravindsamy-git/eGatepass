<?php
session_start();

$servername = "localhost";
$username = "root";
$pass = ""; 
$dbname = "care_epass"; 

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['login_id']) && isset($data['password']) && isset($data['role'])) {
        $login_id = $data['login_id'];
        $password = $data['password'];
        $role = $data['role'];

        // Additional checks to validate if the fields are not empty
        if (empty($login_id) && empty($password) && empty($role)) {
            echo json_encode(array('success' => false, 'message' => 'Please enter Login_id, Password, and Choose a role.'));
            exit;
        } elseif (empty($login_id) && empty($password)) {
            echo json_encode(array('success' => false, 'message' => 'Please enter Login_id and Password.'));
            exit;
        } elseif (empty($login_id)) {
            echo json_encode(array('success' => false, 'message' => 'Please enter Login_id.'));
            exit;
        }elseif (empty($role) && empty($password)) {
            echo json_encode(array('success' => false, 'message' => 'Please enter Password and Choose a role.'));
            exit;
        }elseif (empty($login_id) && empty($role)) {
            echo json_encode(array('success' => false, 'message' => 'Please enter Login_id and Choose a role.'));
            exit;
        }elseif (empty($password)) {
            echo json_encode(array('success' => false, 'message' => 'Please enter Password.'));
            exit;
        }elseif (empty($role)) {
            echo json_encode(array('success' => false, 'message' => 'Please enter Choose a role.'));
            exit;
        }
        
        $conn = new mysqli($servername, $username, $pass, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        if ($role === 'student') {
            $sql = "SELECT rollno, password1, username, batch, dept, h_d, phone_no FROM student_info WHERE rollno = ?";
        } else if ($role === 'admin') {
            $sql = "SELECT empid, password1 FROM admin_info WHERE empid = ?";
        } else {
            echo json_encode(array('success' => false, 'message' => 'Invalid role'));
            exit;
        }

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $login_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && $password === $user['password1']) {
            $_SESSION['user_data'] = $user;
            echo json_encode(array('success' => true, 'user_data' => $user));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Invalid login credentials'));
        }
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(array('success' => false, 'message' => 'Missing login_id, password, or role field.'));
    }
}
?>
