// ===============================
// STORAGE KEYS
// ===============================

const USERS_KEY = "focusguard_users";
const CURRENT_USER_KEY = "focusguard_current_user";


// ===============================
// GET USERS
// ===============================

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}


// ===============================
// SAVE USERS
// ===============================

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


// ===============================
// REGISTER
// ===============================

function register() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Enter username and password");
        return;
    }

    let users = getUsers();

    if (users[username]) {
        alert("User already exists");
        return;
    }

    users[username] = password;

    saveUsers(users);

    alert("Registration successful. You can now login.");
}


// ===============================
// LOGIN
// ===============================

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = getUsers();

    if (users[username] && users[username] === password) {

        localStorage.setItem(CURRENT_USER_KEY, username);

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid username or password");

    }
}
