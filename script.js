// List of questions, choices, and answers
var questions = [
  {
    title:
      "Which of the following function of Boolean object returns a string of either 'true' or 'false' depending upon the value of the object?",
    choices: ["toSource()", "valueOf()", "toString()"],
    answer: "toString()"
  },
  {
    title: "JavaScript is _______ language",
    choices: [
      "scripting",
      "programming",
      "both scripting and programming",
      "application"
    ],
    answer: "scripting"
  },
  {
    title: "Which of the following is not considered a JavaScript operator?",
    choices: ["new", "this", "delete", "typeof"],
    answer: "this"
  },
  {
    title: "Using _______ statement is how you test for a specific condition",
    choices: ["select", "if", "switch", "for"],
    answer: "if"
  },
  {
    title: "JavaScript can be written",
    choices: [
      "directly into JS file and included into HTML",
      "directly on the server page",
      "directly into HTML pages",
      "all choices are correct"
    ],
    answer: "directly into JS file and included into HTML"
  }
];

// Set values of functions
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Starting the game

function start() {
  timeLeft = 75;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
  next();
}

//stop the timer to end the game
function endGame() {
  clearInterval(timer);

  var quizContent =
    `
    <h2>Game over!</h2>
    <h3>You got a ` +
    score +
    ` /100!</h3>
    <h3>That means you got ` +
    score / 20 +
    ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  getScore();
}

function getScore() {
  var quizContent =
    `
    <h2>` +
    localStorage.getItem("highscoreName") +
    `'s highscore is:</h2>
    <h1>` +
    localStorage.getItem("highscore") +
    `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

//reset the game
function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
  timeLeft -= 15;
  next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
  score += 20;
  next();
}

//loops through the questions
function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endGame();
    return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>";

  for (
    var buttonLoop = 0;
    buttonLoop < questions[currentQuestion].choices.length;
    buttonLoop++
  ) {
    var buttonCode = '<button onclick="[ANS]">[CHOICE]</button>';
    buttonCode = buttonCode.replace(
      "[CHOICE]",
      questions[currentQuestion].choices[buttonLoop]
    );
    if (
      questions[currentQuestion].choices[buttonLoop] ==
      questions[currentQuestion].answer
    ) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode;
  }

  document.getElementById("quizBody").innerHTML = quizContent;
}
