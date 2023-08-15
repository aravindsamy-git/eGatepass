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
  
  function getHistoryData() {
    showPreloader();
    console.log("Getting history data...");
    const studentData = JSON.parse(sessionStorage.getItem('studentData'));
    console.log(studentData);
    const rollno = studentData.rollno;
    console.log("rollno:", rollno);
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/get_history_data.php?rollno=' + rollno, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      console.log("Ready state:", xhr.readyState);
      console.log("Status:", xhr.status);
      if (xhr.readyState === 4) {
        try {
          if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log("Response data:", responseData);
            populateHistoryTable(responseData, studentData);
          } else {
            console.log("Request failed with status:", xhr.status);
          }
        } catch (error) {
          console.log("Error parsing JSON response: " + error.message);
        } finally{
          hidePreloader();
        }
      }
    };
    xhr.send();
  }
  
  
  
  function populateHistoryTable(data, student_Data) {
    const historyTable = document.getElementById('historyTableBody');
    // Clear existing rows if any
    historyTable.innerHTML = '';

    // Sort the data array in descending order based on the id property
    data.sort((a, b) => b.id - a.id);

  
    // Check if the data array is empty (no history data found)
    if (data.length === 0 || data[0].hasOwnProperty('no_data')) {
      const noDataRow = historyTable.insertRow();
      noDataRow.innerHTML = `<td colspan="14">No history data found.</td>`;
    } else {
  
      // Iterate through the sorted data and create table rows
      data.forEach((entry) => {
        const proposedOutTime12hr = convertTo12HourFormat(entry.proposed_out_time);
        const proposedInTime12hr = convertTo12HourFormat(entry.proposed_in_time);
  
        const row = historyTable.insertRow();
        row.innerHTML = `
          <td>${entry.id}</td>
          <td>${entry.rollno}</td>
          <td>${student_Data.username}</td>
          <td>${student_Data.batch}</td>
          <td>${student_Data.dept}</td>
          <td>${student_Data.h_d}</td>
          <td>${student_Data.phone_no}</td>
          <td>${entry.proposed_out_date}</td>
          <td>${proposedOutTime12hr}</td>
          <td>${entry.proposed_in_date}</td>
          <td>${proposedInTime12hr}</td>
          <td>${entry.purpose}</td>
          <td>${entry.status}</td>
          <td><button onclick="viewEntry(${entry.id}, '${entry.status}')">View</button></td>
        `;
      });
    }
  }
  
  function viewEntry(entryId, status) {
      // Depending on the status, redirect to the appropriate page
      if (status === 'pending') {
        window.location.href = '../html/pending.html?id=' + entryId;
      } else if (status === 'approved') {
        window.location.href = '../html/accept.html?id=' + entryId;
      } else if (status === 'rejected') {
        window.location.href = '../html/declined.html?id=' + entryId;
      } else {
        // Handle any other status value (if needed)
      }
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
    // Call the function to get data and populate the table when the history page is loaded
    document.addEventListener('DOMContentLoaded', function () {
      getHistoryData();
      setHiMessage();
    });
    