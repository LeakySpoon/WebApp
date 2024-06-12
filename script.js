const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const imageContainerElement = document.getElementById('image-container');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

const questions = [
    {
        image: '1.png',
        answers: [
            { text: 'Ромб Михаэлиса', correct: true },
            { text: 'Плоскорахитический таз', correct: false },
            { text: 'Жопа? хз', correct: false },
            { text: 'Поперечносуженный таз', correct: false }
        ]
    },
    {
        image: '2.png',
        answers: [
            { text: 'Метод Леопольда', correct: false },
            { text: 'Метод Морисо-Левре-Лашапелль', correct: true },
            { text: 'Метод Абуладзе', correct: false },
            { text: 'Метод Креде-Лазаревича', correct: false }
        ]
    },
    {
        image: '3.png',
        answers: [
            { text: 'Первый прием Леопольда', correct: false },
            { text: 'Второй прием Леопольда', correct: true },
            { text: 'Третий прием Леопольда', correct: false },
            { text: 'Четвертый прием Леопольда', correct: false }
        ]
    },
    {
        image: '4.png',
        answers: [
            { text: 'Первый прием Леопольда', correct: true },
            { text: 'Второй прием Леопольда', correct: false },
            { text: 'Третий прием Леопольда', correct: false },
            { text: 'Четвертый прием Леопольда', correct: false }
        ]
    },
    {
        image: '5.png',
        answers: [
            { text: 'Первый прием Леопольда', correct: false },
            { text: 'Второй прием Леопольда', correct: false },
            { text: 'Третий прием Леопольда', correct: true },
            { text: 'Четвертый прием Леопольда', correct: false }
        ]
    },
    {
        image: '6.png',
        answers: [
            { text: 'Первый прием Леопольда', correct: false },
            { text: 'Второй прием Леопольда', correct: false },
            { text: 'Третий прием Леопольда', correct: false },
            { text: 'Четвертый прием Леопольда', correct: true }
        ]
    },
    {
        image: '7.png',
        answers: [
            { text: 'Разрыв промежности', correct: false },
            { text: 'Перинеотомия', correct: false },
            { text: 'Период раскрытия', correct: false },
            { text: 'Период изгнания', correct: true }
        ]
    },
    // Add more questions as needed
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= shuffledQuestions.length) {
        shuffleQuestions();
        currentQuestionIndex = 0;
    }
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffleQuestions();
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    const img = document.createElement('img');
    img.src = question.image;
    img.alt = 'Quiz Image';
    imageContainerElement.appendChild(img);

    question.answers.sort(() => Math.random() - 0.5);
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    while (imageContainerElement.firstChild) {
        imageContainerElement.removeChild(imageContainerElement.firstChild);
    }
}

function selectAnswer(button, answer) {
    if (answer.correct) {
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
    }
    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.disabled = true;
        const correctAnswer = shuffledQuestions[currentQuestionIndex].answers.find(ans => ans.correct);
        if (btn.innerText === correctAnswer.text) {
            btn.classList.add('correct');
        } else if (!answer.correct && btn !== button) {
            btn.classList.add('wrong');
        }
    });
    nextButton.classList.remove('hide');
}