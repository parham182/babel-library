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
        if(element % 5 == 0) {
            pageStr += "."
        }
        pageStr += " ";
    });
    document.getElementById("pageContent").innerHTML = pageStr;
}