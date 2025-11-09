let wordField = document.getElementById("word")

document.getElementById("submitBtn").addEventListener('click', function (event) {
    event.preventDefault();
    // alert(wordField.value);

    fetch('word-data.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error loading JSON:', error));

});
