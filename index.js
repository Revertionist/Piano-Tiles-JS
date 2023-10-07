const squares = document.querySelectorAll('.square');
const colorChange = "lightgreen";
const revertColor = "#ccc";
let rotation = 0;
let clickRotation = 0;
let checkRotation = 0;
let isUnique = true;
let Progress = true;
let originalSequence = [];
let clickedSequence = [];
let win = true;
let clickEnable = false;

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
        originalSequence[rotation] = randomSquare;
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
            else
                clickEnable = true;
        }, 1000);
    } else {
        changeColor();
    }
}

changeColor();



squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        console.log(clickEnable)
        if (!clickEnable) return;

        square.style.backgroundColor = colorChange;
        clickedSequence[clickRotation] = index;
        clickRotation++;

        if (clickedSequence.length === originalSequence.length)
            check();
    })
})




function check() {
    for (let i = 0; i < clickedSequence.length; i++) {
        console.log(originalSequence[i], clickedSequence[i])
        if (originalSequence[i] != clickedSequence[i]) {
            win = false;
            break;
        }
    }

    if (win) {
        window.open('pages/win.html', '_self');
    } else {
        window.open('pages/lose.html', '_self');
    }
}
