var apiReadyApp = angular.module('apiReadyApp', []);

class Customer {
    constructor(name, companyName, email) {
        this.name = name;
        this.companyName = companyName;
        this.email = email;
    }
}

class Section {
    constructor(name, subsections) {
        this.name = name;
        this.subsections = subsections;
    }
}

class SubSection {
    constructor(level, statement) {
        this.level = level;
        this.statement = statement;
    }
}


apiReadyApp.controller('quizController', function($scope) {
    const basic = "Basic";
    const onTrack = "On Track";
    const apiReady = "API Ready";

    var sections =  [
        new Section("Strategy & Organization", [new SubSection(basic, "Strategy exists but is incomplete."),
                                                            new SubSection(onTrack, "Strategy, roles, and processes documented."),
                                                            new SubSection(apiReady, "Road map for API centric organization. Strategy in place.")]),
        new Section("Design", [new SubSection(basic, "Current APIs identified and documented."),
                                            new SubSection(onTrack, "Understanding effective API design."),
                                            new SubSection(apiReady, "Missing APIs identified. Re-design in line with strategy.")]),
        new Section("DevOps", [new SubSection(basic, "Infrastructure for deploying APIs."),
                                            new SubSection(onTrack, "Implementing API DevOps best practices."),
                                            new SubSection(apiReady, "Development, infrastructure and process in place.")]),
        new Section("Visualize", [new SubSection(basic, "Need of visualization strategy identified."),
                                            new SubSection(onTrack, "Desired API image identified."),
                                            new SubSection(apiReady, "Visualization strategy in place.")]),
        new Section("Secure", [new SubSection(basic, "Knowledge of API security issues."),
                                            new SubSection(onTrack, "Actions planned."),
                                            new SubSection(apiReady, "Security policy documented.")]),
        new Section("Test", [new SubSection(basic, "Load and security tests exists."),
                                            new SubSection(onTrack, "Improvements API testing identified."),
                                            new SubSection(apiReady, "Complete test strategy documented.")]),
        new Section("Monitor", [new SubSection(basic, "Monitoring of API gateways exists."),
                                            new SubSection(onTrack, "Improvements for API monitoring identified."),
                                            new SubSection(apiReady, "Complete monitoring strategy documented.")]),
        new Section("Infrastructure", [new SubSection(basic, "API management need identified."),
                                            new SubSection(onTrack, "Requirements prioritized, POC."),
                                            new SubSection(apiReady, "API management implemented.")])
    ];
    var index = 0;
    var answers = [];
    $scope.submitAndStartTest = function() {
        customer = new Customer($scope.name, $scope.companyName, $scope.email);
        $scope.quizOver = false;
        $scope.inProgress = true;
        var section = sections[index];
        $scope.section = section.name;
        $scope.subsection = section.subsections[index].level;
        $scope.statement = section.subsections[index].statement;
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
