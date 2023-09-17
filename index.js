const squares = document.querySelectorAll('.square');
const colorChange = "lightgreen";
const revertColor = "#ccc"
let rotation = 0;

while (rotation < 5) {
    function changeColor() {

        let randomSquare = Math.floor(Math.random() * squares.length);

        squares[randomSquare].style.backgroundColor = colorChange;

        setTimeout(() => {
            squares[randomSquare].style.backgroundColor = revertColor;
        }, 1000);

    }
    rotation++;
    changeColor();

}


changeColor();



squares.forEach((square) => {
    square.addEventListener('click', () => {
        square.style.backgroundColor = colorChange;
    })
})
