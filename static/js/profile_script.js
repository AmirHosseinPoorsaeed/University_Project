document.addEventListener('DOMContentLoaded', function() {
    // در حالت واقعی این اطلاعات از سرور دریافت می‌شود
    const userData = {
        email: localStorage.getItem('userEmail') || 'user@example.com',
        username: localStorage.getItem('username') || 'john_doe',
        joinDate: localStorage.getItem('joinDate') || 'January 15, 2023',
        lastPurchase: localStorage.getItem('lastPurchase') || 'Nike Air Max - February 5, 2023'
    };

    // نمایش اطلاعات کاربر
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('username').textContent = userData.username;
    document.getElementById('joinDate').textContent = userData.joinDate;
    document.getElementById('lastPurchase').textContent = userData.lastPurchase;

    // مدیریت منوی پروفایل
    const profileDropdown = document.querySelector('.profile-dropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    // نمایش مودال خروج
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logoutModal.classList.add('active');
    });

    // تایید خروج
    confirmLogout.addEventListener('click', function() {
        // در حالت واقعی اینجا session پاک می‌شود
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html'; // بازگشت به صفحه اصلی
    });

    // لغو خروج
    cancelLogout.addEventListener('click', function() {
        logoutModal.classList.remove('active');
    });

    // بستن مودال با کلیک خارج از آن
    window.addEventListener('click', function(e) {
        if (e.target === logoutModal) {
            logoutModal.classList.remove('active');
        }
    });

    // مدیریت دکمه‌های ویرایش
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.detail-card');
            const field = card.querySelector('p');
            const newValue = prompt('Enter new value:', field.textContent);
            
            if (newValue && newValue.trim() !== '') {
                field.textContent = newValue.trim();
                // در حالت واقعی اینجا درخواست به سرور ارسال می‌شود
                if (card.querySelector('h3').textContent.includes('Email')) {
                    localStorage.setItem('userEmail', newValue.trim());
                } else if (card.querySelector('h3').textContent.includes('Username')) {
                    localStorage.setItem('username', newValue.trim());
                }
            }
        });
    });
});