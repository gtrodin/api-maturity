var apiReadyApp = angular.module('apiReadyApp', []);

class Customer {
    constructor(name, companyName, email) {
        this.name = name;
        this.companyName = companyName;
        this.email = email;
    }
}

apiReadyApp.controller('quizController', function($scope) {
    var questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Question 7", "Question 8"];
    var index = 0;
    var answers = [];
    $scope.submitAndStartTest = function() {
        customer = new Customer($scope.name, $scope.companyName, $scope.email);
        $scope.quizOver = false;
        $scope.inProgress = true;
        $scope.question = questions[index];
    }

    $scope.nextQuestion = function(answer) {
        answers[index] = answer;
        index++;
        setNextQuestion(index);
    }

    function setNextQuestion(index) {
        var question = getNextQuestion(index);
        if(question) {
            $scope.question = question;
        } else {
            $scope.quizIsOver = true;
            calculateScore();
        }
    }

    function getNextQuestion(index) {
        if(index < questions.length) {
            return questions[index];
        } else {
            return false;
        }
    }

    function calculateScore() {
        var maxScore = 40;
        var score = null;

        for(var i = 0; i < answers.length; i++) {
            score = score + answers[i];
        }

        var finalScore = (score / maxScore) * 100 + "%";
        $scope.score = finalScore;
        customer.score = finalScore;
    }

    $scope.restartQuiz = function() {
        $scope.quizIsOver = false;
        index = 0;
        answers = [];
        $scope.question = questions[index];
    }
});

function sendMail() {
    var yourMessage = "Hello,<br>" + customer.name + " from " + customer.companyName
    + " With email " + customer.email + " Got a score of " + customer.score;
    var subject = "API Ready quiz result";
    document.location.href = "mailto:gustav@redpill-linpro.com?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(yourMessage);
}
