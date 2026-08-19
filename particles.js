// Creates magical dust particles that follow the cursor
// inside the hero section.

// ELEMENTS

const hero = document.querySelector(".header-image");
const particleLayer = document.getElementById("particle-layer");

// SAFETY CHECK

if (!hero || !particleLayer) {

    console.warn("Particle system not initialized.");

} else {

    initializeParticles();

}

// SETTINGS

const SPAWN_DELAY = 18;          // About 55 particles/sec
const MAX_PARTICLES = 120;

let lastSpawn = 0;

// INITIALIZE

function initializeParticles() {

    hero.addEventListener("mousemove", handleMouseMove);

}

// MOUSE MOVE

function handleMouseMove(event) {

    const now = Date.now();

    if (now - lastSpawn < SPAWN_DELAY) return;

    lastSpawn = now;

    if (particleLayer.children.length >= MAX_PARTICLES) return;

    createParticle(
        event.clientX,
        event.clientY
    );
}

// CREATE PARTICLE

function createParticle(x, y) {

    const particle = document.createElement("div");
    particle.className = "particle";

    // Random properties

    const size = random(3, 8);
    const drift = random(-30, 30);
    const duration = random(1.8, 2.8);

    // Position

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Size

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Animation

    particle.style.animationDuration = `${duration}s`;

    particle.style.setProperty("--x-drift", `${drift}px`);

    particleLayer.appendChild(particle);

    // Remove after animation

    setTimeout(() => {

        particle.remove();

    }, duration * 1000);

}

// RANDOM NUMBER

function random(min, max) {

    return Math.random() * (max - min) + min;

}