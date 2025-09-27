/* ================== CONFETTI ================== */
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
const confettis = [];

function startConfetti() {
  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      c: `hsl(${Math.random() * 360},100%,50%)`
    });
  }
  const card = document.querySelector('.card');
  card.style.transform = 'scale(1.05)';
  card.style.boxShadow = '0 0 30px rgba(255,64,129,0.7)';
  setTimeout(() => {
    card.style.transform = 'scale(1)';
    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
  }, 800);
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettis.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.c;
    ctx.fill();
    c.y += 2;
    if (c.y > confettiCanvas.height) c.y = -10;
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

/* ================== MUSIC ================== */
const music = document.getElementById("music");
function toggleMusic() {
  music.paused ? music.play() : music.pause();
}

/* ================== SECRET MESSAGE ================== */
const fullMessage = "Kamu adalah orang yang sangat spesial, semoga semua impianmu tercapai! dan semoga bisa tambah tinggi, Love You 💖";
let typingInterval;

function showMessage() {
  const msg = document.getElementById("secretMessage");
  const chime = document.getElementById("chime");

  if (msg.classList.contains("show")) {
    msg.classList.remove("show");
    msg.textContent = "";
    clearInterval(typingInterval);
    setTimeout(() => msg.style.display = "none", 800);
  } else {
    msg.style.display = "block";
    setTimeout(() => msg.classList.add("show"), 50);
    msg.textContent = "";

    let i = 0;
    typingInterval = setInterval(() => {
      if (i < fullMessage.length) {
        msg.textContent += fullMessage.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    createGlitter(msg);
    chime.play();
  }
}

function createGlitter(element) {
  for (let i = 0; i < 15; i++) {
    const glitter = document.createElement("div");
    glitter.classList.add("glitter");
    glitter.style.left = (element.offsetLeft + Math.random() * element.offsetWidth) + "px";
    glitter.style.top = (element.offsetTop + Math.random() * element.offsetHeight) + "px";
    glitter.style.animationDelay = (Math.random() * 2) + "s";
    document.body.appendChild(glitter);
    setTimeout(() => glitter.remove(), 3000);
  }
}
