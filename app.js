// Helper functions
const PI2 = Math.PI * 2;
const random = (min, max) => Math.random() * (max - min + 1) + min | 0;
const timestamp = () => new Date().getTime();

// Message rotation
const messages = [
    "ဒီနေ့ကလေ...",
    "ပုံမှန်နေ့လေးတွေထက် ပိုလှနေတာတော့ အမှန်ပဲ",
    "နှစ်တစ်နှစ်လည်း",
    "မျက်တောင်တစ်ခတ်လိုပဲ ကုန်တာမြန်လိုက်တာ",
    "ဒါပေမယ့် သိရဲ့လား",
    "ဒီနေ့ကလေ ထူးခြားတဲ့နေ့လေးပဲ",
    "ဆုံံ့အတွက်ဆိုရင် ပိုမှန်မှာပဲ",
    "ဒါကြောင့်",
    "Let's Celebrate ဆုံဆုံလေး",
    "ဆုံံ့အတွက် ပျော်စရာတွေ မျှ၀ေခွင့်ပြုပါ",
    "ဆုံံ့အတွက် အများကြီး မဟုတ်ပေမယ့်လည်း",
    "ဆုံံ့အတွက် အမှတ်တရ တစ်ခုအနေနဲ့",
    "ဒီလက်ဆောင်လေး ပေးပါရစေ...",
    "Thanks for being there",
    "Thanks for the friendship we made",
    "Thanks for everything",
    "I wish you all the best",
    "ပြီးတော့",
    "ဆုံံ့အတွက် မွေးနေ့မှစပြီး",
    "ပိုမိုကောင်းမွန်တဲ့ နေ့ရက်တွေ",
    "ပျော်စရာ အမှတ်တရတွေနဲ့",
    "ပြီးပြည့်စုံတဲ့ နှစ်တစ်နှစ်ဖြစ်လာပါစေ",
    "ကြုံလာမယ့် အရာတွေကိုလည်း ",
    "အပြုံးလေးနဲ့ ရင်ဆိုင်နိုင်ပြီးတော့",
    "အမှတ်တရ တစ်ခုအနေနဲ့ ရှိနိုင်ပါစေ...",
    "နောက်ဆုံး အနေနဲ့ မှာချင်တာကတော့",
    "ဂရုစိုက်ပါ",
    "ပျော်စရာတွေနဲ့ ဖြတ်သန်းပါ",
    "ဂရုစိုက်တဲ့ အရာတွေကိုလည်း တန်ဖိုးထားပါ",
    "ပျော်ပျော်လေးနေနော် ဆုံဆုံလေး",
    "A Very Happy Birthday <strong>မဆု၀ေထွေး</strong> လေးရေ..."
];

let messageIndex = 0;
const container = document.getElementById('messages-container');
const happyBirthdaySong = document.getElementById('happyBirthdaySong');
const startButton = document.getElementById('startButton');
let isMessageRotationActive = false;
let isMessageRotationComplete = false; // Add this flag to track completion
let birthday;

// Function to show the next message
function showNextMessage() {
  if (!isMessageRotationActive) return;

  container.innerHTML = `<div class="message">${messages[messageIndex]}</div>`;
  const messageElement = container.querySelector('.message');

  setTimeout(() => {
    messageElement.classList.add('show');
  }, 100);

  setTimeout(() => {
    messageElement.classList.remove('show');
  }, 5000); // Display each message for 5 seconds

  messageIndex = (messageIndex + 1) % messages.length;

  // Check if the last message is displayed
  if (messageIndex === 0) {
    happyBirthdaySong.loop = false; // Stop looping when all messages have been shown
    setTimeout(() => {
      happyBirthdaySong.pause(); // Pause the song after the last message
      happyBirthdaySong.currentTime = 0; // Reset the song to the beginning
      isMessageRotationActive = false; // Stop the message rotation
      isMessageRotationComplete = true; // Mark the message rotation as complete
    }, 5000); // Delay to ensure the last message is fully shown
  } else {
    setTimeout(showNextMessage, 5000); // Wait for 5 seconds before showing the next message
  }
}

// Function to start message rotation
function startMessageRotation() {
  isMessageRotationActive = true;
  happyBirthdaySong.loop = true; // Loop the song
  happyBirthdaySong.play(); // Play the Happy Birthday song
  showNextMessage(); // Start showing messages
}

// Function to start fireworks
function startFireworks() {
  birthday = new Birthday(); // Initialize fireworks
  birthday.resize(); // Set canvas size
  document.onclick = evt => birthday.onClick(evt); // Start fireworks on click
  document.ontouchstart = evt => birthday.onClick(evt); // Start fireworks on touch
}

// Event listener for the start button
startButton.addEventListener('click', () => {
  startMessageRotation();
  startFireworks();
  startButton.style.display = 'none'; // Hide the button after it's clicked
  document.getElementById('header').classList.add('show');
});

// Fireworks code
class Birthday {
  constructor() {
    this.resize();
    this.fireworks = [];
    this.counter = 0;
  }

  resize() {
    this.width = canvas.width = window.innerWidth;
    let center = this.width / 2 | 0;
    this.spawnA = center - center / 4 | 0;
    this.spawnB = center + center / 4 | 0;

    this.height = canvas.height = window.innerHeight;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.5;
  }

  onClick(evt) {
    let x = evt.clientX || evt.touches && evt.touches[0].pageX;
    let y = evt.clientY || evt.touches && evt.touches[0].pageY;

    let count = random(3, 5);
    for (let i = 0; i < count; i++) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)
      ));
    }
    this.counter = -1;
  }

  update(delta) {
    ctx.globalCompositeOperation = 'hard-light';
    ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = 'lighter';
    for (let firework of this.fireworks) firework.update(delta);

    this.counter += delta * 3; // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110)
      ));
      this.counter = 0;
    }

    // Remove the dead fireworks
    if (this.fireworks.length > 1000) {
      this.fireworks = this.fireworks.filter(firework => !firework.dead);
    }
  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false;
    this.offsprings = offsprings;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;

    this.shade = shade;
    this.history = [];
  }

  update(delta) {
    if (this.dead) return;

    let xDiff = this.targetX - this.x;
    let yDiff = this.targetY - this.y;
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;

      this.history.push({
        x: this.x,
        y: this.y
      });

      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        let babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0;
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0;

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i];
        ctx.beginPath();
        ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)';
        ctx.arc(point.x, point.y, 1, 0, PI2, false);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)';
      ctx.arc(this.x, this.y, 1, 0, PI2, false);
      ctx.fill();
    }
  }
}

// Initialize canvas
let canvas = document.getElementById('birthday');
let ctx = canvas.getContext('2d');
let then = timestamp();

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  let now = timestamp();
  let delta = now - then;
  then = now;
  if (birthday) birthday.update(delta / 1000); // Update fireworks animation
}

animateFireworks(); // Start the animation loop

window.addEventListener('beforeunload', (event) => {
  if (isMessageRotationActive) {
      event.preventDefault();
      event.returnValue = ''; // Standard way to trigger the confirmation dialog
  }
});

