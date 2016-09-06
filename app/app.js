var apiMaturityApp = angular.module('apiMaturityApp', []);

class Customer {
    constructor(name, companyName, email) {
        this.name = name;
        this.companyName = companyName;
        this.email = email;
    }
}

class Section {
    constructor(level, subSections) {
        this.level = level;
        this.subSections = subSections;
    }
}

class SubSection {
    constructor(level, statement) {
        this.level = level;
        this.statement = statement;
    }
}


apiMaturityApp.controller('mainController', function($scope, $http) {
    const basic = "Basic";
    const onTrack = "On Track";
    const apiReady = "API Ready";

    const sections =  [
        new Section("Strategy & Organization", [
            new SubSection(apiReady, "Road map for API centric organization. Strategy in place."),
            new SubSection(onTrack, "Strategy, roles, and processes documented."),
            new SubSection(basic, "Strategy exists but is incomplete.")
        ]),
        new Section("Design", [
            new SubSection(apiReady, "Missing APIs identified. Re-design in line with strategy."),
            new SubSection(onTrack, "Understanding effective API design."),
            new SubSection(basic, "Current APIs identified and documented.")
        ]),
        new Section("DevOps", [
            new SubSection(apiReady, "Development, infrastructure and process in place."),
            new SubSection(onTrack, "Implementing API DevOps best practices."),
            new SubSection(basic, "Infrastructure for deploying APIs.")
        ]),
        new Section("Visualize", [
            new SubSection(apiReady, "Visualization strategy in place."),
            new SubSection(onTrack, "Desired API image identified."),
            new SubSection(basic, "Need of visualization strategy identified.")
        ]),
        new Section("Secure", [
            new SubSection(apiReady, "Security policy documented."),
            new SubSection(onTrack, "Actions planned."),
            new SubSection(basic, "Knowledge of API security issues.")
        ]),
        new Section("Test", [
            new SubSection(apiReady, "Complete test strategy documented."),
            new SubSection(onTrack, "Improvements API testing identified."),
            new SubSection(basic, "Load and security tests exists.")
        ]),
        new Section("Monitor", [
            new SubSection(apiReady, "Complete monitoring strategy documented."),
            new SubSection(onTrack, "Improvements for API monitoring identified."),
            new SubSection(basic, "Monitoring of API gateways exists.")
        ]),
        new Section("Infrastructure", [
            new SubSection(apiReady, "API management implemented."),
            new SubSection(onTrack, "Requirements prioritized, POC."),
            new SubSection(basic, "API management need identified.")
        ])
    ];
    var sectionIndex = 0;
    var answers = [];

    $scope.storeCustomerAndInitQuiz = function() {
        customer = new Customer($scope.name, $scope.companyName, $scope.email);
        $scope.quizOver = false;
        $scope.inProgress = true;
        $scope.answerValue = 0;
        $scope.sectionLevel = sections[sectionIndex].level;
        $scope.subSections = sections[sectionIndex].subSections;
    };

    $scope.backButtonClicked = function() {
        if(sectionIndex !== 0) {
            sectionIndex--;
            $scope.sectionLevel = sections[sectionIndex].level;
            $scope.subSections = sections[sectionIndex].subSections;
        }
    };

    $scope.nextButtonClicked = function() {
        saveAndResetAnswer($scope.answerValue);
        stepSection();
    };

    function saveAndResetAnswer(answer) {
        console.log(answer);
        answers[sectionIndex] = answer;
        $scope.answerValue = 0;
    }

    function stepSection() {
        sectionIndex++;
        if (sectionIndex > sections.length - 1) {
            finishQuiz();
        } else {
            $scope.sectionLevel = sections[sectionIndex].level;
            $scope.subSections = sections[sectionIndex].subSections;
        }
    }

    function calculateScore() {
        var maxScore = 80;
        var score = null;

        for(var i = 0; i < answers.length; i++) {
            score = score + answers[i];
        }

        var finalScore = (score / maxScore) * 100;
        finalScore = Math.round(finalScore);
        $scope.score = finalScore;
        customer.score = finalScore;
        setComment(finalScore);
    }

    function setComment(score) {
        if(score < 33) {
            $scope.comment = "Work has started... ...Contact us so we can help you get further";
        }
        if(score > 33 && score < 66) {
            $scope.comment = "You are on track... ...Contact us so we can help you get further";
        }
        if(score > 66) {
            $scope.comment = "You are taking the final steps... ...Contact us so we can help you get further";
        }
        console.log("Hello");
    }

    function finishQuiz() {
        calculateScore();
        $scope.quizIsOver = true;
        sectionIndex = 0;
        sendEmail();
    }

    function sendEmail() {
        $http({
            url: "sendemail.php",
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: "Hello"
        }).success(function(data, status, headers, config) {
            console.log("Success");
        }).error(function(data, status, headers, config) {
            console.log("Error");
        });
        console.log("Sending email...");
    }

    $scope.resetQuiz = function() {
        $scope.sectionLevel = sections[sectionIndex].level;
        $scope.subSections = sections[sectionIndex].subSections;
        $scope.quizIsOver = false;
        answers = [];
    };
});
