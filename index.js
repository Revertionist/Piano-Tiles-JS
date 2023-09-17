const squares = document.querySelectorAll('.square');

squares.forEach((square) => {
    square.addEventListener('click', () => {
        const colorChange = "lightgreen";
        square.style.backgroundColor = colorChange;
    })
})
