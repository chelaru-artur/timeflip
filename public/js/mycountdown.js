/**
 * Created by artur on 7/25/2015.
 */

window.countdown = function (time, cb) {
    this.timer = null;
    var duration = convertToSeconds(time);
    timer = window.setInterval(function () {
        duration = duration - 1;
        // return a callback
        // time left, countdownComplete == true
        if (duration == 0) {
            //countdown complete
            cb(0, true);
            window.clearInterval(this.timer);
        } else {
            cb(duration, false);
        }
    }, 1000);
};

window.countdown.stop = function(){
    window.clearInterval(timer);
};

function convertToSeconds(time) {
    // validate time
    time.days = (time.days !== null && time.days !== undefined) ? time.days : 0;
    time.hours = (time.hours !== null && time.hours !== undefined ) ? time.hours : 0;
    time.minutes = (time.minutes !== null && time.minutes !== undefined) ? time.minutes : 0;
    time.seconds = (time.seconds !== null && time.seconds !== undefined) ? time.seconds : 0;

    var hours = time.days * 24;
    var minutes = hours > 0 ? hours * 60 : time.minutes;
    var seconds = minutes > 0 ? minutes * 60 : time.seconds;
    var ms = seconds * 1000;
    // console.log('seconds: ', seconds);
    return seconds;
}



