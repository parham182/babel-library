// page1.js

// مطمئن شویم DOM کامل لود شده
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("button1").addEventListener('click', function () {
        addNumber(1);
        window.location.href = "Shelf.html";
    });

    document.getElementById("button2").addEventListener('click', function () {
        addNumber(2);
        // window.location.href = "Shelf.html";
    });

    document.getElementById("button3").addEventListener('click', function () {
        addNumber(3);
        // window.location.href = "Shelf.html";
    });

    document.getElementById("button4").addEventListener('click', function () {
        addNumber(4);
        // window.location.href = "Shelf.html";
    });
    document.getElementById("button5").addEventListener('click', function () {
        addNumber(5);
        // window.location.href = "Shelf.html";
    });
    document.getElementById("button6").addEventListener('click', function () {
        addNumber(6);
        // window.location.href = "Shelf.html";
    });
    document.getElementById("button7").addEventListener('click', function () {
        addNumber(7);
        // window.location.href = "Shelf.html";
    });
    document.getElementById("button8").addEventListener('click', function () {
        addNumber(8);
        // window.location.href = "Shelf.html";
    });
});