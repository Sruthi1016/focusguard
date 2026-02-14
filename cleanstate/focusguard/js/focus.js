let currentUser;
let TASK_KEY;
let ACTIVE_TASK_KEY;
let activeTask;

let seconds = 0;
let timerInterval;

let protectionEnabled = false;


// INIT AFTER PAGE LOAD
window.onload = function () {

    currentUser =
        localStorage.getItem("focusguard_current_user");

    ACTIVE_TASK_KEY =
        "focusguard_active_task_" + currentUser;

    TASK_KEY =
        "focusguard_tasks_" + currentUser;


    activeTask =
        JSON.parse(
            localStorage.getItem(ACTIVE_TASK_KEY)
        );


    // REDIRECT SAFELY
    if (!activeTask) {

        window.location.replace("dashboard.html");
        return;

    }


    // SET TASK TITLE
    document.getElementById("taskTitle").innerText =
        activeTask.name;


    // SET TIMER
    seconds =
        activeTask.timer
            ? activeTask.timer * 60
            : 0;


    updateTimerDisplay();

    startTimer();

    enterFullscreen();


    // ENABLE PROTECTION AFTER PAGE IS STABLE
    setTimeout(() => {

        protectionEnabled = true;

    }, 2000);

};



// TIMER DISPLAY
function updateTimerDisplay() {

    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    document.getElementById("timer").innerText =
        String(min).padStart(2, '0')
        + ":" +
        String(sec).padStart(2, '0');

}



// START TIMER
function startTimer() {

    timerInterval = setInterval(() => {

        if (activeTask.timer) {

            seconds--;

            if (seconds <= 0) {

                finishTask();
                return;

            }

        }
        else {

            seconds++;

        }

        updateTimerDisplay();

    }, 1000);

}



// FINISH TASK
function finishTask() {

    clearInterval(timerInterval);

    let tasks =
        JSON.parse(localStorage.getItem(TASK_KEY)) || [];

    tasks[activeTask.index].completed = true;

    localStorage.setItem(
        TASK_KEY,
        JSON.stringify(tasks)
    );

    localStorage.removeItem(ACTIVE_TASK_KEY);

    window.location.replace("dashboard.html");

}



// BUTTON
function endFocus() {

    finishTask();

}



// FULLSCREEN
function enterFullscreen() {

    if (document.documentElement.requestFullscreen) {

        document.documentElement.requestFullscreen();

    }

}



// SHOW OVERLAY
function showOverlay() {

    if (!protectionEnabled) return;

    document.getElementById("lockOverlay").style.display =
        "flex";

}



// TAB SWITCH DETECTION
document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        showOverlay();

    }

});


window.addEventListener("blur", function () {

    showOverlay();

});
