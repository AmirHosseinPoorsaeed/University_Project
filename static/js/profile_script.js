document.addEventListener('DOMContentLoaded', function() {
    // Enable editing function
    window.enableEditing = function(fieldId) {
        const field = document.getElementById(fieldId);
        field.readOnly = false;
        field.focus();
        field.style.borderBottom = '1px solid white';
    };

    // Avatar upload preview
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarIcon = document.querySelector('.profile-avatar i');
    
    avatarUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarIcon.style.backgroundImage = `url(${event.target.result})`;
                avatarIcon.style.backgroundSize = 'cover';
                avatarIcon.style.backgroundPosition = 'center';
                avatarIcon.classList.remove('fa-user-circle');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Form submission
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to Django backend
        // For now, we'll just show a success message
        alert('Profile updated successfully!');
        
        // Disable editing after submission
        const inputs = profileForm.querySelectorAll('input[type="text"], input[type="email"]');
        inputs.forEach(input => {
            input.readOnly = true;
            input.style.borderBottom = '1px solid transparent';
        });
    });

    // Logout modal
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logoutModal.classList.add('active');
    });

    confirmLogout.addEventListener('click', function() {
        // In a real app, this would call Django's logout view
        window.location.href = '/logout/'; // Django logout URL
    });

    cancelLogout.addEventListener('click', function() {
        logoutModal.classList.remove('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === logoutModal) {
            logoutModal.classList.remove('active');
        }
    });
});