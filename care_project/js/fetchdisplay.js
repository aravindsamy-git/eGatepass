
var completedProcesses = 0; // Counter for completed processes

        // Function to show the preloader
function showPreloader() {
    document.body.classList.add("loading"); // Add the "loading" class to the body
    document.getElementById("loader-container").style.display = "flex"; // Display the loader container
}

        // Function to hide the preloader
function hidePreloader() {
    document.body.classList.remove("loading"); // Remove the "loading" class from the body
    document.getElementById("loader-container").style.display = "none"; // Hide the loader container
}

        // Function to fetch student data
function fetchStudentData() {
    showPreloader();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../php/get_student_data.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                var studentData = response.data;
                sessionStorage.setItem('studentData', JSON.stringify(studentData));
                displayStudentData();
            } else {
                console.log("Error: " + response.message);
            }
            processCompleted(); // Mark AJAX request as completed
        }
    };

    xhr.send();
}

function displayStudentData() {
    var studentData = JSON.parse(sessionStorage.getItem('studentData'));
    setHiMessage()
    if (studentData) {
        document.getElementById('rollno').innerHTML = '<strong>Roll No:</strong> ' + studentData.rollno;
        document.getElementById('name').innerHTML = '<strong>Name:</strong> ' + studentData.username;
        document.getElementById('batch').innerHTML = '<strong>Batch:</strong> ' + studentData.batch;
        document.getElementById('dept').innerHTML = '<strong>Department:</strong> ' + studentData.dept;
        document.getElementById('h_d').innerHTML = '<strong>Hostel/Day Scholar:</strong> ' + studentData.h_d;
        document.getElementById('g').innerHTML = '<strong>Gender:</strong> ' + studentData.gender;
        document.getElementById('phone_no').innerHTML = '<strong>Contact No:</strong> ' + studentData.phone_no;
        document.getElementById('in').innerHTML = '<strong>Incharge: </strong>' + studentData.admin_username;
    } else {
        console.log('Error: Student data not found.');
    }
    processCompleted(); // Mark initial data retrieval (page load) as completed
}

function setHiMessage() {
    console.log("it is activated")
    var studentData = JSON.parse(sessionStorage.getItem('studentData'));
    hiMessage.innerText = `Hi ${studentData.username}`;
}

function processCompleted() {
    completedProcesses++;
    if (completedProcesses === 2) { // Change the number based on the total processes
        hidePreloader(); // Move the call to setHiMessage() here
    }
}
document.addEventListener('DOMContentLoaded', fetchStudentData);