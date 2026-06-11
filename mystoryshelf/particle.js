// =========================PARTICLE SYSTEM=========================

const particleLayer = document.getElementById("particle-layer");

let lastSpawn = 0;
const spawnDelay = 60; // ms
const maxParticles = 30;

// ========================MOUSE MOVE LISTENER=========================

document.querySelector(".header-image").addEventListener("mousemove", (e) => {
  const now = Date.now();

  // Throttle spawn
  if (now - lastSpawn < spawnDelay) return;
  lastSpawn = now;

  // Limit total particles
  if (particleLayer.children.length > maxParticles) return;

  createParticle(e.clientX, e.clientY);
});

// =========================CREATE PARTICLE=========================

function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Random values
  const size = Math.random() * 6 + 4; // 4px → 10px
  const drift = (Math.random() - 0.5) * 40; // -20px → 20px
  const duration = Math.random() * 1 + 1.5; // 1.5s → 2.5s

  // Apply styles
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  particle.style.setProperty("--x-drift", `${drift}px`);
  particle.style.animationDuration = `${duration}s`;

  // Add slight random offset (natural feel)
  particle.style.transform = `translate(-50%, -50%)`;

  // Add to DOM
  particleLayer.appendChild(particle);

  // Remove after animation
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}