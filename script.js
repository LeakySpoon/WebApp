document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const hintButton = document.getElementById('hint-btn');
    const backButton = document.getElementById('back-btn');
    const questionContainerElement = document.getElementById('question-container');
    const imageContainerElement = document.getElementById('image-container');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const hintContainerElement = document.getElementById('hint-container');
    const hintTextElement = document.getElementById('hint-text');

    let shuffledQuestions, currentQuestionIndex;

    const questions = [
        {
            image: '1.png',
            answers: [
                { text: 'Перелом Галеацци', correct: true },
                { text: 'Перелом Монтеджи', correct: false },
                { text: 'Перелом Смита', correct: false },
                { text: 'Перелом Коллеса', correct: false }
            ],
            hint : 'Комбинированное повреждение, характеризующееся переломом лучевой кости в нижней трети с присоединением вывиха головки локтевой кости.\n'
        },
        {
            image: '2.png',
            answers: [
                { text: 'Перелом Коллеса', correct: false },
                { text: 'Перелом Смита', correct: true },
                { text: 'Перелом Галеацци', correct: false },
                { text: 'Перелом Монтеджи', correct: false }
            ],
            hint : 'Сгибательный перелом лучевой кости'
        },
        {
            image: '3.png',
            answers: [
                { text: 'Перелом Смита', correct: false },
                { text: 'Перелом Коллеса', correct: true },
                { text: 'Перелом Галеацци', correct: false },
                { text: 'Перелом Монтеджи', correct: false }
            ],
            hint : 'Разгибательный перелом лучевой кости'
        },
        {
            image: '4.png',
            answers: [
                { text: 'Перелом Хатчинсона (Гетчинсона)', correct: true },
                { text: 'Перелом Латенера', correct: false },
                { text: 'Перелом Смита', correct: false },
                { text: 'Перелом Коллеса', correct: false }
            ],
            hint : 'Изолированный перелом шиловидного отростка лучевой кости'
        },
        {
            image: '5.png',
            answers: [
                { text: 'Перелом', correct: false },
                { text: 'Перелом', correct: false },
                { text: 'Перелом Буша', correct: true },
                { text: 'Перелом', correct: false }
            ],
            hint : ''
        },
        {
            image: '6.png',
            answers: [
                { text: 'Перелом', correct: false },
                { text: 'Перелом', correct: false },
                { text: 'Перелом', correct: false },
                { text: 'Маршевый перелом', correct: true }
            ],
            hint : ''
        },
        {
            image: '7.png',
            answers: [
                { text: 'Перелом', correct: false },
                { text: 'Перелом', correct: false },
                { text: 'Перелом', correct: false },
                { text: 'Перелом Шанса', correct: true }
            ],
            hint : ''
        },
        {
            image: '8.png',
            answers: [
                { text: 'Перелом', correct: false },
                { text: 'Перелом', correct: false },
                { text: 'Перелом', correct: false },
                { text: 'Перелом Дюпюитрена', correct: true }
            ],
            hint : ''
        },
        {
            image: '9.png',
            answers: [
                { text: 'Перелом Смита', correct: false },
                { text: 'Перелом Коллеса', correct: false },
                { text: 'Перелом Галеацци', correct: false },
                { text: 'Перелом Монтеджи', correct: true }
            ],
            hint : ''
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
    hintButton.addEventListener('click', showHint);
    backButton.addEventListener('click', hideHint);

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

        hintButton.classList.remove('hide');
    }

    function resetState() {
        nextButton.classList.add('hide');
        hintButton.classList.add('hide');
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
        hintButton.classList.add('hide');
    }

    function showHint() {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        hintTextElement.innerText = currentQuestion.hint;
        hintContainerElement.classList.add('show');
        questionContainerElement.classList.add('hide');
        backButton.classList.remove('hide');
    }

    function hideHint() {
        hintContainerElement.classList.remove('show');
        questionContainerElement.classList.remove('hide');
        backButton.classList.add('hide');
    }
});
