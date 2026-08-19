// ==========================================================
// STORIES.JS
// My Story Shelf
// Loads published stories from Firestore
// ==========================================================

import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// ==========================================================
// GLOBAL STORIES
// ==========================================================

let allStories = [];


// ==========================================================
// INITIALIZE
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadStories();

});


// ==========================================================
// LOAD STORIES FROM FIRESTORE
// ==========================================================

async function loadStories() {

    try {

        console.log("📚 Loading stories from Firestore...");


        const storiesQuery = query(
            collection(db, "stories"),
            orderBy("createdAt", "desc")
        );


        const snapshot =
            await getDocs(storiesQuery);


        allStories = [];


        snapshot.forEach((documentSnapshot) => {

            const data =
                documentSnapshot.data();


            // ------------------------------------------
            // ONLY SHOW PUBLISHED STORIES
            // ------------------------------------------

            if (data.draft === false) {

                allStories.push({

                    id:
                        documentSnapshot.id,

                    ...data

                });

            }

        });


        console.log(
            "📚 Published stories loaded:",
            allStories.length
        );


        console.log(
            "📚 Stories:",
            allStories
        );


        // ------------------------------------------
        // RENDER
        // ------------------------------------------

        renderLatestStories();

        renderAllStories();


    }
    catch (error) {

        console.error(
            "🔥 Failed to load stories:",
            error
        );

    }

}


// ==========================================================
// LATEST STORIES
// ==========================================================

function renderLatestStories() {

    const shelf =
        document.getElementById("bookshelf");


    if (!shelf) {

        console.warn(
            "⚠️ #bookshelf was not found."
        );

        return;

    }


    shelf.innerHTML = "";


    // Show maximum 6 latest stories

    allStories
        .slice(0, 6)
        .forEach((story) => {

            shelf.innerHTML +=
                createShelfBook(story);

        });

}


// ==========================================================
// ALL STORIES
// ==========================================================

function renderAllStories() {

    const container =
        document.getElementById("storyList");


    if (!container) {

        console.warn(
            "⚠️ #storyList was not found."
        );

        return;

    }


    container.innerHTML = "";


    if (allStories.length === 0) {

        container.innerHTML = `

            <div class="no-stories">

                <p>
                    No stories have been published yet.
                </p>

            </div>

        `;

        return;

    }


    allStories.forEach((story) => {

        container.innerHTML +=
            createStoryCard(story);

    });

}


// ==========================================================
// CREATE SHELF BOOK
// ==========================================================

function createShelfBook(story) {

    const cover =
        story.coverImage || "";


    return `

        <article
            class="book"
            data-story-id="${story.id}"
        >

            <div class="book-spine">

                <span class="book-title">
                    ${escapeHTML(story.title)}
                </span>

            </div>


            <div class="book-cover">

                ${
                    cover

                    ?

                    `
                    <img
                        src="${escapeAttribute(cover)}"
                        alt="${escapeAttribute(story.title)}"
                    >
                    `

                    :

                    `
                    <div class="book-cover-placeholder">
                        No Cover
                    </div>
                    `
                }

            </div>

        </article>

    `;

}


// ==========================================================
// CREATE STORY CARD
// ==========================================================

function createStoryCard(story) {

    const cover =
        story.coverImage || "";


    return `

        <article
            class="story-card"
            data-story-id="${story.id}"
        >

            ${
                cover

                ?

                `
                <img
                    src="${escapeAttribute(cover)}"
                    alt="${escapeAttribute(story.title)}"
                >
                `

                :

                `
                <div class="story-cover-placeholder">
                    No Cover
                </div>
                `
            }


            <div class="story-card-content">

                <h3>
                    ${escapeHTML(story.title)}
                </h3>


                ${
                    story.subtitle

                    ?

                    `
                    <h4>
                        ${escapeHTML(story.subtitle)}
                    </h4>
                    `

                    :

                    ""
                }


                <p>
                    ${escapeHTML(story.description || "")}
                </p>


                ${
                    story.author

                    ?

                    `
                    <span class="story-author">
                        ${escapeHTML(story.author)}
                    </span>
                    `

                    :

                    ""
                }


                <button
                    type="button"
                    onclick="location.href='story.html?id=${encodeURIComponent(story.id)}'"
                >
                    Read Story
                </button>

            </div>

        </article>

    `;

}


// ==========================================================
// SEARCH STORIES
// ==========================================================

export function searchStories(searchTerm) {

    const value =
        searchTerm
            .toLowerCase()
            .trim();


    if (!value) {

        renderAllStories();

        return;

    }


    const filteredStories =
        allStories.filter((story) => {

            const title =
                (story.title || "")
                    .toLowerCase();

            const author =
                (story.author || "")
                    .toLowerCase();

            const genre =
                (story.genre || "")
                    .toLowerCase();


            return (

                title.includes(value) ||

                author.includes(value) ||

                genre.includes(value)

            );

        });


    renderFilteredStories(filteredStories);

}


// ==========================================================
// RENDER FILTERED STORIES
// ==========================================================

function renderFilteredStories(stories) {

    const container =
        document.getElementById("storyList");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (stories.length === 0) {

        container.innerHTML = `

            <div class="no-stories">

                <p>
                    No stories found.
                </p>

            </div>

        `;

        return;

    }


    stories.forEach((story) => {

        container.innerHTML +=
            createStoryCard(story);

    });

}


// ==========================================================
// OPEN STORY
// ==========================================================

export function openStory(id) {

    window.location.href =
        `story.html?id=${encodeURIComponent(id)}`;

}


// ==========================================================
// HTML SAFETY
// ==========================================================

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


// ==========================================================
// EXPORTS
// ==========================================================

export {
    loadStories,
    renderLatestStories,
    renderAllStories,
    createStoryCard,
    createShelfBook
};