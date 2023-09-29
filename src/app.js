const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest country in the world?",
    answers: ["Russia", "Canada", "China", "United States"],
    correctAnswer: "Russia",
  },
  {
    question: "What is the currency of Japan?",
    answers: ["Yuan", "Yen", "Dollar", "Euro"],
    correctAnswer: "Yen",
  },{
    question: "What is the largest planet in our solar system?",
    answers: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Jupiter",
  }, {
    question: "What is the smallest country in the world?",
    answers: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
  }
];

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;

// Select DOM elements
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");

// Load the first question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Clear previous answer options
  answerOptions.innerHTML = "";

  // Add answer options dinamically
  currentQuestion.answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", () => checkAnswer(answer));
    answerOptions.appendChild(answerButton);
  });
}

// Check the selected answer
function checkAnswer(selectedAnswer) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Show the results
function showResults() {
  questionText.textContent = "Quiz finished!";
  answerOptions.innerHTML = "";
  scoreText.textContent = `Your score: ${score} out of ${quizData.length}`;
  nextButton.style.display = "none";
}

// Load the first question
loadQuestion();