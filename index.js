const squares = document.querySelectorAll('.square');
const colorChange = "lightgreen";
const revertColor = "#ccc";
let maxRotation = 1;


function gameplay() {
    let rotation = 0;
    let clickRotation = 0;
    let checkRotation = 0;
    let isUnique = true;
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
            if (maxRotation != 9) {
                if (win) {
                    maxRotation++;
                    rotation = 0;
                    clickRotation = 0;
                    checkRotation = 0;
                    isUnique = true;
                    originalSequence = [];
                    clickedSequence = [];
                    win = true;
                    clickEnable = false;
                    console.log("next round");
                    setTimeout(() => {
                        for (let i = 0; i < 9; i++) {

                            squares[i].style.backgroundColor = revertColor;
                        }
                    }, 1000);
                    changeColor();
                } else {
                    window.open('lose.html', '_self');
                }
            } else {
                window.open('win.html', '_self');
            }

        }

    })
}

gameplay();

