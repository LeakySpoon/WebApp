const questions = {
    general: [
        {
            question: "What is the capital of France?",
            answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
            correct: 2,
            explanation: "Paris is the capital and most populous city of France."
        },
        {
            image: "path/to/image.jpg",
            answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correct: 1,
            explanation: "This image depicts [explanation related to the image]."
        },
        {
            question: "Who wrote 'To Be, or Not To Be'?",
            answers: ["Shakespeare", "Hemingway", "Tolkien", "Rowling"],
            correct: 0,
            explanation: "This famous line is from 'Hamlet' by William Shakespeare."
        }
    ],
    history: [
        {
            question: "Who was the first president of the United States?",
            answers: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
            correct: 0,
            explanation: "George Washington was the first president of the United States."
        },
        {
            question: "In what year did World War II end?",
            answers: ["1942", "1945", "1948", "1950"],
            correct: 1,
            explanation: "World War II ended in 1945."
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            answers: ["O2", "H2O", "CO2", "HO"],
            correct: 1,
            explanation: "The chemical symbol for water is H2O."
        },
        {
            question: "What planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: 1,
            explanation: "Mars is known as the Red Planet due to its reddish appearance."
        }
    ]
};

let currentQuestionIndex = 0;
let shuffledQuestions = [];
let selectedTopic = 'general';

function selectTopic(topic) {
    selectedTopic = topic;
    startGame();
}

function startGame() {
    const menuContainer = document.getElementById('menu-container');
    const quizContainer = document.getElementById('quiz-container');

    menuContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    document.getElementById('back-button').style.display = 'block';
    shuffledQuestions = shuffleArray(questions[selectedTopic]);
    currentQuestionIndex = 0;
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function goToMenu() {
    const menuContainer = document.getElementById('menu-container');
    const quizContainer = document.getElementById('quiz-container');

    menuContainer.style.display = 'block';
    quizContainer.style.display = 'none';
}

function showQuestion(question) {
    const questionElement = document.getElementById('question');
    const questionImageElement = document.getElementById('question-image');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const explanationElement = document.getElementById('explanation');
    const nextButton = document.getElementById('next-button');

    explanationElement.style.display = 'none';
    nextButton.style.display = 'none';

    if (question.question) {
        questionElement.innerText = question.question;
        questionElement.style.display = 'block';
        questionImageElement.style.display = 'none';
    } else if (question.image) {
        questionImageElement.src = question.image;
        questionElement.style.display = 'none';
        questionImageElement.style.display = 'block';
    }

    answerButtonsElement.innerHTML = '';

    const shuffledAnswers = shuffleAnswers(question.answers, question.correct);

    shuffledAnswers.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', () => selectAnswer(index, shuffledAnswers.correct, question.explanation));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(selectedIndex, correctIndex, explanation) {
    const explanationElement = document.getElementById('explanation');
    const nextButton = document.getElementById('next-button');

    if (selectedIndex === correctIndex) {
        nextQuestion();
    } else {
        explanationElement.innerText = explanation;
        explanationElement.style.display = 'block';
        nextButton.style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= shuffledQuestions.length) {
        shuffledQuestions = shuffleArray(questions[selectedTopic]);
        currentQuestionIndex = 0;
    }
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function shuffleAnswers(answers, correctIndex) {
    const answersWithIndex = answers.map((answer, index) => ({ answer, index }));
    const shuffled = answersWithIndex.sort(() => Math.random() - 0.5);

    const newCorrectIndex = shuffled.findIndex(item => item.index === correctIndex);
    const shuffledAnswers = shuffled.map(item => item.answer);

    return { answers: shuffledAnswers, correct: newCorrectIndex };
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial setup or any additional startup code
});