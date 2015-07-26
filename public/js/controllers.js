/**
 * Created by artur on 7/25/2015.
 */
var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('MainCtrl', ['$scope', 'apiService', function($scope, apiService) {
    $scope.duration = 0;
    $scope.currentTaskList = [];
    $scope.totalTime = '';
    $scope.currentTaskIndex = 0;

    // countdown var
    $scope.timerRunning = false;
    $scope.allTasksDone = false;
    $scope.duration = 0;
    $scope.timeLeft = 0;
    $scope.isTimerPaused = false;
    var isTimerPaused = false;

    apiService.get().success(function(data, status, b) {
        $scope.currentTaskList = data[0];
        console.log(data[0]);
    });

    var calculateTotalTime = function(taskList) {
        var totalTime = 0;
        taskList.forEach(function(task) {
            totalTime += task.duration;
        });
        return totalTime;
    };
    var nextTask = function() {
        //console.log($scope.currentTaskIndex);
        if ($scope.currentTaskIndex < $scope.currentTaskList.length) {
            $scope.currentTaskIndex += 1;
            var currentTask = $scope.currentTaskList[$scope.currentTaskIndex];
            console.log($scope.currentTaskIndex, currentTask);
            $scope.startTimer(currentTask);            
        } else {
            $scope.$broadcast('all-tasks-done');
        }
    };

    /////////////////////////////// COUNTDOWN


    $scope.startTimer = function() {
        $scope.allTasksDone = false;
        $scope.currentTaskIndex = 0; // start from first element
        $scope.$broadcast('timer-start', $scope.currentTaskList[$scope.currentTaskIndex]);
        $scope.timerRunning = true;
    };

    $scope.pauseTimer = function() {
        $scope.$broadcast('timer-pause');
        $scope.timerRunning = false;
        console.log('timer paused');
    };

    $scope.$on('timer-start', function(event, task) {
        // console.log(task);
        if ($scope.isTimerPaused == true) {
            console.log('after pause');
            $scope.isTimerPaused = false;
            // with time left to resume
            window.countdown({
                seconds: task.timeLeft
            }, function(timeLeft, isFinished) {
                task.timeLeft = timeLeft;
                $scope.totalTime -= 1;
                $scope.$apply();
                if (isFinished == true) {
                    $scope.$broadcast('timer-done');
                }
            });
        } else {
            $scope.totalTime = calculateTotalTime($scope.currentTaskList);
            window.countdown({
                seconds: task.duration
            }, function(timeLeft, isFinished) {
                task.timeLeft = timeLeft;
                $scope.totalTime -= 1;
                $scope.$apply();
                // console.log(fromSecondsToHumanTime(timeLeft));
                if (isFinished == true) {
                    $scope.$broadcast('timer-done');
                }
            });
        }
    });

    $scope.$on('timer-pause', function(event, data) {
        window.countdown.stop();
        $scope.isTimerPaused = true;
        $scope.timerRunning = false;
        console.log('Timer Paused - data = ', data);
    });

    $scope.$on('timer-done', function(event, data) {
        $scope.timerRunning = false;
        nextTask();
    });

    $scope.$on('all-tasks-done', function(event, data) {
        $scope.allTasksDone = true;
        $scope.currentTaskIndex = 0;
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
    /////////////////////////////////////////////////////////////
}]);