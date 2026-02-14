// ===============================
// GET CURRENT USER
// ===============================

const currentUser = localStorage.getItem("focusguard_current_user");

if (!currentUser) {
    window.location.href = "index.html";
}

// display welcome name
document.getElementById("welcomeUser").innerText =
    "Welcome, " + currentUser;


// ===============================
// USER-SPECIFIC STORAGE KEY
// ===============================

const TASK_KEY = "focusguard_tasks_" + currentUser;


// ===============================
// LOAD TASKS
// ===============================

let tasks = JSON.parse(localStorage.getItem(TASK_KEY)) || [];


// ===============================
// SAVE TASKS
// ===============================

function saveTasks() {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
}


// ===============================
// MODAL FUNCTIONS
// ===============================

function openTaskModal() {
    document.getElementById("taskModal").style.display = "flex";
}

function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}


// compatibility if header button calls openTaskPopup
function openTaskPopup() {
    openTaskModal();
}


// ===============================
// ADD TASK
// ===============================

function addTask() {

    const name = document.getElementById("taskName").value.trim();
    const timer = document.getElementById("taskTimer").value;

    if (name === "") {
        alert("Enter task name");
        return;
    }

    tasks.push({
        name: name,
        timer: timer,
        completed: false,
        date: new Date().toISOString()
    });

    saveTasks();
    renderTasks();
    updateScore();

    closeTaskModal();

    document.getElementById("taskName").value = "";
    document.getElementById("taskTimer").value = "";
}


// ===============================
// RENDER TASKS
// ===============================

function renderTasks() {

    const pending = document.getElementById("pendingTasks");
    const completed = document.getElementById("completedTasks");

    pending.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.name}</span>
        `;

        if (!task.completed) {

            // START button instead of Complete
            const startBtn = document.createElement("button");

            startBtn.innerText = "Start";

            startBtn.onclick = () => {

                // save active task
                localStorage.setItem(
                    "focusguard_active_task_" + currentUser,
                    JSON.stringify({
                        index: index,
                        name: task.name,
                        timer: task.timer
                    })
                );

                // redirect to focus page
                window.location.href = "focus.html";

            };

            li.appendChild(startBtn);

            pending.appendChild(li);

        } else {

            completed.appendChild(li);

        }

    });

}



// ===============================
// PRODUCTIVITY SCORE
// ===============================

function updateScore() {

    if (tasks.length === 0) {
        document.getElementById("score").innerText = "0%";
        return;
    }

    const completedCount = tasks.filter(t => t.completed).length;

    const percent = Math.round(
        (completedCount / tasks.length) * 100
    );

    document.getElementById("score").innerText = percent + "%";
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("focusguard_current_user");
    window.location.href = "index.html";

}


// ===============================
// CHARTS
// ===============================

const dailyChart = new Chart(
    document.getElementById("dailyChart"),
    {
        type: "line",
        data: {
            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            datasets: [{
                label: "Focus %",
                data: [60,70,80,50,90,40,75]
            }]
        }
    }
);


const monthlyChart = new Chart(
    document.getElementById("monthlyChart"),
    {
        type: "bar",
        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun"],
            datasets: [{
                label: "Focus %",
                data: [65,59,80,81,56,55]
            }]
        }
    }
);


// ===============================
// INITIAL LOAD
// ===============================

renderTasks();
updateScore();
