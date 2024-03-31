document.addEventListener("DOMContentLoaded", function() {
    let currentLevel;
    let score = 0;
    let questionsAttempted = 0;
    let num1, num2;

    function startQuiz() {
        document.getElementById("quiz").style.display = "block";
        document.getElementsByClassName("container")[0].style.display = "none";
    }

    function exitApp() {
        window.close(); // Close the window/tab
    }

    function startLevel(level) {
        currentLevel = level;
        score = 0;
        questionsAttempted = 0;
        document.getElementById("quiz").style.display = "none";
        document.getElementById("question").style.display = "block";
        generateQuestion();
    }

    function generateQuestion() {
        if (questionsAttempted < 5) {
            switch (currentLevel) {
                case 1:
                    num1 = getRandomNumber(1, 10);
                    num2 = getRandomNumber(1, 10);
                    break;
                case 2:
                    num1 = getRandomNumber(10, 20);
                    num2 = getRandomNumber(10, 20);
                    break;
                case 3:
                    num1 = getRandomNumber(20, 30);
                    num2 = getRandomNumber(20, 30);
                    break;
            }
            let questionText = document.getElementById("questionText");
            questionText.textContent = `What is ${num1} + ${num2}?`;
        } else {
            alert(`Quiz Finished. Your score: ${score}/5`);
            document.getElementById("question").style.display = "none";
            document.getElementsByClassName("container")[0].style.display = "block";
        }
    }

    function checkAnswer() {
        let userAnswer = parseInt(document.getElementById("answerInput").value);
        let answer = num1 + num2;
        if (userAnswer === answer) {
            alert("Correct! Good job!");
            score++;
        }
        questionsAttempted++;
        generateQuestion();
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    // Attach click event listeners
    document.getElementById("startBtn").addEventListener("click", startQuiz);
    document.getElementById("exitBtn").addEventListener("click", exitApp);
    document.getElementById("level1Btn").addEventListener("click", function() { startLevel(1); });
    document.getElementById("level2Btn").addEventListener("click", function() { startLevel(2); });
    document.getElementById("level3Btn").addEventListener("click", function() { startLevel(3); });
    document.getElementById("submitBtn").addEventListener("click", checkAnswer);
});

window.close();