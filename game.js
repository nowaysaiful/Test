const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const timerDisplay = document.getElementById('timer'); // Added timer display element
let currentQuestion = {};
let acceptingAnswers = false;
const timer = document.getElementById ('timer');
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timerInterval; // Variable to store the interval for the timer
const level = document.getElementById('level');


// Random questions
function generateArithmeticQuestion() {
    const operands = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const operators = ['+', '-', '×']; // Addition, Subtraction, Multiplication

    const operator = operators[Math.floor(Math.random() * operators.length)];
    let answer;

    // Ensure that subtraction does not give in negative numbers
    if (operator === '-') {
        operands.sort((a, b) => b - a); // Sort operands in descending order
        answer = operands[0] - operands[1];
    } else {
        switch (operator) {
            case '+':
                answer = operands[0] + operands[1];
                break;
            case '×':
                answer = operands[0] * operands[1];
                break;
            default:
                break;
        }
    }

    return {
        question: `What is ${operands[0]} ${operator} ${operands[1]}?`,
        choices: [
            answer.toString(),
            (answer + Math.floor(Math.random() * 5) + 1).toString(), // Incorrect answer
            (answer - Math.floor(Math.random() * 5) - 1).toString(), // Incorrect answer
            (answer + Math.floor(Math.random() * 5) + 1).toString() // Incorrect answer
        ],
        answer: answer.toString()
    };
}


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Start game function to be called after selecting a level
function startGame(selectedLevel) {
    questionCounter = 0;
    score = 0;
    availableQuestions = [];
    timer.style.display = 'none';
    
    
    for (let i = 0; i < MAX_QUESTIONS; i++) {
        availableQuestions.push(generateArithmeticQuestion());
    }
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
    
}

// Function to get a new question
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // Shuffle the choices array
    const shuffledChoices = shuffleArray(currentQuestion.choices);

    choices.forEach((choice, index) => {
        choice.innerText = shuffledChoices[index];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function startTimer(duration, display, level) {

    if (level === "level-1") {
        duration = 20; 
    } else if (level === "level-2") {
        duration = 10; 
    }

    let timer = duration;
    timerInterval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        display.textContent = minutes + ':' + seconds;


        if (--timer < 0) {
            clearInterval(timerInterval);
            acceptingAnswers = false; // Disable answering until next question

            playTimeoutSound();

            setTimeout(getNewQuestion, 1000);
        }
    }, 1000); 
}



playBackroundMusic();
// Event listener for choice clicks
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        clearInterval(timerInterval); // Clear timer when user selects an answer
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.innerText;

        const classToApply =
            selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
            playCorrectSound();

        }
        if (classToApply === 'incorrect'){
            playIncorrectSound();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            /*startTimer(30, timerDisplay); // Restart timer for the next question*/
        }, 1000);
    });
}); 

// Function to increment score
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

// Initial setup
document.addEventListener("DOMContentLoaded", function() {
    const levelsSection = document.getElementById('home');
    const gameSection = document.getElementById('game');

    const levelBtns = document.querySelectorAll('.level-btn');
    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLevel = parseInt(btn.id.split('-')[1]); // Extract the level number from the button id
            levelsSection.classList.add('hidden');
            gameSection.classList.remove('hidden');
            startGame(selectedLevel);
        });
    });
});



function playCorrectSound(){
    const correctSound = new Audio("correct.mp3")
    correctSound.play();
}
function playIncorrectSound(){
    const incorrectSound = new Audio("incorrect.mp3")
    incorrectSound.play();
}
function playScoreSound(){
    const scoreSound = new Audio("tada-fanfare.mp3")
    scoreSound.play();
}
function playClickSound(){
    const playClickSound = new Audio("clicksound.mp3")
    clicksoundSound.play();
}
function playBackroundMusic (){
    const backroundmusic = new Audio ("backroundmusic.mp3")
    backroundmusic.play();
    const audio = new Audio ("backroundmusic.mp3");
    backroundmusic.volume = 0.05;
    backroundmusic.play();
}




