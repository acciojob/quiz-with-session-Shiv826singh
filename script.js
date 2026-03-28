
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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], // ensure 4 options
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    // Question text
    const questionText = document.createTextNode(question.question);
    questionDiv.appendChild(questionText);

    // Choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore checked state (IMPORTANT for Cypress)
      if (userAnswers[i] === choice) {
        input.setAttribute("checked", "true");
      }

      // Save progress on selection
      input.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const text = document.createTextNode(choice);

      questionDiv.appendChild(input);
      questionDiv.appendChild(text);
    }

    questionsElement.appendChild(questionDiv);
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

// Submit handler
submitButton.addEventListener("click", function () {
  const score = calculateScore();

  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});

// Load saved score after refresh
function loadScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}.`;
  }
}

// Initial execution
renderQuestions();
loadScore();