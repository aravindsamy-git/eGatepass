
function setHiMessage() {
    var studentData = JSON.parse(sessionStorage.getItem('studentData'));
    hiMessage.innerText = `Hi ${studentData.username}`;
  }

  function showPreloader() {
    document.body.classList.add("loading");
    document.getElementById("loader-container").style.display = "flex";
  }
  
  function hidePreloader() {
    document.body.classList.remove("loading");
    document.getElementById("loader-container").style.display = "none";
  }

  function populateEntryData() {
    showPreloader();
    // Get the entryId from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const entryId = urlParams.get('id');

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `../php/Spage.php?id=${entryId}`, true);

    // Define the event listener to handle the AJAX response
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the JSON response from the server
        const data = JSON.parse(xhr.responseText);
        const studentData = JSON.parse(sessionStorage.getItem('studentData'));
        const proposedOutTime12hr = convertTo12HourFormat(data.proposed_out_time);
        const proposedInTime12hr = convertTo12HourFormat(data.proposed_in_time);
        console.log(studentData);
        // Populate the HTML elements with the received data
        document.getElementById('ticketId').textContent = data.id;
        document.getElementById('rollno').textContent = data.rollno;
        document.getElementById('name').textContent = studentData.username;
        document.getElementById('batch').textContent = studentData.batch;
        document.getElementById('dept').textContent = studentData.dept;
        document.getElementById('h_d').textContent = studentData.h_d;
        document.getElementById('phone_no').textContent = studentData.phone_no;
        document.getElementById('proposed_out_date').textContent = data.proposed_out_date;
        document.getElementById('proposed_out_time').textContent = proposedOutTime12hr;
        document.getElementById('proposed_in_date').textContent = data.proposed_in_date;
        document.getElementById('proposed_in_time').textContent = proposedInTime12hr;
        document.getElementById('purpose').textContent = data.purpose;
        document.getElementById('status').textContent = data.status;
        document.getElementById('in').textContent = studentData.admin_username;

        hidePreloader(); // Hide the preloader after populating the HTML elements
      }
    };
    
    // Send the AJAX request
    xhr.send();
  }


function convertTo12HourFormat(timeString) {
  const [hours, minutes] = timeString.split(':');
  let period = 'AM';
  let hour = parseInt(hours);
  let minute = parseInt(minutes);
  
  if (hour >= 12) {
    period = 'PM';
    if (hour > 12) {
      hour -= 12;
    }
  } else if (hour === 0) {
    hour = 12;
  }
  
  return `${hour}:${String(minute).padStart(2, '0')} ${period}`;
}

  // Call the setHiMessage() function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setHiMessage();
    populateEntryData(); // Call the populateEntryData function when the page loads
});

