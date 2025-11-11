// تعداد صفحات واقعی
const totalPages = 999;

// آرایه برای نگهداری متن هر صفحه (ابتدا همه خالی)
const pageTexts = Array(totalPages).fill(""); 

// شماره صفحه فعلی
let currentPage = 0;

// دسترسی به المنت‌ها
const pageContent = document.getElementById('pageContent');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageInput = document.getElementById('pageNumber');
const goBtn = document.getElementById('go');

//TODO اینجا باید طبق صفحه جنریت کنه
function showPage() {
    pageContent.textContent = pageTexts[currentPage] || "";
    pageInput.value = currentPage + 1; 
}

//TODO اینجا باید تکست هایی که اکسترکت بشن اد بشه
function addTextToPages(startIndex, texts) {
    for (let i = 0; i < texts.length; i++) {
        const pageIndex = startIndex + i;
        if (pageIndex >= 0 && pageIndex < totalPages) {
            pageTexts[pageIndex] = texts[i];
        }
    }
}

//مثال
addTextToPages(9, [
    "این متن صفحه 10 است",
    "این متن صفحه 11 است",
    "این متن صفحه 12 است"
]);

// نمایش صفحه اول
showPage();

// دکمه قبلی
prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        showPage();
    }
});

// دکمه بعدی
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage();
    }
});

// رفتن به صفحه مشخص
goBtn.addEventListener('click', () => {
    const pageNum = parseInt(pageInput.value);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum - 1;
        showPage();
    } else {
        alert("شماره صفحه معتبر نیست!");
    }
});

// امکان رفتن به صفحه با Enter
pageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        goBtn.click();
    }
});

