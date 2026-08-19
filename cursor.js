// Magical cursor and sparkle trail for the Hero section
// ELEMENTS

const cursor = document.getElementById("custom-cursor");
const hero = document.querySelector(".hero");

// SAFETY CHECK

if (!cursor || !hero) {

    console.warn("Custom cursor not initialized.");

} else {

    initializeCursor();

}

// SETTINGS

const SPARK_DELAY = 18;          // ~55 sparks/sec
const SPARK_LIFETIME = 1600;

let lastSpark = 0;

// INITIALIZE

function initializeCursor() {

    hero.addEventListener("mouseenter", showCursor);

    hero.addEventListener("mouseleave", hideCursor);

    document.addEventListener("mousemove", moveCursor);

    hero.addEventListener("mousemove", createSparkTrail);

}

// CURSOR

function showCursor() {

    cursor.style.opacity = "1";

}

function hideCursor() {

    cursor.style.opacity = "0";

}

function moveCursor(event) {

    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;

}

// SPARK TRAIL

function createSparkTrail(event) {

    const now = Date.now();

    if (now - lastSpark < SPARK_DELAY) return;

    lastSpark = now;

    createSpark(
        event.clientX,
        event.clientY
    );

}

// CREATE SPARK

function createSpark(x, y) {

    const spark = document.createElement("span");

    spark.className = getSparkType();

    const size = random(4, 10);

    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    spark.style.setProperty("--x", `${random(-25, 25)}px`);

    spark.style.setProperty("--y", `${random(-25, 25)}px`);

    document.body.appendChild(spark);

    setTimeout(() => {

        spark.remove();

    }, SPARK_LIFETIME);

}

// RANDOM SPARK TYPE

function getSparkType() {

    const randomValue = Math.random();

    if (randomValue < 0.70) {

        return "spark dust";

    }

    if (randomValue < 0.90) {

        return "spark star";

    }

    return "spark fleck";

}

// RANDOM NUMBER

function random(min, max) {

    return Math.random() * (max - min) + min;

}