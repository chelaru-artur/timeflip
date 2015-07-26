/**
 * Created by artur on 7/25/2015.
 */
var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('MainCtrl', ['$scope', 'apiService', function ($scope, apiService) {
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
    /*
     apiService.get().success(function(data, status, b) {
     $scope.currentTaskList = data[0];
     $scope.totalTime = calculateTotalTime($scope.currentTaskList);
     // console.log(data[0]);
     });
     */
    var calculateTotalTime = function (taskList) {
        var totalTime = 0;
        taskList.forEach(function (task) {
            totalTime += task.duration;
        });
        return totalTime;
    };

    $scope.currentTaskList = [
        {
            title : 'Task#1',
            duration : 3
        },
        {
            title : 'Task#2',
            duration : 2
        },
        {
            title : 'Task#3',
            duration : 4
        },
        {
            title : 'Task#4',
            duration : 2
        },
        {
            title : 'Task#5',
            duration : 3
        }
    ];
    $scope.totalTime = calculateTotalTime($scope.currentTaskList);



    $scope.addNewTask = function(newTaskTitle, newTaskDuration){
        // newwd if to check duration if null or undefined
        $scope.currentTaskList.push({title : newTaskTitle, duration: newTaskDuration});
    };

    $scope.updateTask = function(taskIndex, updatedTaskTitle, updatedTaskDuration){
        var task = $scope.currentTaskList[taskIndex];
        task.title = (updatedTaskTitle !==undefined && updatedTaskTitle.length > 0) ? updatedTaskTitle : task.title;
        task.duration = (updatedTaskDuration !== null && updatedTaskDuration !== undefined && updatedTaskDuration > 0) ? updatedTaskDuration : task.duration;
    };

    $scope.deleteTask = function(taskIndex){
        $scope.currentTaskList.splice(taskIndex, 1);
    }


    var nextTask = function () {
        if ($scope.currentTaskIndex < $scope.currentTaskList.length - 1) {
            $scope.currentTaskIndex += 1;
            var currentTask = $scope.currentTaskList[$scope.currentTaskIndex];
            // console.log($scope.currentTaskIndex, currentTask);
            setTimeout(function () {
                $scope.startTimer(currentTask);
            }, 100);
        } else {
            $scope.$broadcast('all-tasks-done');
        }
    };

    /////////////////////////////// COUNTDOWN


    $scope.startTimer = function (currentTask) {
        // console.log(currentTask);
        $scope.allTasksDone = false;
        $scope.$broadcast('timer-start', currentTask);
        $scope.timerRunning = true;
    };

    $scope.pauseTimer = function () {
        $scope.$broadcast('timer-pause');
        $scope.timerRunning = false;
        // console.log('timer paused');
    };

    $scope.$on('timer-start', function (event, task) {
        // console.log(task);
        if ($scope.isTimerPaused == true) {
            console.log('after pause');
            $scope.isTimerPaused = false;
            // with time left to resume
            window.countdown({
                seconds: task.timeLeft
            }, function (timeLeft, isFinished) {
                task.timeLeft = timeLeft;
                $scope.totalTime -= 1;
                $scope.$apply();
                if (isFinished == true) {
                    $scope.$broadcast('timer-done');
                }
            });
        } else {
            task.timeLeft = task.duration;
            window.countdown({
                seconds: task.duration
            }, function (timeLeft, isFinished) {
                task.timeLeft = timeLeft;
                $scope.totalTime -= 1;
                $scope.$apply();
                console.log(timeLeft, isFinished);
                // console.log(fromSecondsToHumanTime(timeLeft));
                if (isFinished == true) {
                    window.countdown.stop();
                    $scope.$broadcast('timer-done');
                }
            });
        }
    });

    $scope.$on('timer-pause', function (event, data) {
        window.countdown.stop();
        $scope.isTimerPaused = true;
        $scope.timerRunning = false;
        // console.log('Timer Paused - data = ', data);
    });

    $scope.$on('timer-done', function (event, data) {
        $scope.timerRunning = false;
        nextTask();
    });

    $scope.$on('all-tasks-done', function (event, data) {
        $scope.allTasksDone = true;
        $scope.currentTaskIndex = 0;
    });

    $scope.fromSecondsToHumanTime = function (s) {
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