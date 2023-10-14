const colorChange = "#7289da";
const winColor = "#23C552";
const loseColor = "#F84F31";
const revertColor = "#ccc";
let maxRotation = 1;
const container = document.getElementById('container');
let numSquares;
let squares;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mode = urlParams.get('mode');

if (mode === 'normal') {
    numSquares = 16;
    container.classList.add('container-normal');
}
else if (mode === 'hacker') {
    numSquares = 36
    container.classList.add('container-hacker');
}

function updateSquares(num) {
    alert("Click the squares that glow in the same sequence!");
    container.innerHTML = '';


    numSquares = num;
    for (let i = 0; i < numSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        container.appendChild(square);
    }
    squares = document.querySelectorAll('.square');
}



function gameplay() {
    let rotation = 0;
    let clickRotation = 0;
    let checkRotation = 0;
    let isUnique = true;
    let clickUnique = true;
    let originalSequence = [];
    let clickedSequence = [];
    let win = true;
    let clickEnable = false;



    function changeColor() {
        clickEnable = false;
        console.log(maxRotation);
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
                console.log("glow")
            }, 2500);

            setTimeout(() => {
                squares[randomSquare].style.backgroundColor = revertColor;
                console.log("unglow")
            }, 3000);

            rotation++;

            setTimeout(() => {
                if (rotation < maxRotation)
                    changeColor();
                else
                    setTimeout(() => {
                        clickEnable = true;
                    }, 2500);
            }, 1000);
        } else {
            changeColor();
        }
    }

    window.addEventListener("load", () => {
        changeColor();



        squares.forEach((square, index) => {
            square.addEventListener('click', () => {
                console.log(clickEnable)
                if (!clickEnable) return;

                square.style.backgroundColor = colorChange;

                clickedSequence.forEach(element => {
                    if (element === index) {
                        clickUnique = false;
                    }
                });

                if (clickUnique === true) {
                    clickedSequence[clickRotation] = index;
                    clickRotation++;
                }
                clickUnique = true
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
            if (maxRotation != numSquares) {
                if (win) {
                    maxRotation++;
                    rotation = 0;
                    clickRotation = 0;
                    checkRotation = 0;
                    isUnique = true;
                    win = true;
                    clickEnable = false;
                    console.log("next round");

                    setTimeout(() => {
                        for (let i = 0; i < numSquares; i++) {
                            console.log('red color')
                            squares[i].style.backgroundColor = winColor;
                        }
                    }, 500);


                    originalSequence = [];
                    clickedSequence = [];
                    setTimeout(() => {
                        for (let i = 0; i < numSquares; i++) {

                            squares[i].style.backgroundColor = revertColor;
                        }
                    }, 1000);
                    changeColor();
                } else {
                    setTimeout(() => {
                        for (let i = 0; i < numSquares; i++) {
                            console.log('red color')
                            squares[i].style.backgroundColor = loseColor;
                        }

                    }, 500);
                    setTimeout(() => {
                        window.open(`lose.html?mode=${mode}`, '_self');
                    }, 1000);

                }
            } else {
                window.open('win.html', '_self');
            }

        }

    })
}


updateSquares(numSquares)
gameplay();