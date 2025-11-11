async function addNumber(number) {
  let current = await loadNumber(); // current is string
  let newNum = (current || "") + String(number); // concat as text
  appendNumberToCookie(newNum);
}

function appendNumberToCookie(newNumber) {
  let value = String(newNumber);
  document.cookie = `number=${encodeURIComponent(value)}; path=/; max-age=${60*60*24*30}`;
  console.log(document.cookie);
}

function getSeedNumber() {
  let cookies = document.cookie.split("; ");
  let cookieValue = "";

  cookies.forEach(cookie => {
    let idx = cookie.indexOf('=');
    if (idx === -1) return;
    let name = cookie.slice(0, idx).trim();
    let value = cookie.slice(idx + 1);
    if (name === "number") {
      try {
        cookieValue = decodeURIComponent(value) || "";
      } catch {
        cookieValue = value || "";
      }
    }
  });

  return cookieValue;
}

// helper to return current cookie value (for async addNumber)
async function loadNumber() {
  return getSeedNumber();
}

// clear all cookies
function clearcoockie() {
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });
}
