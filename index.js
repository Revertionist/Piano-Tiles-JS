const squares = document.querySelectorAll('.square');
const colorChange = "lightgreen";
const revertColor = "#ccc"
let rotation = 0;


function changeColor() {

    let randomSquare = Math.floor(Math.random() * squares.length);

    setTimeout(() => {
        squares[randomSquare].style.backgroundColor = colorChange;
    }, 2500);

    setTimeout(() => {
        squares[randomSquare].style.backgroundColor = revertColor;
    }, 3000);

    rotation++;

    setTimeout(() => {
        if (rotation < 5)
            changeColor();
    }, 1000);
}

changeColor();

squares.forEach((square) => {
    square.addEventListener('click', () => {
        square.style.backgroundColor = colorChange;
    })
})
