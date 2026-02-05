const askScreen = document.getElementById("askScreen");
const yesScreen = document.getElementById("yesScreen");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");

const replayBtn = document.getElementById("replayBtn");
const heartsLayer = document.getElementById("heartsLayer");

const questionEl = document.getElementById("question");
const giggleEl = document.getElementById("giggle");

let noCount = 0;

// ✨ change THIS text if you want to tweak the question
const fullQuestion = "Big Sexy… will you be my Valentine? 🥺";

const noTexts = [
  "No",
  "Are you sure, baby?",
  "Think again… 🤔",
  "Really no??",
  "Baby pls 😭",
  "I'm begging for a crumb of peen 😔",
  "Be soooo fr Apayo…",
  "You sayyyy you love me 🤨",
  "Okay but… why??",
  "You’re breaking my heart 💔",
  "Fine… I’ll cry 😢"
];

const giggles = [
  "you are so smart!!! 😚😚",
  "*sobs but in a pretty way* 🥺",
  "*teehee* 😇",
  "try harder (but not really 🫣)",
  "*dramatic gasp* 😱",
  "*throws roses anyway* 🌹",
  "*whispers: just press yes* 🥲"
];

function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}

function typeText(el, text, speed = 45){
  el.textContent = "";
  let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(t);
  }, speed);
}

function moveNoButton(){
  const areaRect = buttonArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const pad = 6;
  const maxX = areaRect.width - btnRect.width - pad;
  const maxY = areaRect.height - btnRect.height - pad;

  const x = Math.random() * clamp(maxX, 0, maxX);
  const y = Math.random() * clamp(maxY, 0, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function growYesButton(){
  const scale = clamp(1 + noCount * 0.22, 1, 4.2);
  yesBtn.style.transform = `scale(${scale})`;
}

function setNoText(){
  const i = clamp(noCount, 0, noTexts.length - 1);
  noBtn.textContent = noTexts[i];
}

function setGiggle(){
  const i = clamp(noCount, 0, giggles.length - 1);
  giggleEl.textContent = giggles[i];
}

function startHearts(durationMs = 5000){
  const spawn = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = Math.random() < 0.5 ? "❤️" : "💖";

    const left = Math.random() * 100;
    const size = 16 + Math.random() * 22;
    const fallTime = 2.5 + Math.random() * 2.5;

    heart.style.left = `${left}vw`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${fallTime}s`;

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), (fallTime + 0.2) * 1000);
  }, 120);

  setTimeout(() => clearInterval(spawn), durationMs);
}

function dodgeNo(){
  noCount++;
  setNoText();
  setGiggle();
  growYesButton();
  moveNoButton();
}

// 🏃‍♂️ no button dodges
noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeNo();
}, { passive: false });
noBtn.addEventListener("click", dodgeNo);

yesBtn.addEventListener("click", () => {
  askScreen.classList.add("hidden");
  yesScreen.classList.remove("hidden");
  startHearts(6500);
});

replayBtn.addEventListener("click", () => {
  noCount = 0;
  noBtn.textContent = "No";
  giggleEl.textContent = "*giggles* 😇";
  yesBtn.style.transform = "scale(1)";
  noBtn.style.left = "";
  noBtn.style.top = "";
  askScreen.classList.remove("hidden");
  yesScreen.classList.add("hidden");
  typeText(questionEl, fullQuestion, 45);
});

// start animation
typeText(questionEl, fullQuestion, 45);
// moveNoButton();
