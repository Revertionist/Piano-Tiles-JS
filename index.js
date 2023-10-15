
// make the website responsive
// leaderboard using local storage
// multiplayer feature that allows one player to set sequence for other player
// add animation for tiles

let score = 0;
let timer = 0;
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
let clickAudio = document.getElementById('click-audio');
let gameLostAudio = document.getElementById('game-lost-audio');
let nextRoundAudio = document.getElementById('game-next-audio');
let gameWonAudio = document.getElementById('game-won-audio');
clickAudio.playbackRate = 2;
clickAudio.volume = .3;
gameLostAudio.volume = .3;
nextRoundAudio.volume = .1;
gameWonAudio.volume = .5;
let clearTime;
let seconds;

if (mode === 'normal') {
    numSquares = 16;
    container.classList.add('container-normal');
}
else if (mode === 'hacker') {
    numSquares = 36;
    container.classList.add('container-hacker');
}

function updateSquares(num) {
    alert("Click the squares that glow!");
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
    let timeRotation = 1;
    nextRoundAudio.play();

    function changeColor() {
        clickEnable = false;
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

        function setTimer() {
            if (mode === 'hacker') {
                seconds = 5 * timeRotation;
                timeRotation++;

                if (clearTime) {
                    clearInterval(clearTime);
                }

                clearTime = setInterval(() => {
                    if (seconds >= 0) {
                        document.querySelector(".timer").innerHTML = "Timer: " + seconds;
                        seconds -= 1;
                    }
                    else {
                        gameLostAudio.play();

                        function gameLost() {

                            for (let i = 0; i < numSquares; i++) {

                                squares[i].style.backgroundColor = loseColor;
                            }



                            setTimeout(() => {
                                for (let i = 0; i < numSquares; i++) {

                                    squares[i].style.backgroundColor = revertColor;
                                }
                            }, 500);
                        }

                        function repeatGameLost(counter) {
                            if (counter < 3) {
                                setTimeout(() => {
                                    gameLost();
                                    repeatGameLost(counter + 1);
                                }, 700);

                            }
                        }

                        repeatGameLost(0);
                        setTimeout(() => {
                            window.open(`lose.html?mode=${mode}&score=${score}`, '_self');
                        }, 3700);
                        clearInterval(clearTime);
                    }
                }, 1000);
            }
        }


        setTimer();
        squares.forEach((square, index) => {
            square.addEventListener('click', () => {
                if (!clickEnable) return;

                square.style.backgroundColor = colorChange;

                clickedSequence.forEach(element => {
                    if (element === index) {
                        clickUnique = false;
                    }
                });

                if (clickUnique === true) {
                    if (mode === 'hacker') {
                        clickAudio.play();
                    }
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
                if (!clickedSequence.includes(originalSequence[i])) {
                    win = false;
                    break;
                }
            }
            if (maxRotation != numSquares) {
                if (win) {
                    if (mode === 'hacker') {
                        score = score + (5 * seconds);
                    } else {
                        score = score + 5;
                    }

                    console.log(score);
                    maxRotation++;
                    rotation = 0;
                    clickRotation = 0;
                    checkRotation = 0;
                    isUnique = true;
                    win = true;
                    clickEnable = false;

                    setTimeout(() => {
                        for (let i = 0; i < numSquares; i++) {
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
                    setTimeout(() => {
                        nextRoundAudio.play();
                    }, 400)

                    setTimer();


                    changeColor();
                } else {
                    gameLostAudio.play();

                    function gameLost() {

                        for (let i = 0; i < numSquares; i++) {

                            squares[i].style.backgroundColor = loseColor;
                        }



                        setTimeout(() => {
                            for (let i = 0; i < numSquares; i++) {

                                squares[i].style.backgroundColor = revertColor;
                            }
                        }, 500);
                    }

                    function repeatGameLost(counter) {
                        if (counter < 3) {
                            setTimeout(() => {
                                gameLost();
                                repeatGameLost(counter + 1);
                            }, 700);

                        }
                    }

                    repeatGameLost(0);
                    setTimeout(() => {
                        window.open(`lose.html?mode=${mode}&score=${score}`, '_self');
                    }, 3700);

                }
            } else {
                gameWonAudio.play();
                function gameWon() {

                    for (let i = 0; i < numSquares; i++) {

                        squares[i].style.backgroundColor = winColor;
                    }



                    setTimeout(() => {
                        for (let i = 0; i < numSquares; i++) {

                            squares[i].style.backgroundColor = revertColor;
                        }
                    }, 500);
                }

                function repeatGameWon(counter) {
                    if (counter < 3) {
                        setTimeout(() => {
                            gameWon();
                            repeatGameWon(counter + 1);
                        }, 1000);

                    }
                }

                repeatGameWon(0);
                setTimeout(() => {
                    window.open(`win.html?mode=${mode}&score=${score}`, '_self');
                }, 3700);

            }

        }

    })
}


updateSquares(numSquares)
gameplay();