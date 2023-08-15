function showPreloader() {
    document.body.classList.add("loading");
    document.getElementById("loader-container").style.display = "flex";
}
  
function hidePreloader() {
    document.body.classList.remove("loading");
    document.getElementById("loader-container").style.display = "none";
}

function geteGatepassHistory() {
    showPreloader();
    console.log("Getting eGatepass history data...");
    const xhr = new XMLHttpRequest();
    xhr.open('post', '../php/get_eGatepass_history.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const user_data = sessionStorage.getItem('user_data');

    console.log("user_data:", user_data)

    xhr.onreadystatechange = function () {
        console.log("Ready state:", xhr.readyState);
        console.log("Status:", xhr.status);
        console.log("Response:", xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const responseData = JSON.parse(xhr.responseText);
                console.log("Response data:", responseData);
                populateHistoryTable(responseData);
            } catch (error) {
                console.log("Error parsing JSON response: " + error.message);
            }finally{
                hidePreloader()
            }
        }
    };
    xhr.send(JSON.stringify(user_data));
}

function populateHistoryTable(data) {
    const tableBody = document.querySelector('table tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    if (data.length === 0) {
        // If no eGatepass history data found, show a message in the table
        const noDataMessage = document.createElement('tr');
        noDataMessage.innerHTML = `
            <td colspan="9">No eGatepass history available.</td>
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
                <td>${entry.username}</td>
                <td>${entry.rollno}</td>
                <td>${entry.proposed_out_date}</td>
                <td>${proposedOutTime12hr}</td>
                <td>${entry.proposed_in_date}</td>
                <td>${proposedInTime12hr}</td>
                <td>${entry.purpose}</td>
                <td>${entry.status}</td>
            `;

            tableBody.appendChild(newRow);
        });
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

function logout() {
    window.location.href = "../index.html";
}

function searchByName() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const tableRows = document.querySelectorAll("table tbody tr");

    tableRows.forEach(row => {
        const nameCell = row.querySelector("td:nth-child(2)");
        if (nameCell) {
            const name = nameCell.textContent.toLowerCase();
            if (name.includes(input)) {
                row.style.display = "table-row";
            } else {
                row.style.display = "none";
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Call the getPendingData() function to make the HTTP request and populate the table
    geteGatepassHistory();
  });
