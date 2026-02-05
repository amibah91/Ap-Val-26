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

// Question
const fullQuestion = "Big Sexy… will you be my Valentine? 🥺";

// No button text
const noTexts = [
  "No",
  "Are you sure, baby?",
  "Think again… 🤔",
  "Oh no?? 🤨",
  "Baby pls 🥹",
  "I'm begging for a crumb of peen",
  "Be soooo fr Apayo…",
  "You say you love me ☹️",
  "Why, baby, why?? 😭",
  "You’re breaking my heart 💔",
  "Fine… I’ll cry 😢"
];

const giggles = [
  "you are so smart!!! 😚😚",
  "*sobs but in a pretty way* 🥺",
  "*teehee* 😇",
  "try harder (but not really 🫣)",
  "*dramatic gasp* 😱",
  "*throws roses* 🌹",
  "*whispers: just press yes* 🥲"
];

function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}

// Typing animation
function typeText(el, text, speed = 45){
  el.textContent = "";
  let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(t);
  }, speed);
}

// Move No safely within the button area
function moveNoButton(){
  const areaRect = buttonArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const pad = 10;
  const maxX = areaRect.width - btnRect.width - pad;
  const maxY = areaRect.height - btnRect.height - pad;

  const x = Math.random() * clamp(maxX, 0, maxX);
  const y = Math.random() * clamp(maxY, 0, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Yes grows after 2 dodges
function growYesButton(){
  if (noCount < 2) return;
  const scale = clamp(1 + (noCount - 1) * 0.22, 1, 4);
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

// Hearts
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

// No button behavior (THIS is the important fix)
function dodgeNo(){
  // First interaction: pull No out of flex, but keep it visible
  if (noCount === 0) {
    noBtn.style.position = "absolute";
    noBtn.style.zIndex = "999";
  }

  // Tiny shake before escaping
  noBtn.classList.remove("shake-no");
  void noBtn.offsetWidth;
  noBtn.classList.add("shake-no");

  setTimeout(() => {
    noCount++;
    setNoText();
    setGiggle();
    growYesButton();
    moveNoButton();
  }, 140);
}

// Events
noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener("click", dodgeNo);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeNo();
}, { passive: false });

yesBtn.addEventListener("click", () => {
  askScreen.classList.add("hidden");
  yesScreen.classList.remove("hidden");
  startHearts(6500);
});

replayBtn.addEventListener("click", () => {
  noCount = 0;
  noBtn.textContent = "No";
  giggleEl.textContent = "you are so smart!!! 😚😚";
  yesBtn.style.transform = "scale(1)";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.position = "relative";
  askScreen.classList.remove("hidden");
  yesScreen.classList.add("hidden");
  typeText(questionEl, fullQuestion, 45);
});

// Start
typeText(questionEl, fullQuestion, 45);
yesBtn.classList.add("pulse-yes");
