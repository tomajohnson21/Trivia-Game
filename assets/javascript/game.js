var score = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionCount;
var totalQuestions;
var timer;
var startDisplay = $("#start-box");
var questionDisplay = $("#question-box");
var endDisplay = $("#end-box");
var timer;

var questionList = [
    
    {
        question: "What did Charles Foster Kane whisper on his death bed in the film 'Citizen Kane'?",
        answers: [{label: "Emily", value: false}, 
                  {label: "Xanadu", value: false}, 
                  {label: "Rosebud", value: true}, 
                  {label:"Susan", value: false}],
        asked: false
    },

    {
        question: "What was the name of Rick and Ilsa's song in 'Casablanca'?",
        answers: [{label: "'Singin' in the Rain'", value: false}, 
                  {label: "'Blue Moon'", value: false}, 
                  {label: "'Cheek to Cheek'", value: false}, 
                  {label: "'As Time Goes By'", value: true}],
        asked: false
    },

    {
        question: "What happened to Mrs. Bates in the film 'Psycho'?",
        answers: [{label: "Her husband killed her, then killed himself", value: false}, 
                  {label: "She commit suicide", value: false}, 
                  {label: "She was murdered by her son, Norman", value: true},  
                  {label: "No one knows", value: false}],
        correctAns: 2
    },

    {
        question: "What famous musical duos songs were prominently featured in the film 'The Graduate'?",
        answers: [{label: "Simon and Garfunkel", value: true}, 
                  {label: "Hall and Oates", value: false}, 
                  {label: "McCartney and Lennon", value: false}, 
                  {label: "Hazelwood and Sinatra", value: false}],
        asked: false
    },

    {
        question: "Who framed Roger Rabbit?",
        answers: [{label: "Jessica Rabbit", value: false}, 
                  {label: "Judge Doom", value: true}, 
                  {label: "Judge Dredd", value: false}, 
                  {label: "Mickey Mouse", value: false}],
        asked: false
    }

    ]



var renderButtons = function(question){
    var answerList = question.answers;

    for(var i = 0; i < answerList.length; i++){
        var newButton = $("<button></button>");
        newButton.addClass("btn btn-dark");
        newButton.addClass("choice")
        newButton.text(answerList[i].label);
        newButton.attr("val", answerList[i].value);
        $("#choices").append(newButton, $("<br>"));
    }
}

var countdown = function() {
    if(time === 0) {
        clearInterval(timer);
        getNextQuestion();
        console.log("Times up"); 
        score--;
        unanswered++;
    } else {
        time--;
        $("#time").text("Time Left: " + time + "s")
        console.log(time);
    }
}

var setTimer = function() {
    time = 15;
    timer = setInterval(function(){countdown()}, 1000);
}

var updateDisplay = function(currentQuestion){
    $("#time").text("Time Left: 15s")
    $("#question-label").text("Question " + questionCount);
    $("#current-question").text(currentQuestion.question)
    renderButtons(currentQuestion);
    setTimer();
}

var checkAnswer = function(selection){
    
    if (selection === "true"){
        score++;
        correct++;
        console.log("score: " + score, "correct: " + correct);
        getNextQuestion();
    }
    else {
        score--;
        incorrect++;
        console.log("score: " + score, "incorrect: " + incorrect);
        getNextQuestion();
    }
}

var resetQuestions = function(){
    
    for(var i = 0; i < questionList.length; i++){
        questionList[i].asked = false;
    }
}

var showResults = function() {
    $("#score").text("Score: " + score);
    $("#correct").text("Correct: " + correct);
    $("#incorrect").text("Incorrect: " + incorrect);
    $("#unanswered").text("Unanswered: " + unanswered);
}

var  getNextQuestion = function(){
    
    if(questionCount < totalQuestions){
        $("#choices").empty();
        var index = Math.floor(Math.random() * questionList.length);
        var nextQuestion = questionList[index];
        
        if (!nextQuestion.asked) {
            questionList[index].asked = true;
            var newQuestion = nextQuestion;
            questionCount++;
            updateDisplay(newQuestion);
        } else {
            getNextQuestion();
        }
    } else {
        questionDisplay.hide();
        clearInterval(timer);
        showResults();
        endDisplay.show();
    }
}

var newGame = function(){
    score = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    questionCount = 0;
    totalQuestions = questionList.length;
    resetQuestions();
    getNextQuestion();
    questionDisplay.show();
}

$(document).ready(function(){
    $("#start-button").on("click", function(){
        startDisplay.hide();
        newGame();
    });

    $(document).on("click", ".choice", function(){
        clearInterval(timer);
        selection = $(this).attr("val");
        checkAnswer(selection);
    });
});


//Hide question div and end div on page loading
questionDisplay.hide();
endDisplay.hide();