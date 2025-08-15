document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signinForm');
    const emailOrPhoneInput = document.getElementById('emailOrPhone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');
    const countryCode = document.getElementById('countryCode');

    // تشخیص شماره تلفن و نمایش کد کشور
    emailOrPhoneInput.addEventListener('input', function() {
        const value = this.value.trim();
        
        // اگر عدد وارد شده و با 0 شروع شده باشد
        if (/^\d+$/.test(value) && value.startsWith('0')) {
            countryCode.style.display = 'block';
            this.value = value.substring(1); // حذف صفر ابتدایی
        } else if (/^\d+$/.test(value)) {
            countryCode.style.display = 'block';
        } else {
            countryCode.style.display = 'none';
        }
    });

    // اعتبارسنجی رمز عبور
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = 'Passwords do not match';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    // اعتبارسنجی فرم
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // بررسی پر بودن فیلدها
        const inputs = [emailOrPhoneInput, passwordInput, confirmPasswordInput];
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.setCustomValidity('Please fill out this field');
                isValid = false;
            } else {
                input.setCustomValidity('');
            }
        });
        
        // بررسی تطابق رمز عبور
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = 'Passwords do not match';
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // ارسال فرم در صورت معتبر بودن
            alert('Form submitted successfully!');
            form.reset();
        } else {
            // نمایش خطاها
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.reportValidity();
                }
            });
        }
    });
});