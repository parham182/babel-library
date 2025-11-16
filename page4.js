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

document.addEventListener('DOMContentLoaded', () => {

    const ROW_CONTAINER = document.getElementById('buttonRow') || createRoot();


    function createRoot() {
        const r = document.createElement('div');
        r.id = 'buttonRow';
        document.body.appendChild(r);
        return r;
    }


    const WALLS = 4;
    const SHELVES_PER_WALL = 5;
    const BOOKS_PER_SHELF = 32;


    const wrap = document.createElement('div');
    wrap.className = 'page-wrap';
    wrap.innerHTML = `
    <div class="header"><h1>مرور قفسه‌ها</h1></div>
    <div class="wall-grid" id="wallGrid"></div>
  `;
    ROW_CONTAINER.appendChild(wrap);

    const wallGrid = wrap.querySelector('#wallGrid');

    for (let w = 1; w <= WALLS; w++) {
        const shelfBlock = document.createElement('div');
        shelfBlock.className = 'shelf';
        const label = document.createElement('div');
        label.className = 'shelf-label';
        label.textContent = 'دیوار ' + w;
        shelfBlock.appendChild(label);

        for (let s = 1; s <= SHELVES_PER_WALL; s++) {
            const subLabel = document.createElement('div');
            subLabel.className = 'shelf-label';
            subLabel.textContent = `قفسه ${s} از دیوار ${w}`;
            shelfBlock.appendChild(subLabel);

            const row = document.createElement('div');
            row.className = 'spine-row';

            for (let b = 1; b <= BOOKS_PER_SHELF; b++) {
                const sp = document.createElement('div');
                sp.className = 'book-spine';

                sp.setAttribute('data-color', ((b % 5) + 1));
                sp.dataset.wall = w;
                sp.dataset.shelf = s;
                sp.dataset.book = b;
                sp.innerHTML = `<div class="snum">${String(b).padStart(2, '0')}</div>`;
                sp.title = `دیوار ${w} › قفسه ${s} › کتاب ${b}`;

                sp.addEventListener('click', (e) => {

                    const sel = { wall: w, shelf: s, book: b };
                    localStorage.setItem('babel_select', JSON.stringify(sel));

                    window.location.href = 'booksText.html';
                });

                row.appendChild(sp);
            }

            shelfBlock.appendChild(row);
        }

        wallGrid.appendChild(shelfBlock);
    }

});
