
var right = 0
var wrong = 0 
alert("This is a trivia game! There are 20 questions see how many you can get right in 120 seconds! Press OK to start!")
var number = 120;
var intervalId;

function run() {
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  number--;

  $("#time").html("<h2>" + number + "</h2>");

   if (number === 0) {
     stop();
     alert("Number of correct guesses "+right+". Number of wrong guesses: "+wrong);
     location.reload()
  }
}

function stop() {

clearInterval(intervalId);
}

run();

$(".jumbotron").click(function() {
   console.log(number)
   }) 
 
function fixer(string) {
  var fixed = string.replace(/&quot;/g, "\"");
  var fixedTwo = fixed.replace(/&#039;/g, "\'")
  return fixedTwo
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var queryURL = "https://opentdb.com/api.php?amount=20&category=20&type=multiple";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

    var i=0;
    var newQuestion =response.results[i].question;
    var question = $(".question").text(fixer(newQuestion));
    var button1 = $(".button1");
    var button2 = $(".button2");
    var button3 = $(".button3");
    var button4 = $(".button4");
    var buttonArray = [button1, button2, button3, button4];
    var answer1 = response.results[i].correct_answer;
    var answer2 = response.results[i].incorrect_answers[0];
    var answer3 = response.results[i].incorrect_answers[1];
    var answer4 = response.results[i].incorrect_answers[2];
    var answerArray = [answer1, answer2, answer3, answer4];
    var answerArrayShuffle = shuffle(answerArray)

    button1.text(fixer(answerArrayShuffle[0]))
    button2.text(fixer(answerArrayShuffle[1]))
    button3.text(fixer(answerArrayShuffle[2]))
    button4.text(fixer(answerArrayShuffle[3]))

    $("button").click(function() {

    var correctAnswer = response.results[i].correct_answer;
    var d = $(this).text();      
    console.log("this is the user answer: "+d)
    console.log("this is the correct answer: "+correctAnswer)

    if (d == correctAnswer) {
      right = right+1;
      i++
      var newQuestion =response.results[i].question;
      var question = $(".question").text(fixer(newQuestion));
      var answer1 = response.results[i].correct_answer;
      var answer2 = response.results[i].incorrect_answers[0];
      var answer3 = response.results[i].incorrect_answers[1];
      var answer4 = response.results[i].incorrect_answers[2];
      var answerArray = [answer1, answer2, answer3, answer4];
      var answerArrayShuffle = shuffle(answerArray)

      button1.text(fixer(answerArrayShuffle[0]))
      button2.text(fixer(answerArrayShuffle[1]))
      button3.text(fixer(answerArrayShuffle[2]))
      button4.text(fixer(answerArrayShuffle[3]))
      console.log(i)
    }

    else if (d !== correctAnswer) { 
      wrong = wrong+1;
      i++
      var newQuestion =response.results[i].question;
      var question = $(".question").text(fixer(newQuestion));
      var answer1 = response.results[i].correct_answer;
      var answer2 = response.results[i].incorrect_answers[0];
      var answer3 = response.results[i].incorrect_answers[1];
      var answer4 = response.results[i].incorrect_answers[2];
      var answerArray = [answer1, answer2, answer3, answer4];
      var answerArrayShuffle = shuffle(answerArray)

      button1.text(fixer(answerArrayShuffle[0]))
      button2.text(fixer(answerArrayShuffle[1]))
      button3.text(fixer(answerArrayShuffle[2]))
      button4.text(fixer(answerArrayShuffle[3]))
      console.log(i)    
    }
  }); 
})