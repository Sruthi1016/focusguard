let db;

let request = indexedDB.open("FocusGuardDB", 1);

request.onupgradeneeded = function(e){

db = e.target.result;

db.createObjectStore("users", { keyPath: "email" });

db.createObjectStore("productivity", { autoIncrement: true });

};

request.onsuccess = function(e){

db = e.target.result;

};


function saveUser(email,password){

let tx = db.transaction("users","readwrite");

let store = tx.objectStore("users");

store.add({

email:email,
password:password

});

}


function getUser(email,callback){

let tx = db.transaction("users","readonly");

let store = tx.objectStore("users");

let req = store.get(email);

req.onsuccess = function(){

callback(req.result);

};

}


function saveProductivity(score,distractions){

let tx = db.transaction("productivity","readwrite");

let store = tx.objectStore("productivity");

store.add({

score:score,
distractions:distractions,
date:new Date()

});

}
