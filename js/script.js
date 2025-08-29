    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Форма: валидации
    const form = document.querySelector('.contact__form form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    function showError(input, message) {
        let error = input.parentElement.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        input.classList.add('input-error');
        input.classList.remove('input-success');
    }

    function showSuccess(input) {
        let error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.textContent = '';
        }
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        inputs.forEach(input => {
            const value = input.value.trim();
            if (!value) {
                showError(input, 'Это поле обязательно для заполнения');
                valid = false;
            } else {
                if (input.type === 'email') {
                    if (!validateEmail(value)) {
                        showError(input, 'Введите корректный email');
                        valid = false;
                        return;
                    }
                }
                showSuccess(input);
            }
        });

        if (valid) {
            // Optionally, submit the form or show success message
            alert('Форма успешно отправлена!');
            form.reset();
            inputs.forEach(input => input.classList.remove('input-success'));
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                showError(input, 'Это поле обязательно для заполнения');
            } else {
                if (input.type === 'email') {
                    if (!validateEmail(input.value.trim())) {
                        showError(input, 'Введите корректный email');
                        return;
                    }
                }
                showSuccess(input);
            }
        });
    });

