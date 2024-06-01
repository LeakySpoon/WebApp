const questions = [
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
];

let currentQuestionIndex = 0;

function startGame() {
    currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex]);
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
        alert('Correct!');
        nextButton.style.display = 'block';
    } else {
        alert('Wrong!');
        explanationElement.innerText = explanation;
        explanationElement.style.display = 'block';
        nextButton.style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        alert('Quiz completed!');
        startGame();
    }
}

function shuffleAnswers(answers, correctIndex) {
    const answersWithIndex = answers.map((answer, index) => ({ answer, index }));
    const shuffled = answersWithIndex.sort(() => Math.random() - 0.5);

    const newCorrectIndex = shuffled.findIndex(item => item.index === correctIndex);
    const shuffledAnswers = shuffled.map(item => item.answer);

    return { answers: shuffledAnswers, correct: newCorrectIndex };
}

document.addEventListener('DOMContentLoaded', startGame);