function action(type) {
    const egatepassId = document.getElementById('egatepass_id').value;
    const action = type;

    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    const formdata = {
        id: egatepassId,
        action: type,
        dateTime: dateTime
    };

    const jsonData = JSON.stringify(formdata);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../php/security.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    const statusMessage = document.getElementById('statusMessage');
                    if (response.success) {
                        showStatusMessage('Successfully!', 'success');
                    } else {
                        showStatusMessage('Error: ' + response.message, 'failure');
                    }
                } catch (error) {
                    console.log("Error parsing JSON response: " + error.message);
                }
            } else {
                console.log("Error: " + xhr.status);
            }

            // Reset the input field value to empty string in both cases
            document.getElementById('egatepass_id').value = '';
        }
    };
    xhr.send(jsonData);
}

function showStatusMessage(message, statusClass) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.className = 'status-box ' + statusClass;

    // Set a time limit (in milliseconds) for the status message to disappear
    const timeLimit = 2000; // 2 seconds
    setTimeout(function() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-box';
    }, timeLimit);
}
