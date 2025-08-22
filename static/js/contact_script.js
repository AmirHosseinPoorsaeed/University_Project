document.addEventListener('DOMContentLoaded', function() {
    const authButton = document.getElementById('authButton');
    const userProfile = document.getElementById('userProfile');
    let isLoggedIn = false;
    authButton.addEventListener('click', function() {
        isLoggedIn = !isLoggedIn;
        if (isLoggedIn) {
        authButton.style.display = 'none';
        userProfile.style.display = 'flex';
    } else {
        authButton.style.display = 'block';
        userProfile.style.display = 'none';
    }});
    
    if (isLoggedIn) {
    authButton.style.display = 'none';
    userProfile.style.display = 'flex'; 
    }else {
    authButton.style.display = 'block';
    userProfile.style.display = 'none'; 
    }
});