function submitEgatepass() {
  // Get form input values
  const proposed_out_date = document.getElementById('proposed_out_date').value;
  const proposed_out_time = document.getElementById('proposed_out_time').value;
  const proposed_in_date = document.getElementById('proposed_in_date').value;
  const proposed_in_time = document.getElementById('proposed_in_time').value;
  const purpose = document.getElementById('purpose').value;

  // Check for empty fields
  if (
      proposed_out_date === '' ||
      proposed_out_time === '' ||
      proposed_in_date === '' ||
      proposed_in_time === '' ||
      purpose === ''
  ) {
    showCustomAlert('Please fill in all the fields');
      return; // Stop form submission if any field is empty
  }

  const studentData = JSON.parse(sessionStorage.getItem('studentData'));

  const proposed_out_time_12hr = convertTo12HourFormat(proposed_out_time);
  const proposed_in_time_12hr = convertTo12HourFormat(proposed_in_time);

  const formData = {
      student_rollno: studentData.rollno,
      proposed_out_date: proposed_out_date,
      proposed_out_time: proposed_out_time,
      proposed_in_date: proposed_in_date,
      proposed_in_time: proposed_in_time,
      purpose: purpose
  };

  console.log("Data:", formData)

  const jsonData = JSON.stringify(formData);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '../php/gatesubmit.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              try {
                  const response = JSON.parse(xhr.responseText);
                  if (response.success) {
                        showCustomAlert('Gate pass request is submitted successfully!');
                  } else {
                      console.log("Error: " + response.message);
                  }
              } catch (error) {
                  console.log("Error parsing JSON response: " + error.message);
              }
          } else {
              console.log("Error: " + xhr.status);
          }
      }
  };
  xhr.send(jsonData);
}


function convertTo12HourFormat(timeString) {
  const [hours, minutes] = timeString.split(':');
  let period = 'AM';
  let hour = parseInt(hours);
  let minute = parseInt(minutes);
  
  if (hour >= 12) {
    period = 'PM';
  }
  
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }
  
  return `${hour}:${String(minute).padStart(2, '0')} ${period}`;
}


function showCustomAlert(message) {
    const customAlertBox = document.getElementById('customAlertBox');
    const customAlertMessage = document.getElementById('customAlertMessage');
    customAlertMessage.textContent = message;
    customAlertBox.style.display = 'block';
}

// Function to close the custom alert box
function closeCustomAlert() {
    const customAlertBox = document.getElementById('customAlertBox');
    customAlertBox.style.display = 'none';
}