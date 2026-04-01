function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('loggedIn', 'true');
        location.reload();
    } else {
        alert('Invalid credentials');
    }
    return false;
}

function logout() {
    localStorage.removeItem('loggedIn');
    location.reload();
}
