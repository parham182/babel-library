let seed = getSeedNumber();

document.getElementById("text").innerHTML = "seed: " + seed

fetch('word-data.json')
    .then(response => response.json())
    .then(data => {
        generatePage(data)
    })
    .catch(error => console.error('Error loading JSON:', error));

function generatePage(data) {
    let pageStr = "";
    generateThreeDigitNumbers(seed).forEach(element => {
        pageStr += data[element];
        if (element % 5 == 0) {
            pageStr += "."
        }
        pageStr += " ";
    });
    document.getElementById("pageContent").innerHTML = pageStr;
}
let flipped = false;

document.body.addEventListener("click", () => {
    const page = document.getElementById("flipPage");

    page.classList.toggle("flip");
    flipped = !flipped;
});


document.addEventListener('DOMContentLoaded', () => {

    const selRaw = localStorage.getItem('babel_select');
    if (!selRaw) {

        document.body.innerHTML = `
      <div style="padding:36px;text-align:center;color:#cfe8ff">
        <h2>هیچ کتابی انتخاب نشده.</h2>
        <p>لطفاً ابتدا به صفحهٔ دیوارها بازگردید و یک کتاب انتخاب کنید.</p>
        <a href="books.html" style="color:#8fd0ff;display:inline-block;margin-top:16px">بازگشت به قفسه‌ها</a>
      </div>
    `;
        return;
    }

    const sel = JSON.parse(selRaw);

    const title = `کتاب — دیوار ${sel.wall} / قفسه ${sel.shelf} / شماره ${sel.book}`;

    const content = generateContent(sel);

    const modal = document.createElement('div');
    modal.className = 'book-modal';
    modal.innerHTML = `
    <div class="book-view" role="dialog" aria-modal="true">
      <button class="close-btn" title="بستن">✕</button>
      <div class="page left">
        <div class="book-title">${title}</div>
        <div class="small">صفحه 1</div>
        <div class="page-body" id="leftBody"></div>
      </div>
      <div class="page right">
        <div class="book-title invisible">&nbsp;</div>
        <div class="small">صفحه 2</div>
        <div class="page-body" id="rightBody"></div>
      </div>
    </div>
    <div style="width:100%;display:flex;justify-content:center">
      <div class="book-toolbar">
        <div class="icon-btn" id="prevBtn">‹ صفحه قبلی</div>
        <div class="icon-btn" id="nextBtn">صفحه بعدی ›</div>
        <a class="icon-btn" href="books.html" id="backBtn">بازگشت به قفسه‌ها</a>
      </div>
    </div>
  `;

    document.body.appendChild(modal);


    let pageIndex = 0;
    const pages = chunkContent(content, 600); // هر صفحه تقریبی 600 

    const left = document.getElementById('leftBody');
    const right = document.getElementById('rightBody');

    function renderPages() {
        const l = pages[pageIndex] || '';
        const r = pages[pageIndex + 1] || '';
        left.innerHTML = formatParagraphs(l);
        right.innerHTML = formatParagraphs(r);
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (pageIndex - 2 >= 0) pageIndex -= 2;
        else pageIndex = 0;
        renderPages();
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (pageIndex + 2 < pages.length) pageIndex += 2;
        renderPages();
    });
    modal.querySelector('.close-btn').addEventListener('click', () => {

        window.location.href = 'books.html';
    });


    renderPages();



    function generateContent(sel) {

        const seed = `دیوار ${sel.wall} - قفسه ${sel.shelf} - کتاب ${sel.book}\n\n`;
        const paragraphs = [];
        for (let i = 1; i <= 28; i++) {
            paragraphs.push(`فصل ${i}: این یک متن نمونه برای کتاب انتخاب‌شده است. این پاراگراف نشان‌دهندهٔ محتوای احتمالی کتاب است و می‌تواند با متن واقعی جایگزین شود. (مرجع: ${seed.trim()})`);
        }
        return paragraphs.join('\n\n');
    }

    function chunkContent(text, approxChars) {

        const paragraphs = text.split('\n\n');
        const pages = [];
        let cur = '';
        for (const p of paragraphs) {
            if ((cur + p).length > approxChars) {
                pages.push(cur);
                cur = p + '\n\n';
            } else {
                cur += p + '\n\n';
            }
        }
        if (cur.trim()) pages.push(cur);
        return pages;
    }

    function formatParagraphs(block) {

        return block.split('\n\n').map(p => `<p style="margin-bottom:12px">${escapeHtml(p)}</p>`).join('');
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[c]);
    }

});
