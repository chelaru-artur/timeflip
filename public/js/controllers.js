/**
 * Created by artur on 7/25/2015.
 */

var appControllers = angular.module('appControllers', []);

appControllers.controller('MainCtrl', ['$scope', '$http', function ($scope) {
    $scope.test = 'test success';
    $scope.timerRunning = false;
    $scope.duration = 0;
    $scope.timeLeft = 0;
    $scope.isTimerPaused = false;
    var isTimerPaused = false;

    $scope.startTimer = function (time) {
        $scope.$broadcast('timer-start', {seconds: parseInt(time)});
        $scope.timerRunning = true;
    };

    $scope.pauseTimer = function () {
        $scope.$broadcast('timer-pause');
        $scope.timerRunning = false;
        console.log('timer paused');
    };

    $scope.$on('timer-start', function (event, data) {
        if ($scope.isTimerPaused == true) {
            console.log('after pause');
            $scope.isTimerPaused = false;
            // with time left to resume
            window.countdown({seconds : $scope.timeLeft}, function (timeLeft, isFinished) {
                $scope.timeLeft = timeLeft;
                console.log(fromSecondsToHumanTime(timeLeft));
                $scope.$apply();
                if (isFinished == true) {
                    $scope.$broadcast('timer-stop');
                }
            });
        } else {
            window.countdown(data, function (timeLeft, isFinished) {
                $scope.timeLeft = timeLeft;
                $scope.$apply();
                console.log(fromSecondsToHumanTime(timeLeft));
                if (isFinished == true) {
                    $scope.$broadcast('timer-done');
                }
            });
        }
    });

    $scope.$on('timer-pause', function (event, data) {
        window.countdown.stop();
        $scope.isTimerPaused = true;
        $scope.timerRunning = false;
        console.log('Timer Paused - data = ', data);
    });

    $scope.$on('timer-done', function (event, data) {
        $scope.timerRunning = false;
    });

    function fromSecondsToHumanTime(s) {
        var sec_num = s; // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }

}]);
