document.addEventListener('DOMContentLoaded', function() {
    // Create custom alert
    const customAlert = document.createElement('div');
    customAlert.id = 'customAlert';
    customAlert.className = 'custom-alert';
    customAlert.innerHTML = `
        <div class="alert-content">
            <p></p>
        </div>
    `;
    document.body.appendChild(customAlert);

    function showAlert(message, duration = 2000) {
        const alertContent = customAlert.querySelector('p');
        alertContent.textContent = message;
        customAlert.classList.add('active');
        
        setTimeout(() => {
            customAlert.classList.remove('active');
        }, duration);
    }

    const resetForm = document.getElementById('resetForm');
    const emailInput = document.getElementById('email');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthMeter = document.getElementById('strengthMeter');
    
    // Password strength indicator
    newPasswordInput.addEventListener('input', function() {
        const password = newPasswordInput.value;
        let strength = 0;
        
        // Length check
        if (password.length > 7) strength += 1;
        // Contains numbers
        if (/\d/.test(password)) strength += 1;
        // Contains special chars
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
        // Contains upper and lower case
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        
        // Update strength meter
        const width = strength * 25;
        let color = '#ff0000'; // Red
        
        if (strength >= 2) color = '#ffcc00'; // Yellow
        if (strength >= 3) color = '#00ff00'; // Green
        
        strengthMeter.style.width = `${width}%`;
        strengthMeter.style.backgroundColor = color;
    });

    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email
        if (!emailInput.value.trim()) {
            showAlert('Please enter your email address');
            return;
        }
        
        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            showAlert('Please enter a valid email address');
            return;
        }
        
        // Validate passwords
        if (!newPasswordInput.value.trim() || !confirmPasswordInput.value.trim()) {
            showAlert('Please fill in both password fields');
            return;
        }
        
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            showAlert('Passwords do not match');
            return;
        }
        
        if (newPasswordInput.value.length < 6) {
            showAlert('Password must be at least 6 characters');
            return;
        }
        
        // Simulate password reset
        setTimeout(() => {
            showAlert('Password reset successfully! Redirecting to login...');
            resetForm.reset();
            strengthMeter.style.width = '0';
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        }, 1000);
    });
});