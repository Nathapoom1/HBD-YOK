// Fireworks Animation
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.radius = 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.speed = 3 + Math.random() * 3;
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.exploded = true;
                this.createParticles();
            }
        } else {
            this.particles.forEach(p => p.update());
        }
    }

    createParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            this.particles.forEach(p => p.draw());
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.color = color;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
    }

    draw() {
        if (this.life > 0) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }

    fireworks.forEach(fw => {
        fw.update();
        fw.draw();
    });

    fireworks = fireworks.filter(fw => fw.particles.some(p => p.life > 0) || !fw.exploded);

    requestAnimationFrame(animate);
}

animate();

// Floating Flowers Animation
function createFloatingFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.innerHTML = ['🌸', '🌺', '🌼', '🌷', '🌹', '💐'][Math.floor(Math.random() * 6)];
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDelay = Math.random() * 3 + 's';
    flower.style.animationDuration = (5 + Math.random() * 3) + 's';
    
    document.getElementById('flowersContainer').appendChild(flower);
    
    setTimeout(() => {
        flower.remove();
    }, 8000);
}

setInterval(createFloatingFlower, 2000);

// Music Control
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('musicBtn');
let isMusicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i> เปิดเพลง';
        isMusicPlaying = false;
    } else {
        music.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> หยุดเพลง';
        isMusicPlaying = true;
    }
});

// Surprise Button with Modal
const surpriseBtn = document.getElementById('surpriseBtn');
const modal = document.getElementById('surpriseModal');
const closeBtn = document.querySelector('.close');

surpriseBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    // เริ่มเพลงถ้ายังไม่เล่น
    if (!isMusicPlaying) {
        music.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> หยุดเพลง';
        isMusicPlaying = true;
    }
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Photo Upload Functionality
function addPhoto(imgId) {
    const photoInput = document.getElementById('photoInput');
    photoInput.onchange = function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.getElementById(imgId);
                img.src = e.target.result;
                img.style.display = 'block';
                img.parentElement.querySelector('.add-photo').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    };
    photoInput.click();
}

// Music Upload Functionality
const addMusicBtn = document.getElementById('addMusicBtn');
const musicInput = document.getElementById('musicInput');

addMusicBtn.addEventListener('click', () => {
    musicInput.click();
});

musicInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const audioUrl = URL.createObjectURL(file);
        music.src = audioUrl;
        alert('เพิ่มเพลงใหม่เรียบร้อยแล้ว! 🎵');
    }
});

// Window resize handler for fireworks
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initial flower creation
for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingFlower, i * 1000);
}
