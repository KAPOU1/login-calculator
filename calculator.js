const display = document.querySelector('#display');
const user = JSON.parse(localStorage.getItem('currentUser'));

// Welcome + Logout
if (user) {
    document.querySelector('#welcome').textContent = 'Welcome ' + user.name + ' 👋';
}
document.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// الأزرار
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const action = key.dataset.action;
        const value = key.dataset.value;

        if (display.value === 'Error') display.value = '';

        if (action === 'clear') {
            display.value = '';
        } else if (action === 'delete') {
            display.value = display.value.slice(0, -1);
        } else if (action === 'equal') {
            calculate();
        } else {
            display.value += value;
        }
    });
});

function calculate() {
    let expr = display.value;
    if (!expr) return;

    // نقبل كان الأرقام والعمليات
    if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
        display.value = 'Error';
        return;
    }
    // نحيّو الأصفار الزايدة (باش 007 تولي 7)
    expr = expr.replace(/(^|[^\d.])0+(?=\d)/g, '$1');

    try {
        const result = Function('return (' + expr + ')')();
        display.value = Number.isFinite(result)
            ? parseFloat(result.toFixed(10))
            : 'Error';
    } catch {
        display.value = 'Error';
    }
}