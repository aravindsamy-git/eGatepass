document.addEventListener('DOMContentLoaded', () => {
    // Call the getPendingData() function to make the HTTP request and populate the table
    getPendingData();
  });
  
  function showPreloader() {
    document.body.classList.add("loading");
    document.getElementById("loader-container").style.display = "flex";
  }
  
  function hidePreloader() {
    document.body.classList.remove("loading");
    document.getElementById("loader-container").style.display = "none";
  }
  
  function getPendingData() {
    showPreloader(); // Show preloader while fetching data
    console.log("Getting Pending data...");
    const xhr = new XMLHttpRequest();
    const user_data = JSON.parse(sessionStorage.getItem('user_data'));
    const isHostelAdmin = user_data.empid === 'bwarden' || user_data.empid === 'gwarden';
    let url;

    if (isHostelAdmin) {
      url = '../php/get_hostel_data.php';
    } else {
      url = '../php/get_pending_data_cc.php';
    }

    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log("Ready state:", xhr.readyState);
        console.log("Status:", xhr.status);
        console.log("Response:", xhr.responseText);
        if (xhr.readyState === 4) {
            try {
                if (xhr.status === 200) {
                    const responseData = JSON.parse(xhr.responseText);
                    console.log("Response data:", responseData);
                    populateAdminTable(responseData);
                } else {
                    console.log("Request failed with status:", xhr.status);
                }
            } catch (error) {
                console.log("Error parsing JSON response: " + error.message);
            } finally {
                hidePreloader(); // Hide preloader after data is fetched (including error cases)
            }
        }
    };
    xhr.send(JSON.stringify(user_data));
}

  
  function populateAdminTable(data) {
      const tableBody = document.querySelector('table tbody');
  
      const ccApprovalHeader = document.getElementById('cc-approval-header');
      const userRole = getUserRole(); 
    
      // Clear existing table rows
      tableBody.innerHTML = '';

    
      if (data.length === 0) {
        // If no pending eGatepass data found, show a message in the table
        const noDataMessage = document.createElement('tr');
        noDataMessage.innerHTML = `
          <td colspan="14">No pending eGatepass requests.</td>
        `;
        tableBody.appendChild(noDataMessage);
      } else {
        // Loop through the data array and create table rows for each entry
        data.forEach((entry) => {
          const newRow = document.createElement('tr');
          const proposedOutTime12hr = convertTo12HourFormat(entry.proposed_out_time);
          const proposedInTime12hr = convertTo12HourFormat(entry.proposed_in_time);
    
          // Populate each cell in the row with corresponding data
          newRow.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.rollno}</td>
            <td>${entry.username}</td>
            <td>${entry.batch}</td>
            <td>${entry.dept}</td>
            <td>${entry.h_d}</td>
            <td>${entry.phone_no}</td>
            <td>${entry.proposed_out_date}</td>
            <td>${proposedOutTime12hr}</td>
            <td>${entry.proposed_in_date}</td>
            <td>${proposedInTime12hr}</td>
            <td>${entry.purpose}</td>
            ${ userRole === 'hostel_admin' ? `
            <td class="cc-approval-column">
                <input type="checkbox" name="cc_approval" id="cc_approval_${entry.id}">
            </td>
            ` : ''}
            <td class="options">
            <input type="hidden" name="ticket_id" value="${entry.id}">
            <input type="button" class="button button-success" name="approve" onclick="approve()" value="A">
            <input type="button" class="button button-danger" name="deny" onclick="decline()" value="R">
            </td>
        
        </td>   
          `;
          tableBody.appendChild(newRow);
  });

      if ( userRole === 'hostel_admin') {
        ccApprovalHeader.style.display = 'table-cell';
      } else {
        ccApprovalHeader.style.display = 'none';
      }
    }
  }
    
    function approve() {
      // Get the ticket ID from the hidden input field
      const ticketId = event.target.parentElement.querySelector('input[name="ticket_id"]').value;
      console.log("Accept button clicked for Ticket ID:", ticketId);
    
      // Check if the user is a hostel admin (warden)
      if (getUserRole() === 'hostel_admin') {
        // The user is a hostel admin, now check if the CC Approval checkbox is checked
        const ccApprovalCheckbox = document.getElementById(`cc_approval_${ticketId}`);
        const isCCApproved = ccApprovalCheckbox && ccApprovalCheckbox.checked;
        console.log("value:",isCCApproved)
        if(isCCApproved){
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '../php/changesA.php', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // Refresh the table
              getPendingData();
              console.log("Status updated successfully");
            }
          };
          const params = `ticket_id=${ticketId}&status=s2approve`;
          xhr.send(params);
        }else{
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '../php/changesA.php', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // Refresh the table
              getPendingData();
              console.log("Status updated successfully");
            }
          };
          const params = `ticket_id=${ticketId}&status=approved`;
          xhr.send(params);
        }
      
      } else {
        // For non-hostel admins, directly set the status as "approved"
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../php/changesA.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // Refresh the table
            getPendingData();
            console.log("Status updated successfully");
          }
        };
    
        const params = `ticket_id=${ticketId}&status=approved`;
        xhr.send(params);
      }
    }
    
  
  function decline() {
      const ticketId = event.target.parentElement.querySelector('input[name="ticket_id"]').value;
      console.log("Decline button clicked for Ticket ID:", ticketId);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '../php/changeR.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              // Refresh the table
              getPendingData();
              console.log("Status updated successfully");
          }
      };
      const params = `ticket_id=${ticketId}&status=rejected`;
      xhr.send(params);
  }
  
  function toactivepass() {
    window.location.href = "../html/active_egatepass.html";
  }
  
  function toviewepiredpass() {
    window.location.href = "../html/expired_egatepass.html";
  }
  
  function toviewhistory() {
    window.location.href = "../html/history_egatepass.html";
  }
  
  function getUserRole() {
    const userData = JSON.parse(sessionStorage.getItem('user_data'));
    const empid = userData && userData.empid ? userData.empid : '';
    
    // Check if the user role is either "bwarden" or "gwarden"
    if (empid === 'bwarden' || empid === 'gwarden') {
        return 'hostel_admin';
    }
    
    return ''; // For other roles, return an empty string
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
  
  // Call the getPendingData() function to make the HTTP request and populate the table
  getPendingData();