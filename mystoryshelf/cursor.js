const cursor = document.getElementById("custom-cursor");
const header = document.querySelector(".header-image");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let isInHeader = false;


if (!cursor || !header) {
  console.warn("Custom cursor elements not found");
}


// Track mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Detect entering header
header.addEventListener("mouseenter", () => {
  isInHeader = true;

  cursor.style.opacity = "1";
  cursor.style.transform = "translate(-50%, -50%) scale(1.2)";
});

// Detect leaving header
header.addEventListener("mouseleave", () => {
  isInHeader = false;

  cursor.style.opacity = "0";
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

// Smooth animation
function animate() {
  if (isInHeader) {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";
  }

  requestAnimationFrame(animate);
}

animate();