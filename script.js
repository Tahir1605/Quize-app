const questions = [
    {
        question: " What does HTML stand for?",
        answers: [
            { Text: "Hyper Text Preprocessor", correct: false },
            { Text: "Hyper Text Markup Language", correct: true },
            { Text: "Hyper Text Multiple Language", correct: false },
            { Text: "Hyper Tool Multi Language", correct: false },
        ]
    },
    {
        question: " What does CSS stand for?",
        answers: [
            { Text: "Common Style Sheet", correct: false },
            { Text: "Colorful Style Sheet", correct: false },
            { Text: "Computer Style Sheet", correct: false },
            { Text: "Cascading Style Sheet", correct: true },
        ]
    },
    {
        question: " What does PHP stand for?",
        answers: [
            { Text: "Hypertext Preprocessor", correct: true },
            { Text: "Hypertext Programming", correct: false },
            { Text: "Hypertext Preprogramming", correct: false },
            { Text: "Hometext Preprocessor", correct: false },
        ]
    },
    {
        question: " What does SQL stand for?",
        answers: [
            { Text: "Stylish Question Language", correct: false },
            { Text: "Stylesheet Query Language", correct: false },
            { Text: "Statement Question Language", correct: false },
            { Text: "Structured Query Language", correct: true },
        ]
    },
    {
        question: " What does XML stand for?",
        answers: [
            { Text: "eXtensible Markup Language", correct: true },
            { Text: "eXecutable Multiple Language", correct: false },
            { Text: "eXTra Multi-Program Language", correct: false },
            { Text: "eXamine Multiple Language", correct: false },
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
           const button = document.createElement("button");
           button.innerHTML = answer.Text;
           button.classList.add("btn1");
           answerButtons.appendChild(button);
           if(answer.correct){
            button.dataset.correct = answer.correct;
           }
           button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length)
    {
       handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();