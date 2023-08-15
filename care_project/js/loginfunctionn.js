function loginFunction() {

    var xhr = new XMLHttpRequest();
    var login_id = document.getElementById('login_id').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value;

    var data = {
        login_id: login_id,
        password: password,
        role: role
    };

    xhr.open('POST', 'php/enter.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    if (role === 'student') {
                        window.location.href = 'html/studentdashboard.html';
                    } else if (role === 'admin') {
                        sessionStorage.setItem('user_data', JSON.stringify(response.user_data));
                        window.location.href = 'html/admindashboard.html'
                    }
                } else {
                    document.getElementById('result').innerText = response.message;
                    setTimeout(function () {
                        document.getElementById('result').innerText = ''; // Clear the response message after a few seconds
                    }, 1000);
                }
            } else {
                console.log("Error: " + xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}
