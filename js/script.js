const popupQuestion = document.querySelector('.popup-question');
const popupAnswer = document.querySelector('.popup-answer');
const popupAnswerQuantity = document.querySelector('.popup-answer-quantity');
const testBlock = document.querySelector('.test-content');

const startTestBtn = document.querySelector('.add-question');
const setQuestionBtn = document.querySelector('.start-test');

const emptyQuestionInput = document.querySelector('.empty-question-input');
const emptyAnswerInput = document.querySelector('.empty-answer-input');
const emptyAnswerQuantity = document.querySelector('.empty-answer-quantity');
const unvalidAnswerQuantity = document.querySelector('.unvalid-answer-quantity');

let questionInput = document.querySelector('#question');
let answerInput = document.querySelector('#answer');
let answerQuantityInput = document.querySelector('#quantity');



//Store
let question = '';
let answer = [];
let correctAnswers = [];
let num = 1; // Counter for displaying the number of the answer option in the question creation block
let questionNumber = 5; // A counter required as a pointer to a specific question number to identify it
let defaultCorrectAnswers = {
    1:['1', '4'], 2:['1', '3', '4'], 3:['2'], 4:['2', '4'], 5:['1', '2']
};
let chosenAnswer = {};

//Functions responsible for showing UI

let showTest = () => {
    [startTestBtn.disabled, setQuestionBtn.disabled] = 'disabled';
    testBlock.classList.remove('hidden');
};

let showQuestionBlock = () => {
    popupAnswerQuantity.classList.remove('active');
    popupQuestion.classList.add('active');
    popupAnswer.classList.remove('active');
};

let showAnswerBlock = () => {    
    popupQuestion.classList.remove('active');
    popupAnswer.classList.add('active');
    document.querySelector('.enterAnswer').textContent = `Введите текст ${num} варианта ответа:`;
};

let enterAnswerQuantity = () => {
    popupAnswer.classList.remove('active');
    popupAnswerQuantity.classList.add('active');
};

let nextAnswer = () => {
    answerInput.value = '';
    document.querySelector('.enterAnswer').textContent = `Введите текст ${num} варианта ответа:`;
    if (num > 4) {
        num = 1;
        document.querySelector('.enterAnswer').textContent = '';
        enterAnswerQuantity();
    };
};

let closeWindow = () => {
    popupAnswerQuantity.classList.remove('active');
    popupQuestion.classList.remove('active');
    popupAnswer.classList.remove('active');
    emptyQuestionInput.classList.remove('active');
    emptyAnswerInput.classList.remove('active');
    emptyAnswerQuantity.classList.remove('active');
    unvalidAnswerQuantity.classList.remove('active');
};

let returnToStart = () => {
    question = '';
    answer = [];
    correctAnswers = [];
    num = 1; 
    questionNumber = 5; 
    defaultCorrectAnswers = {
        1:['1', '4'], 
        2:['1', '3', '4'], 
        3:['2'], 
        4:['2', '4'], 
        5:['1', '2'],
    };
    chosenAnswer = {};
    questionInput.value = '';
    answerInput.value = '';
    answerQuantityInput.value = '';
    closeWindow();
}


let cancelQuestionBlock = () => {
    closeWindow();
    emptyQuestionInput.classList.add('active');
}

let cancelAnswerBlock = () => {
    closeWindow();
    document.querySelector('.alert').textContent = `Вы не ввели текст ${num} варианта ответа. Попробуйте добавить вопрос заново`;
    emptyAnswerInput.classList.add('active');
}

let cancelAnswerQuantityBlock = () => {
    closeWindow();
    emptyAnswerQuantity.classList.add('active');
}

//Functions responsible for adding a question

let createLabel = (data) => {
    let newLabel = document.createElement('label');
    newLabel.textContent = data;
    return newLabel
}
let createContainer = () => {
    let container = document.createElement('div');
    container.classList.add('variants');
    return container
}
let createCheckbox = () => {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    return checkbox
}
let createAnswers = (answer, questionLabel, container) => {

    let firstAnswerDiv = document.createElement('div');
    let secondAnswerDiv = document.createElement('div');
    let thirdAnswerDiv = document.createElement('div');
    let fourthAnswerDiv = document.createElement('div');
    
    let firstAnswerCheckbox = createCheckbox();
    firstAnswerCheckbox.id = '1';
    firstAnswerCheckbox.value = questionNumber;

    let secondAnswerCheckbox = createCheckbox();
    secondAnswerCheckbox.id = '2';
    secondAnswerCheckbox.value = questionNumber;

    let thirdAnswerCheckbox = createCheckbox();
    thirdAnswerCheckbox.id = '3';
    thirdAnswerCheckbox.value = questionNumber;

    let fourthAnswerCheckbox = createCheckbox();
    fourthAnswerCheckbox.id = '4';
    fourthAnswerCheckbox.value = questionNumber;
    
    let firstAnswer = createLabel(answer[0]);
    let secondAnswer = createLabel(answer[1]);
    let thirdAnswer = createLabel(answer[2]);
    let fourthAnswer = createLabel(answer[3]);

    questionLabel.after(container);

    container.append(firstAnswerDiv);
    firstAnswerDiv.appendChild(firstAnswerCheckbox);
    firstAnswerDiv.appendChild(firstAnswer);

    container.append(secondAnswerDiv);
    secondAnswerDiv.appendChild(secondAnswerCheckbox);
    secondAnswerDiv.appendChild(secondAnswer);

    container.append(thirdAnswerDiv);
    thirdAnswerDiv.appendChild(thirdAnswerCheckbox);
    thirdAnswerDiv.appendChild(thirdAnswer);

    container.append(fourthAnswerDiv);
    fourthAnswerDiv.appendChild(fourthAnswerCheckbox);
    fourthAnswerDiv.appendChild(fourthAnswer);
} 
let setQuestion = () => {

    questionNumber++;
    let list = document.querySelector('.test-list');
    let listElement = document.createElement('li');
    let questionLabel = createLabel(question);
    questionLabel.id = questionNumber;
    let container = createContainer();

    list.appendChild(listElement);
    listElement.appendChild(questionLabel);
    createAnswers(answer, questionLabel, container, questionNumber);

    let addedCheckBox = document.querySelectorAll('input[type="checkbox"]');
    let addedCheckBoxArr = Array.from(addedCheckBox);
    addedCheckBoxArr.map(el => el.addEventListener('change', checkboxStatusChanged));
    defaultCorrectAnswers[questionNumber] = [];
    defaultCorrectAnswers[questionNumber].push(...correctAnswers.flat());
    
    question = '';
    answer = [];
    correctAnswers = [];
};

//Functions responsible for validation

let isQuestionValid = () => {
    if (!questionInput.value) {
        closeWindow();
        emptyQuestionInput.classList.add('active');
    } else {
        question = questionInput.value;
        questionInput.value = '';
        showAnswerBlock();
    };
};

let isAnswerInputValid = () => {
    if (!answerInput.value) {
        closeWindow();
        document.querySelector('.alert').textContent = `Вы не ввели текст ${num} варианта ответа. Попробуйте добавить вопрос заново`;
        emptyAnswerInput.classList.add('active');
    } else {
        answer.push(answerInput.value);
        num++;
        answerInput.value = '';
        nextAnswer();
    };
};

let isAnswerQuantityInputValid = () => {
    if (!answerQuantityInput.value) {
        closeWindow();
        emptyAnswerQuantity.classList.add('active');
    } else if (
        !(/^([1-4]|([1-4]\,){1,3}[1-4])$/gm).test(answerQuantityInput.value)
         || (/^([1-4]|([1-4]\,){1,3}[1-4])$/gm).test(answerQuantityInput.value) && !isUnique(answerQuantityInput.value.split(''))
    ) {
        answerQuantityInput.value = '';
        correctAnswers = [];
        closeWindow();
        unvalidAnswerQuantity.classList.add('active');
    } else {
        correctAnswers.push(removeComma(answerQuantityInput.value.split('')));
        answerQuantityInput.value = '';
        setQuestion();
        closeWindow();
    }
}

let removeComma = (arr) => {
    if (arr.length > 1) {
        return arr.filter((elem, index) => index % 2 === 0);
    }
    return arr
};

let isUnique = arr => arr.length === new Set(arr).size;

let testValidation = (correctCounter, totalQuestions, falsyQuestionId) => {
    if (correctCounter == totalQuestions) {
        alert(`Ваш результат ${correctCounter} из ${totalQuestions}. Вы молодец!`);
    };
    if (correctCounter < totalQuestions && totalQuestions == questionNumber) {
        alert('Вы неправильно ответили на вопросы:' + '\n' + '\n' + falsyQuestionId.join(',\n') + '\n'+ '\n' + `Ваш результат ${correctCounter} из ${totalQuestions}.`);
    };
};

//Test logic

let defaultCheckBox = document.querySelectorAll('input[type="checkbox"]');
let defaultCheckBoxArr = Array.from(defaultCheckBox);

let checkboxStatusChanged = (event) => {
	let checkbox = event.target;
    let key = checkbox.value;
    if (!chosenAnswer[key]) {
        chosenAnswer[key] = [];
    };
	let isChecked = checkbox.checked;
	if (isChecked) {
        chosenAnswer[key].push(checkbox.id);
	} else {
        chosenAnswer[key].splice(chosenAnswer[key].indexOf(checkbox.id), 1);
	};
};

defaultCheckBoxArr.map(el => el.addEventListener('change', checkboxStatusChanged));

let evaluation = () => {
    let result = {};
    let chosenAnswerKeys = Object.keys(chosenAnswer);
    let defaultCorrectAnswersKeys = Object.keys(defaultCorrectAnswers);
    if (chosenAnswerKeys.length === defaultCorrectAnswersKeys.length) {
        for (let i = 1; i <= chosenAnswerKeys.length; i++ ) {
            result[i] = [];
            if (chosenAnswer[i].length === 0) {
               return alert(`Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.`)
            };
            for (let j = 0; j < defaultCorrectAnswers[i].length; j++) {
                let isCorrect = defaultCorrectAnswers[i].includes(chosenAnswer[i][j]);
                result[i].push(isCorrect);
            }
        }
        return countCorrectAnswers(result)
    } else {
        return alert(`Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.`);
    }
};

let countCorrectAnswers = (result) => {
    let correctCounter = 0;
    let falsyQuestionId = [];
    let resultKeys = Object.keys(result);
    let totalQuestions = resultKeys.length;
    resultKeys.map((el) => {
        if (result[el].includes(false)) {
            let wrongAnsweredQuestion = document.querySelectorAll('label[id]');
            let message = `${el}. ${wrongAnsweredQuestion[el-1].textContent}`;
            falsyQuestionId.push(message);
        } else {
            correctCounter++;
        }
    })
    testValidation(correctCounter, totalQuestions, falsyQuestionId);
};

