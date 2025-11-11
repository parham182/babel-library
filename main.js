
// اضافه کردن عدد جدید به کوکی
async function addNumber(number) {
  let newNum = await loadNumber() + number; // اگر از فایل number.json میخوای بخونی
  appendNumberToCookie(newNum);
}

// تابع برای اضافه کردن مقدار به کوکی فعلی
function appendNumberToCookie(newNumber) {
  let cookies = document.cookie.split("; ");
  let cookieValue = "";

  // خواندن مقدار قبلی
  cookies.forEach(cookie => {
    let [name, value] = cookie.split("=");
    if (name === "number") {
      cookieValue = value;
    }
  });

  // اضافه کردن مقدار جدید
  let updatedValue = cookieValue + newNumber;

  // نوشتن دوباره در کوکی
  document.cookie = `number=${updatedValue}; path=/;`;
  console.log( document.cookie);
}

// خواندن عدد از فایل JSON
async function loadNumber() {
  let NUM = 0;
  try {
    const response = await fetch('number.json');
    NUM = await response.json();
  } catch (err) {
    console.error("error loading number.json", err);
  }

  return NUM["number"];
}

// پاک کردن همه کوکی‌ها
function clearcoockie() {
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });
  alert("✅ همه‌ی کوکی‌ها حذف شدند!");
}
