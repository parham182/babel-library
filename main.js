// fs = require('fs');

// function addNumber(number) {
//     let NUM = number;
//     let data = {"number": NUM}
//     fs.writeFile('number.json', JSON.stringify(data), 'utf8', (err) => {
//         if (err) {
//             console.error("خطا در نوشتن فایل:", err);
//         } else {
//             console.log("عدد با موفقیت در data.json ذخیره شد: " + NUM);
//         }
//     });
// }.

async function addNumber(number) 
{
    let newNum = await loadNumber() + number
    writeNumber(newNum)
    console.log(newNum)
}

async function writeNumber(number) {
    // let data = {"number": number}
    localStorage.setItem('data', number)
    let mainNum = await loadNumber() + number;
    
}

async function loadNumber() {
  let NUM = 0;
  try {
    const response = await fetch('number.json');
    NUM = await response.json();
  } catch (err) {
    console.error("error 2728", err);
  }
  
  return NUM["number"]
}