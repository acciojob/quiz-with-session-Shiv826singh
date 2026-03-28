//your JS code here.

// Load saved progress from sessionStorage or initialize empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Get DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], // fixed to 4 options
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before render

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore saved answer
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save to sessionStorage on change
      choiceElement.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Calculate score
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  return score;
}

// Submit button handler
submitButton.addEventListener("click", function () {
  const score = calculateScore();

  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});

// Load score from localStorage on refresh
function loadSavedScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}.`;
  }
}

// Initial calls
renderQuestions();
loadSavedScore();