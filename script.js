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
    {
        image: '8.png',
        answers: [
            { text: 'Выделение плаценты по Абуладзе', correct: false },
            { text: 'Выделение плаценты по Креде-Лазаревичу', correct: false },
            { text: 'Выделение плаценты по Гентеру', correct: false },
            { text: 'Ручное отделение плаценты', correct: true }
        ]
    },
    {
        image: '9.png',
        answers: [
            { text: 'Выделение плаценты по Абуладзе', correct: true },
            { text: 'Выделение плаценты по Креде-Лазаревичу', correct: false },
            { text: 'Выделение плаценты по Гентеру', correct: false },
            { text: 'Ручное отделение плаценты', correct: false }
        ]
    },
    {
        image: '10.png',
        answers: [
            { text: 'Выделение плаценты по Абуладзе', correct: false },
            { text: 'Выделение плаценты по Креде-Лазаревичу', correct: true },
            { text: 'Выделение плаценты по Гентеру', correct: false },
            { text: 'Ручное отделение плаценты', correct: false }
        ]
    },
    {
        image: '11.png',
        answers: [
            { text: 'Выделение плаценты по Абуладзе', correct: false },
            { text: 'Выделение плаценты по Креде-Лазаревичу', correct: false },
            { text: 'Выделение плаценты по Гентеру', correct: true },
            { text: 'Ручное отделение плаценты', correct: false }
        ]
    },
    {
        image: '12.png',
        answers: [
            { text: 'Признак Чукалова-Кюстнера', correct: false },
            { text: 'Признак Шредера', correct: false },
            { text: 'Наружно-внутренний массаж матки', correct: true },
            { text: 'Признак Альфельда', correct: false }
        ]
    },
    {
        image: '13.png',
        answers: [
            { text: 'Признак Чукалова-Кюстнера', correct: true },
            { text: 'Признак Шредера', correct: false },
            { text: 'Наружно-внутренний массаж матки', correct: false },
            { text: 'Признак Альфельда', correct: false }
        ]
    },
    {
        image: '14.png',
        answers: [
            { text: 'Полное ножное предлежание', correct: true },
            { text: 'Чисто ягодичное предлежание', correct: false },
            { text: 'Затылочное предлежание', correct: false },
            { text: 'Неполное ножное предлежание', correct: false }
        ]
    },
    {
        image: '15.png',
        answers: [
            { text: 'Чисто ягодичное предлежание', correct: true },
            { text: 'Полное ножное предлежание', correct: false },
            { text: 'Затылочное предлежание', correct: false },
            { text: 'Неполное ножное предлежание', correct: false }
        ]
    },
    {
        image: '16.png',
        answers: [
            { text: 'Затылочное предлежание', correct: true },
            { text: 'Чисто ягодичное предлежание', correct: false },
            { text: 'Полное ножное предлежание', correct: false },
            { text: 'Неполное ножное предлежание', correct: false }
        ]
    },
    {
        image: '17.png',
        answers: [
            { text: 'Неполное ножное предлежание', correct: true },
            { text: 'Затылочное предлежание', correct: false },
            { text: 'Чисто ягодичное предлежание', correct: false },
            { text: 'Полное ножное предлежание', correct: false }
        ]
    },
    {
        image: '18.png',
        answers: [
            { text: 'Лицевое предлежание', correct: true },
            { text: 'Затылочное предлежание', correct: false },
            { text: 'Клинически узкий таз', correct: false },
            { text: 'Анатомически узкий таз', correct: false }
        ]
    },
    {
        image: '19.png',
        answers: [
            { text: 'Коллизия', correct: true },
            { text: 'Сиамские близнецы', correct: false },
            { text: 'Декапитация', correct: false },
            { text: 'Денацификация', correct: false }
        ]
    },
    {
        image: '20.png',
        answers: [
            { text: 'Декапитация', correct: true },
            { text: 'Демилитаризация', correct: false },
            { text: 'Денацификация', correct: false },
            { text: 'Коллизия', correct: false }
        ]
    },
    {
        image: '21.png',
        answers: [
            { text: 'Поворот на ножку', correct: true },
            { text: 'Массаж матки на кулаке', correct: false },
            { text: 'Массаж матки на плоде', correct: false },
            { text: 'Пособие по Цовьянову', correct: false }
        ]
    },
    {
        image: '22.png',
        answers: [
            { text: 'Пособие по Цовьянову', correct: true },
            { text: 'Массаж матки на кулаке', correct: false },
            { text: 'Массаж матки на плоде', correct: false },
            { text: 'Экстракция за паховый сгиб', correct: false }
        ]
    },
    {
        image: '23.png',
        answers: [
            { text: 'Экстракция за паховый сгиб', correct: true },
            { text: 'Массаж матки на кулаке', correct: false },
            { text: 'Массаж матки на плоде', correct: false },
            { text: 'Поворот на ножку', correct: false }
        ]
    },
    {
        image: '24.png',
        answers: [
            { text: 'Измерение диагональной конъюгаты', correct: true },
            { text: 'Измерение истинной конъюгаты', correct: false },
            { text: 'Измерение индекса Соловьева', correct: false },
            { text: 'Измерение наружной конъюгаты', correct: false }
        ]
    },
    {
        image: '25.png',
        answers: [
            { text: 'Классическое ручное пособие', correct: true },
            { text: 'Экстракция за паховый сгиб', correct: false },
            { text: 'Аборт нахуй', correct: false },
            { text: 'Поворот на ножку', correct: false }
        ]
    },
    {
        image: '26.png',
        answers: [
            { text: 'Срединнолатеральная эпизиотомия', correct: true },
            { text: 'Перинеотомия', correct: false },
            { text: 'Декапитация (отрежут голову)', correct: false },
            { text: 'Экстирпация ануса', correct: false }
        ]
    },
    {
        image: '27.png',
        answers: [
            { text: 'Головка над входом', correct: true },
            { text: 'Головка прижата ко входу', correct: false },
            { text: 'Головка малым сегментом во входе', correct: false },
            { text: 'Головка большим сегментом во входе', correct: false }
        ]
    },
    {
        image: '28.png',
        answers: [
            { text: 'Головка прижата ко входу', correct: true },
            { text: 'Головка в полости малого таза', correct: false },
            { text: 'Головка малым сегментом во входе', correct: false },
            { text: 'Головка большим сегментом во входе', correct: false }
        ]
    },
    {
        image: '29.png',
        answers: [
            { text: 'Головка малым сегментом во входе', correct: true },
            { text: 'Головка большим сегментом во входе', correct: false },
            { text: 'Головка в полости малого таза', correct: false },
            { text: 'Головка на тазовом дне', correct: false }
        ]
    },
    {
        image: '30.png',
        answers: [
            { text: 'Головка малым сегментом во входе', correct: false },
            { text: 'Головка большим сегментом во входе', correct: true },
            { text: 'Головка в полости малого таза', correct: false },
            { text: 'Головка на тазовом дне', correct: false }
        ]
    },
    {
        image: '31.png',
        answers: [
            { text: 'Головка малым сегментом во входе', correct: false },
            { text: 'Головка большим сегментом во входе', correct: false },
            { text: 'Головка в полости малого таза', correct: true },
            { text: 'Головка на тазовом дне', correct: false }
        ]
    },
    {
        image: '32.png',
        answers: [
            { text: 'Головка малым сегментом во входе', correct: false },
            { text: 'Головка большим сегментом во входе', correct: false },
            { text: 'Головка в полости малого таза', correct: false },
            { text: 'Головка на тазовом дне', correct: true }
        ]
    },
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