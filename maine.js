const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btn-login-popup');
const iconClose = document.querySelector('.icon-close');

const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const loginError = document.querySelector('#login-error');
const registerError = document.querySelector('#register-error');
const btnPoup = document.querySelector('.btn-login-popup');
// التنقل بين الفورمات
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
});

// Register
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#reg-name').value.trim();
    const email = document.querySelector('#reg-email').value.trim().toLowerCase();
    const password = document.querySelector('#reg-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        registerError.textContent ='This email is already registered.';
        return;
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    registerError.textContent = '';
    registerForm.reset();
    wrapper.classList.remove('active');
});

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value.trim().toLowerCase();
    const password = document.querySelector('#login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        loginError.textContent = 'The email or password is incorrect.';
        return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'home.html';
});