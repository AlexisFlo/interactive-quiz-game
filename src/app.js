let quizData = [
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
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Jupiter",
  }, 
  {
    question: "What is the smallest country in the world?",
    answers: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
  },
  {
    question: "Which renewable energy source harnesses the energy from the sun to generate electricity?",
    answers: ["Wind power", "Biomass energy", "Solar Power", "Geothermal"],
    correctAnswer: "Solar Power",
  },
  {
    question: "Which greenhouse gas is primarily responsible for global warming?",
    answers: ["Oxygen (O2)", "Nitrogen (N2)", "Methane (CH4)", "Carbon dioxide (CO2)"],
    correctAnswer: "Carbon dioxide (CO2)",
  },
  {
    question: "What is the grammatical term for a word that joins words, phrases, or clauses together in a sentence?",
    answers: ["Adjective", "Verb", "Conjunction", "Preposition"],
    correctAnswer: "Conjunction",
  },{
    question:"What is the BPM (Beats Per Minute) range typically associated with hardstyle music?",
    answers: ["100-120 BPM", "160-180 BPM", "200-220 BPM", "130-150 BPM"],
    correctAnswer: "130-150 BPM",
  },
  {
    question: "What distinguishes hardstyle from other electronic dance music genres, such as trance or house?",
    answers: ["Its use of organic instruments.", "Its slower tempo and melodic elements.", "Its heavy use of distorted kicks and energetic synth melodies.", "Its focus on ambient and atmospheric sounds."],
    correctAnswer: "Its heavy use of distorted kicks and energetic synth melodies.",
  }
];

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;


// Select DOM elements
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const scoreText = document.getElementById("score");
const restartButton = document.createElement("button");
const nextButton = document.getElementById("next-button");
const timerText = document.getElementById("timer");

// Shuffle the quizData array
quizData.sort(() => Math.random() - 0.5);

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
    answerButton.addEventListener("click", () => {
      checkAnswer(answer);
    });
    answerOptions.appendChild(answerButton);
  });

  restartButton.style.display = "none";
  answerOptions.appendChild(restartButton);

  // Start the timer  
  timeLeft = 10;
  timerText.textContent = `Time left: ${timeLeft} seconds`;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time left: ${timeLeft} seconds`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      checkAnswer("");
    }
  }, 1000);
}

// Check the selected answer
function checkAnswer(answer) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (answer === currentQuestion.correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  scoreText.textContent = `Score: ${score}`;
  
  // Check if the restartButton exists in the DOM
  const restartButton = document.getElementById("restart-button");
  if (restartButton) {
    restartButton.style.display = "none";
  }
}

// Show the results
function showResults() {
  questionText.textContent = "Quiz finished!";
  answerOptions.innerHTML = "";
  scoreText.textContent = `Your score: ${score} out of ${quizData.length}`;
  nextButton.style.display = "none";
  clearInterval(timerInterval);
  timerText.textContent = "";

  // Add a button for restarting the quiz
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener("click", restartQuiz);
  answerOptions.appendChild(restartButton);
}

// Load the first question
loadQuestion();