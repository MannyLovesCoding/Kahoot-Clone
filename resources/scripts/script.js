
// ERROR IS BECAUSE WHEN U CREATE A NEW QUESTION IT HAS 1 MORE LOCAL STORAGE than the first one so inner html doesnt work

let gamePin = window.localStorage.gamePin;
let createdQuiz = false;

// Index
function generateRandomName() { // Generates Random Name
    console.log('Generating Random Name');
    const names = ['Claustrophobic Teletubby', 'Chungus the fungus', 'Kermit Kermicide', 'Gucci Flippidy Flops', 'Emerald Goddess', 'The Beekeeper', 'Luna Star', 'Fresh Lovely', 'Eye Candy Kitten', 'Mafia Princess']; // List Of Random Names
    const randomName = names[Math.floor(Math.random() * names.length)]; // Generates Random Name
    const displayNameInput = document.getElementById('display-name');
    displayNameInput.value = randomName;
}

function enterGame() { // Starts Game
    console.log('Trying to start game');
    let emptyDisplayName = false;
    let emptyGamePin = false;
    let invaildGamePin = false;
    const displayNameInput = document.getElementById('display-name');
    const gamePinInput = document.getElementById('game-pin');
    if (displayNameInput.value.length == 0) {
        emptyDisplayName = true;
        console.log('Empty Display Name');
    }
    if (gamePinInput.value.length == 0) {
        emptyGamePin = true; 
        console.log('Empty Game Pin');  
    } else if (gamePinInput.value != gamePin) {
        invaildGamePin = true;
        console.log('Invaild Game Pin');
    }
    let msg;
    if (emptyDisplayName) {
        msg = 'Oops! You need to enter a Display Name before you can play';
        displayNameInput.style.borderColor = 'rgb(255, 51, 85)';
        displayNameInput.style.background = 'rgb(255, 242, 244)';
    }
    if (emptyGamePin) {
        msg = 'Oops! You need to enter a game PIN before you can play';
        gamePinInput.style.borderColor = 'rgb(255, 51, 85)';
        gamePinInput.style.background = 'rgb(255, 242, 244)';
    } 
     if (invaildGamePin) {
        msg = `We didn't recognize that game PIN. Please check and try again.`;
        gamePinInput.style.borderColor = 'rgb(255, 51, 85)';
        gamePinInput.style.background = 'rgb(255, 242, 244)';
    } 
     if (emptyDisplayName && emptyGamePin) {
        msg = 'Oops! You need to enter a game PIN and a Display Name before you can play';
        displayNameInput.style.borderColor = 'rgb(255, 51, 85)';
        displayNameInput.style.background = 'rgb(255, 242, 244)';
        gamePinInput.style.borderColor = 'rgb(255, 51, 85)';
        gamePinInput.style.background = 'rgb(255, 242, 244)';
    }
    if (!emptyDisplayName) {
        displayNameInput.style.borderColor = 'grey';
        displayNameInput.style.background = 'none';
    }
    if (!emptyGamePin && !invaildGamePin) {
        gamePinInput.style.borderColor = 'grey';
        gamePinInput.style.background = 'none';
    }
    invaildPopup(msg);
    if (!emptyDisplayName && !emptyGamePin && !invaildGamePin) { // CHECKS IF ALL VARIABLES ARE FALSE TO OPEN NEW GAME
        console.log('Starting Game');
        window.localStorage.setItem('name', displayNameInput.value);
        location.href = './resources/kahootquiz/kahootquiz.html';
    }
}

function invaildPopup(msg) { // Pop up if user inputs something invaild
    if (msg == undefined) {
        return;
    }
    console.log(msg);
    const container = document.getElementById('index_container');
    const popup = document.createElement('p');
    popup.innerHTML = msg;
    popup.id = 'popup';
    popup.style.position = 'absolute';
    popup.style.fontSize = '22px';
    popup.style.bottom = 0;
    popup.style.backgroundColor = 'rgb(226, 27, 60)';
    popup.style.width = '100%';
    popup.style.padding = '20px 0 20px 30px';
    document.body.appendChild(popup);

    setTimeout(removePopup, 5000);
}

function removePopup(){
    document.getElementById('popup').remove();
}

// kahoot creator studio

let questionNumber = 1;


function newQuestion() { // creates a neq question
    if (createdQuiz) {
        console.log('You already created a quiz');
        alert('You already created a quiz (clear localstorage to create a new quiz or click cancel)');
        return;
    }
    console.log('Trying to create another question');
    const questionInputs = document.getElementsByClassName(`question${questionNumber}-input`);
    console.log(questionInputs);
    let emptyQuestionInputs = false;
    for (let i = 0; i < document.getElementsByClassName(`question${questionNumber}-input`).length; i++) {
        if (document.getElementsByClassName(`question${questionNumber}-input`)[i].value.length < 1) {
            emptyQuestionInputs = true;
        }
    }
    if (emptyQuestionInputs) {
        console.log(`Please fill in all the questions and answers for question ${questionNumber}`);
        alert(`Please fill in all the questions and answers for question ${questionNumber}`);
        return;
    }
    const correctAnswerInput = document.getElementsByClassName(`correct-answer-input`)[questionNumber - 1];
    console.log(correctAnswerInput.value);
    // Add question to local storage
    console.log('Trying to add question & answers to local storage');
    const question = document.getElementsByClassName('question')[questionNumber - 1].value;
    window.localStorage.setItem(`question${questionNumber}`, question);
    const correctanswer = document.getElementsByClassName(`question${questionNumber}-input`)[correctAnswerInput.value].value;
    console.log(correctanswer);
    window.localStorage.setItem(`question${questionNumber}-answer-correct`, correctanswer);
    // create loop that creates new localstorage but skips over if its correct answer
   let x = 1; // makes it so x is out of the for loop so x is able to get bigger than 1
    for (let i = 0; i < document.getElementsByClassName(`question${questionNumber}-answer`).length; i++) {
        console.log('Going over loop --> questions');
        if (document.getElementsByClassName(`question${questionNumber}-answer`)[i].value == correctanswer) {
            x++;
            continue;
        }
        window.localStorage.setItem(`question${questionNumber}-answer${x}`, document.getElementsByClassName(`question${questionNumber}-answer`)[i].value);
        console.log('creating new local storage');
        x++;
    } 
    // Create a new question
    questionNumber++; // 1+ question
    const colours = ['red', 'blue', 'brown', 'yellow', 'beige', '#EADDCA', '#CD7F32'];
    const container = document.createElement('div');
    container.setAttribute('class', 'question-container');
    container.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
    container.style.padding = '25px';
    container.style.width = '200px';
    container.style.margin = '5px';
    container.style.borderRadius = '5px';
    // question title
    const questionTitleLabel = document.createElement('label');
    questionTitleLabel.innerHTML = `Question ${questionNumber}`;
    const questionTitleInput = document.createElement('input');
    questionTitleInput.setAttribute('type', 'text');
    questionTitleInput.setAttribute('class', `question${questionNumber}-input question`);
    container.appendChild(questionTitleLabel);
    container.appendChild(questionTitleInput);
    // for loop that creates answers
    for (let i = 1; i <= 4; i++) {
        // answer${i}}
        const questionAnswerLabel = document.createElement('label');
        questionAnswerLabel.innerHTML = `Answer ${i}`;
        const questionAnswerInput = document.createElement('input');
        questionAnswerInput.setAttribute('type', 'text');
        questionAnswerInput.setAttribute('class', `question${questionNumber}-input question${questionNumber}-answer`);
        container.appendChild(questionAnswerLabel);
        container.appendChild(questionAnswerInput);
    }
    const newCorrectAnswerLabel = document.createElement('label');
    newCorrectAnswerLabel.innerHTML = 'Correct Answer (1-4)';
    const newCorrectAnswerInput = document.createElement('input');
    newCorrectAnswerInput.setAttribute('type', 'number');
    newCorrectAnswerInput.setAttribute('class', `question${questionNumber}-input correct-answer-input`);
    newCorrectAnswerInput.setAttribute('min', '1');
    newCorrectAnswerInput.setAttribute('max', '4');
    container.appendChild(newCorrectAnswerLabel);
    container.appendChild(newCorrectAnswerInput);
    console.log(container);
    document.getElementById('questions').appendChild(container);
}

// returns & clears localstorage
function cancel() {
    location.href = '../../index.html';
    window.localStorage.clear();
}

// finish creating quiz
function createQuiz() {
    if (createdQuiz) {
        console.log('You already created a quiz');
        alert('You already created a quiz (clear localstorage to create a new quiz or click cancel)');
        return;
    }
    console.log('Trying to create quiz');
    // loop over every input on the page to check if its empty
    let emptyInputs = false;
    for (let i = 0; i < document.getElementsByTagName('input').length; i++) { // checks page for empty inputs
        if (document.getElementsByTagName('input')[i].value.length <= 0) {
            for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
                if (document.getElementsByTagName('input')[i].value.length <= 0) {
                    document.getElementsByTagName('input')[i].style.borderColor = 'red';
                } else {
                    document.getElementsByTagName('input')[i].style.borderColor = '';
                }
                
            }
            emptyInputs = true;
            break;
        } else {
            emptyInputs = false;
        }
    }
    console.log(emptyInputs);
    if (emptyInputs) {
        alert('Please fill in all the required inputs before trying to create a kahoot');
        return;
    }
    createdQuiz = true;
    console.log(createdQuiz);
    // check if localstorage is alreeady empty for 1 question then create window localstorage
    if (window.localStorage.length == 0) {
        const correctAnswerInput = document.getElementsByClassName(`correct-answer-input`)[questionNumber - 1];
        console.log(correctAnswerInput.value);
        // Add question to local storage
        console.log('Trying to add question & answers to local storage');
        const question = document.getElementsByClassName('question')[questionNumber - 1].value;
        window.localStorage.setItem(`question${questionNumber}`, question);
        const correctanswer = document.getElementsByClassName(`question${questionNumber}-input`)[correctAnswerInput.value].value;
        console.log(correctanswer);
        window.localStorage.setItem(`question${questionNumber}-answer-correct`, correctanswer);
        // create loop that creates new localstorage but skips over if its correct answer
       let x = 1; // makes it so x is out of the for loop so x is able to get bigger than 1
        for (let i = 0; i < document.getElementsByClassName(`question${questionNumber}-answer`).length; i++) {
            console.log('Going over loop --> questions');
            if (document.getElementsByClassName(`question${questionNumber}-answer`)[i].value == correctanswer) {
                x++;
                continue;
            }
            window.localStorage.setItem(`question${questionNumber}-answer${x}`, document.getElementsByClassName(`question${questionNumber}-answer`)[i].value);
            console.log('creating new local storage');
            x++;
        } 
        window.localStorage.setItem('quizName', document.getElementsByTagName('input')[0].value);
    } 
    if (window.localStorage.length >= 1) {
        const correctAnswerInput = document.getElementsByClassName(`correct-answer-input`)[questionNumber - 1];
        console.log(correctAnswerInput.value);
        // Add question to local storage
        console.log('Trying to add question & answers to local storage');
        const question = document.getElementsByClassName('question')[questionNumber - 1].value;
        window.localStorage.setItem(`question${questionNumber}`, question);
        const correctanswer = document.getElementsByClassName(`question${questionNumber}-input`)[correctAnswerInput.value].value;
        console.log(correctanswer);
        window.localStorage.setItem(`question${questionNumber}-answer-correct`, correctanswer);
        // create loop that creates new localstorage but skips over if its correct answer
       let x = 1; // makes it so x is out of the for loop so x is able to get bigger than 1
        for (let i = 0; i < document.getElementsByClassName(`question${questionNumber}-answer`).length; i++) {
            console.log('Going over loop --> questions');
            if (document.getElementsByClassName(`question${questionNumber}-answer`)[i].value == correctanswer) {
                x++;
                continue;
            }
            window.localStorage.setItem(`question${questionNumber}-answer${x}`, document.getElementsByClassName(`question${questionNumber}-answer`)[i].value);
            console.log('creating new local storage');
            x++;
        } 
        window.localStorage.setItem('quizName', document.getElementsByTagName('input')[0].value);
    }
    // Create random 6 digit pin
    const digit1 = Math.floor(Math.random() * 10);
    const digit2 = Math.floor(Math.random() * 10);
    const digit3 = Math.floor(Math.random() * 10);
    const digit4 = Math.floor(Math.random() * 10);
    const digit5 = Math.floor(Math.random() * 10);

    const digit6 = Math.floor(Math.random() * 10);
    const newGamePin = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
    window.localStorage.setItem('gamePin', newGamePin);
    let amountOfQuestions = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
        if (window.localStorage.getItem(`question${i}`)) {
            amountOfQuestions++;
        }
    }
    window.localStorage.setItem('amountOfQuestions', amountOfQuestions);
    alert(`Your game pin is: ${window.localStorage.gamePin}`);
    location.href = '../../index.html';
}   