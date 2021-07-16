
let min = 1,
    max = 10,
    rightNumber = Math.floor(Math.random() * Math.floor(max)) + min,
    remain = 3;
const mainBody = document.querySelector('#mainBody'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#input'),
    message = document.querySelector('.message'),
    progress = document.querySelector('.progress-bar');

minNum.textContent = min;
maxNum.textContent = max;

mainBody.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('play-again')) {
        window.location.reload();
    }
});
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    guessBtn.disabled = true;

    setTimeout(function () {
        guessBtn.disabled = false;
        if (isNaN(guess) || guess<min || guess>max){
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        } else {
            if (guess === rightNumber) {
                gameOver(true, `${rightNumber} is Correct, YOU WIN!!!`);
                hints('100%', '30px', 'bg-success', "Congratulations!");
            } else {
                remain -= 1;
                if (remain === 0) {
                    gameOver(false, `Game over! The correct number is ${rightNumber}`);
                    hints('100%', '25px', 'bg-danger', "LOSER");
                } else {
                    guessInput.style.borderColor = 'red';
                    message.style.color = 'red';
                    guessInput.value = '';
                    let unknown = '';
                    remain === 1 ? unknown = 'guess' : unknown = 'guesses';
                    setMessage(`${guess} is not correct, ${remain} ${unknown} Left `, 'red');
                    if (guess < rightNumber) {
                        setMessage(`${guess} is smaller than Correct Number, ${remain} ${unknown} Left `, 'red');
                    } else if (guess > rightNumber) {
                        setMessage(`${guess} is bigger than Correct Number, ${remain} ${unknown} Left `, 'red');
                    }
                    switch (remain) {
                        case 2:
                            hints('33%', '25px', 'bg-info', "Wrong!! 2 Guess Left ");
                            break;
                        case 1:
                            hints('66%', '25px', 'bg-warning', "Wrong!! 1 Guess Left ");
                            break;
                    }
                }
            }
        }
    }, 1000);

});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg, color);
    guessBtn.innerHTML = 'Try Again!';
    guessBtn.className += ' play-again';
}

function getRandWinNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function setMessage(msg, color) {
    message.innerHTML = msg;
    message.style.color = color;
}

function hints(width, parentHeight, addClass, text) {
    progress.className = 'progress-bar';
    progress.style.width = width;
    progress.parentElement.style.height = parentHeight;
    progress.classList.add(addClass);
    progress.innerHTML = text;
}