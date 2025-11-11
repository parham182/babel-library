// پیدا کردن کانتینر دکمه‌ها
const container = document.getElementById('buttonRow');

// ساخت ۳۲ دکمه و اضافه کردن id
for (let i = 1; i <= 32; i++) {
    const btn = document.createElement('button');
    btn.id = `button${i}`;
    btn.textContent = i;
    container.appendChild(btn);
}
document.addEventListener('DOMContentLoaded', function () {
    // اضافه کردن Event Listener برای همه دکمه‌ها
    for (let i = 1; i <= 32; i++) {
        const btn = document.getElementById(`button${i}`);
        btn.addEventListener('click', () => {
            addNumber(i);
            window.location.href = "booksText.html";
        });
    }
});