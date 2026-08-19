// ==========================================================
// SEARCH.JS
// My Story Shelf
// ==========================================================

import {
    searchStories
} from "./stories.js";


// ==========================================================
// ELEMENTS
// ==========================================================

const heroSearch =
    document.querySelector(".hero-search");

const searchIcon =
    document.querySelector(".search-icon");

const input =
    document.getElementById("searchInput");

const suggestions =
    document.getElementById("searchSuggestions");


// ==========================================================
// VALIDATION
// ==========================================================

if (
    !heroSearch ||
    !searchIcon ||
    !input ||
    !suggestions
) {

    console.warn(
        "⚠️ Search elements not found."
    );

}
else {

    initializeSearch();

}


// ==========================================================
// SEARCH
// ==========================================================

function initializeSearch() {

    input.addEventListener(
        "input",
        handleSearch
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                !event.target.closest(
                    ".hero-search"
                )
            ) {

                suggestions.style.display =
                    "none";

            }

        }
    );

}


// ==========================================================
// HANDLE SEARCH
// ==========================================================

function handleSearch() {

    const value =
        input.value
            .trim();


    if (!value) {

        searchIcon.classList.remove(
            "hide"
        );

        heroSearch.classList.remove(
            "typing"
        );


        suggestions.innerHTML = "";

        suggestions.style.display =
            "none";


        searchStories("");

        return;

    }


    searchIcon.classList.add(
        "hide"
    );

    heroSearch.classList.add(
        "typing"
    );


    searchStories(value);


    showSearchMessage(value);

}


// ==========================================================
// SEARCH MESSAGE
// ==========================================================

function showSearchMessage(value) {

    suggestions.innerHTML = `

        <div class="search-item">

            <i class="fa-solid fa-book"></i>

            Searching for
            <strong>
                ${escapeHTML(value)}
            </strong>

        </div>

    `;


    suggestions.style.display =
        "block";

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