const squares = document.querySelectorAll('.square');
const colorChange = "lightgreen";
const revertColor = "#ccc"
let rotation = 0;
let checkRotation = 0;
let isUnique = true;
let Progress = true;
let originalSequence = [];

function changeColor() {
    checkRotation = 0;
    isUnique = true;
    let randomSquare = Math.floor(Math.random() * squares.length);

    while (checkRotation < rotation) {
        if (originalSequence[checkRotation] == randomSquare) {
            isUnique = false;
            break;
        } else {
            checkRotation++;
        }
    }
    

    if (isUnique == true) {
        originalSequence [rotation] = randomSquare;
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
    } else {
        changeColor();
    }
}

changeColor();

squares.forEach((square) => {
    square.addEventListener('click', () => {
        square.style.backgroundColor = colorChange;
    })
})
