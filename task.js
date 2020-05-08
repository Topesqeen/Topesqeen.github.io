const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answer");
const totalQuestion2Span = document.querySelector(".total-question2");
const percentageSpan = document.querySelector(".percentage");
const question = document.querySelector(".question");
const opt1 = document.querySelector(".option1");
const opt2 = document.querySelector(".option2");
const opt3 = document.querySelector(".option3");
const opt4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;
// questions and Optionand answers
const questions = [
  {
    q:'How do you call a function named "myFunction"?',
    options:['myFunction()','call myFunction()','call function myFunction','all the above'],
    answer:0
  },
  {
    q:'Who is the President of Nigeria"?',
    options:['Muhamadul Buhari','Barrack Obama','Goodlock Jonathan','all the above'],
    answer:1
  },
  {
    q:'Is Noun a part of speeck"?',
    options:['No','Maybe','Yes','All of the above'],
    answer:3
  },
  {
    q:'Which year Nigerai got her Independent"?',
    options:['1960','1982','2000','2003'],
    answer:1
  },
  {
    q:'How is the creator of google"?',
    options:['Bill Gates','Mark Zugerburg','Wole Shoyinka','All of the Above'],
    answer:1
  }
]

//set questions and options and question number
totalQuestionSpan.innerHTML=questions.length;
function load() {
  questionNumberSpan.innerHTML=index+1;
  question.innerHTML=questions[questionIndex].q;
  opt1.innerHTML=questions[questionIndex].options[0];
  opt2.innerHTML=questions[questionIndex].options[1];
  opt3.innerHTML=questions[questionIndex].options[2];
  opt4.innerHTML=questions[questionIndex].options[3];
  index++;
}

function check(element) {
  // console.log(element.id);
  if(element.id == questions[questionIndex].answer){
    // alert("correct")
    element.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
    console.log("score:"+score);

  }else{
    // alert("wrong")
    element.classList.add("wrong");
    updateAnswerTracker("wrong");
    // if the user selected one option then disabled all option
  }
  disabledOptions()
}

function disabledOptions() {
  for (let i=0; i<options.length; i++) {
    options[i].classList.add("disabled");
    // if the answer is wrong and you wants to show the answer
    if (options[i].id == questions[questionIndex].answer) {
      options[i].classList.add("correct");
    }
  }
}

//enabled
function enableOption() {
  for (let i=0; i<options.length; i++) {
    options[i].classList.remove("disabled","correct","wrong");
  }
}

//validate options
function   ValidityState() {
  if (!options[0].classList.contains("disabled")) {
    alert("Please Select one option");
  }else{
    enableOption();
    randomQuestion();
  }
}

//next button
function next(){
  //check if user select an option then alert
  ValidityState()
}

function randomQuestion() {
  let randomNumber = Math.floor(Math.random()*questions.length);
  let hitDuplicate = 0;
  if (index==questions.length) {
   console.log("quiz over");
    quizOver();
  }else{
    if (myArray.length > 0) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] == randomNumber) {
          hitDuplicate = 1;
          break;
        }
        
      }
      //if duplicate found then call again to randomquestion
      if (hitDuplicate == 1) {
        randomQuestion();
      }else{
        questionIndex = randomNumber;
        load();
        myArr.push(questionIndex);
      }
    }
    if (myArray.length == 0) {
      questionIndex = randomNumber;
      load();
      myArr.push(questionIndex);
    }
    // console.log("myArr:"+myArr);
    myArray.push(randomNumber);
    // load();
  }
}

//answer tracker
function answerTracker(){
  for (let i = 0; i < questions.length; i++) {
    const div = document.createElement("div");
    answerTrackerContainer.appendChild(div);
  }
}

//update 
function updateAnswerTracker(classNam){
  answerTrackerContainer.children[index-1].classList.add(classNam);
}

//quiz over
function quizOver(){
  document.querySelector(".quiz-over").classList.add(".show");
  correctAnswerSpan.innerHTML = score;
  totalQuestion2Span.innerHTML = questions.length;
  percentageSpan.innerHTML = (score/questions.length)*100 + "%";
}

function tryAgain() {
  window.location.reload();
}

window.onload = function(){
  randomQuestion();
  answerTracker();
}
