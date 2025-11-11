document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("button1").addEventListener('click', function () {
        addNumber(1);
        window.location.href = "books.html";
    });
    document.getElementById("button2").addEventListener('click', function () {
        addNumber(2);
        window.location.href = "books.html";
    });
    document.getElementById("button3").addEventListener('click', function () {
        addNumber(3);
        window.location.href = "books.html";
    });
    document.getElementById("button4").addEventListener('click', function () {
        addNumber(4);
        window.location.href = "books.html";
    });
    document.getElementById("button5").addEventListener('click', function () {
        addNumber(5);
        window.location.href = "books.html";
    });

});

function printnumber() {
    document.getElementById("text").textContent = document.cookie;
}