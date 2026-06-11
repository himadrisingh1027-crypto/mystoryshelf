// Book data

import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

export async function loadBooks() {
  const container = document.getElementById("book-list");
  const emptyMsg = document.getElementById("emptyMessage");

 container.innerHTML = "<p>Loading stories...</p>";

  try {
    const snapshot = await getDocs(
  collection(db, "stories")
);

    container.innerHTML = "";

    if (snapshot.empty) {
      emptyMsg.style.display = "block";
      return;
    }

     snapshot.forEach(doc => {
    const story = doc.data();

    const preview = story.content
    ? story.content.substring(0, 120) + "..."
    : "No preview available";

    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
    <h3>${story.title}</h3>
    <p>${preview}</p>
    <button data-id="${doc.id}">Read More</button>
   `;

    card.querySelector("button").addEventListener("click", () => {
    window.location.href = `story.html?id=${doc.id}`;
   });

     container.appendChild(card);
  });

  } catch (error) {
    container.innerHTML = "<p>Error loading stories</p>";
    console.error(error);
  }
}