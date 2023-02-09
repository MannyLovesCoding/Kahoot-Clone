// bugs
// fix create kahoot when you click add new question and click finish creating kahoot it doesnt save
// fix window.localstorage bug (inner.html bug when multiple questions)


document.getElementById('name').innerHTML = `Name:${window.localStorage.name}`;
document.getElementById('question').innerHTML = window.localStorage.question1;
document.getElementById('questionsRight').innerHTML = `0/${window.localStorage.amountOfQuestions} questions right`;
let questionNumber = 1;
let score = 0;
const scoreAdd = 500;
const scoreElement = document.getElementById('score');
let streak = 0;
let questionsRight = 0;
let gameInProgress = true; // true or false for button cursor / game menu
const streakElement = document.getElementById('streak');
// for loop that goes over local storage and sets ans   wers to answers
let y = 0;
for (let i = 0; i < localStorage.length; i++) { // sets game answers to the buttons
    const key = localStorage.key(i)
    console.log(`${key}`);
    if (key.includes(`question${questionNumber}-answer`)) {
        document.getElementsByClassName('answer-btn')[y].innerHTML = `${localStorage.getItem(key)}`;
        y++;
    }
}

function checkAnswer(buttonArrayNumber) {
    console.log('Checking Answer');
    if (!gameInProgress) { // if game ended
        console.log('Game Not In Progress');
        return;
    }
    if (document.getElementsByClassName('answer-btn')[buttonArrayNumber].innerHTML == window.localStorage.getItem(`question${questionNumber}-answer-correct`)) {
        console.log('Correct Answer');
        showPopUp(true);
        score += scoreAdd;
        scoreElement.innerHTML = `Score:${score}`;
        streak++;
        streakElement.innerHTML = `Streak:${streak}`;
        questionsRight++;
        document.getElementById('questionsRight').innerHTML = `${questionsRight}/${window.localStorage.amountOfQuestions} questions right`;

        // next question if there is
        // check if next question
        questionNumber++; // add 1 to question number to check for more questions
        console.log(questionNumber);
        if (window.localStorage.getItem(`question${questionNumber}`)) {
            document.getElementById('question').innerHTML = window.localStorage.getItem(`question${questionNumber}`);
            console.log('Found Another Question');
            y = 0;
            for (let i = 0; i < localStorage.length; i++) { // sets game answers to the buttons
                const key = localStorage.key(i);
                console.log(`${key}`);
                if (key.includes(`question${questionNumber}-answer`)) {
                    document.getElementsByClassName('answer-btn')[y].innerHTML = `${localStorage.getItem(key)}`;
                    y++;
                }
            }
        }
    } else {
        console.log('Incorrect Answer');
        questionNumber++;
        console.log(questionNumber);
        if (window.localStorage.getItem(`question${questionNumber}`)) {
            document.getElementById('question').innerHTML = window.localStorage.getItem(`question${questionNumber}`);
            console.log('Found Another Question');
            y = 0;
            for (let i = 0; i < localStorage.length; i++) { // sets game answers to the buttons
                const key = localStorage.key(i);
                console.log(`${key}`);
                if (key.includes(`question${questionNumber}-answer`)) {
                    document.getElementsByClassName('answer-btn')[y].innerHTML = `${localStorage.getItem(key)}`;
                    y++;
                }
            }
        }
        showPopUp(false);
        streak = 0;
        streakElement.innerHTML = `Streak:${streak}`;
    }
    if (!window.localStorage.getItem(`question${questionNumber}`)) {
        console.log('Game Ended');
        gameInProgress = false;
        document.getElementById('game-end-score').innerHTML = `Score: ${score}`;
        document.getElementById('game-end-streak').innerHTML = `Streak: ${streak}`;
        document.getElementById('game-end-questionsRight').innerHTML = `${questionsRight}/${window.localStorage.amountOfQuestions} questions right`;
        document.getElementById('game-end').style.visibility = 'visible';
        // for loop that goes over buttons and sets cursor to none 
    }
    // change answers still if incorrect
}

function showPopUp(correct) {
    const popUp = document.createElement('p');
    if (correct) {
        popUp.innerHTML = 'Correct!';
        popUp.style.backgroundColor = 'green';
    } else {
        popUp.innerHTML = 'Incorrect';
        popUp.style.backgroundColor = 'red';
    }
    popUp.style.color = 'white';
    popUp.style.fontSize = '60px';
    popUp.style.paddingTop = '15%';
    popUp.style.textAlign = 'center';
    popUp.style.position = 'absolute';
    popUp.style.top = 0;
    popUp.style.width = '100%';
    popUp.style.height = '100%';
    document.body.appendChild(popUp);
    setTimeout(() => {
        popUp.remove();
    }, 5000);
}
