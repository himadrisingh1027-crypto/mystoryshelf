// ==========================================================
// MY STORY SHELF
// STORY PAGE
// ==========================================================

import {
    db,
    doc,
    getDoc,
    updateDoc
} from "../firebase/firebase.js";


// ==========================================================
// DEBUG
// ==========================================================

console.log("📖 Story Page Loaded");


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const storyLoading =
    document.getElementById("storyLoading");

const storyContainer =
    document.getElementById("storyContainer");

const storyError =
    document.getElementById("storyError");

const storyCover =
    document.getElementById("storyCover");

const storyGenre =
    document.getElementById("storyGenre");

const storyTitle =
    document.getElementById("storyTitle");

const storySubtitle =
    document.getElementById("storySubtitle");

const storyAuthor =
    document.getElementById("storyAuthor");

const storyTags =
    document.getElementById("storyTags");

const storyDescription =
    document.getElementById("storyDescription");

const storyContent =
    document.getElementById("storyContent");


// ==========================================================
// GET STORY ID FROM URL
// ==========================================================

const urlParams =
    new URLSearchParams(window.location.search);

const storyId =
    urlParams.get("id");


console.log(
    "📖 Story ID:",
    storyId
);


// ==========================================================
// INITIAL VALIDATION
// ==========================================================

if (!storyId) {

    console.error(
        "❌ No story ID found in URL."
    );

    showError();

} else {

    loadStory();

}


// ==========================================================
// LOAD STORY
// ==========================================================

async function loadStory() {

    try {

        console.log(
            "📖 Loading story from Firestore..."
        );


        // --------------------------------------------------
        // SHOW LOADING
        // --------------------------------------------------

        showLoading();


        // --------------------------------------------------
        // CREATE FIRESTORE REFERENCE
        // --------------------------------------------------

        const storyRef =
            doc(
                db,
                "stories",
                storyId
            );


        console.log(
            "📖 Firestore reference created:",
            storyRef
        );


        // --------------------------------------------------
        // GET DOCUMENT
        // --------------------------------------------------

        const storySnapshot =
            await getDoc(storyRef);


        // --------------------------------------------------
        // CHECK IF STORY EXISTS
        // --------------------------------------------------

        if (!storySnapshot.exists()) {

            console.warn(
                "⚠️ Story does not exist:",
                storyId
            );

            showError();

            return;
        }


        // --------------------------------------------------
        // GET STORY DATA
        // --------------------------------------------------

        const story =
            storySnapshot.data();


        console.log(
            "📖 Story loaded:",
            story
        );


        // --------------------------------------------------
        // DISPLAY STORY
        // --------------------------------------------------

        displayStory(story);


        // --------------------------------------------------
        // INCREMENT VIEWS
        // --------------------------------------------------

        await incrementViews(
            storyRef,
            story
        );


    }

    catch (error) {

        console.error(
            "🔥 Failed to load story:",
            error
        );

        showError();

    }

}


// ==========================================================
// DISPLAY STORY
// ==========================================================

function displayStory(story) {

    try {

        // --------------------------------------------------
        // TITLE
        // --------------------------------------------------

        if (storyTitle) {

            storyTitle.textContent =
                story.title || "Untitled Story";

        }


        // --------------------------------------------------
        // SUBTITLE
        // --------------------------------------------------

        if (storySubtitle) {

            if (story.subtitle) {

                storySubtitle.textContent =
                    story.subtitle;

                storySubtitle.style.display =
                    "block";

            } else {

                storySubtitle.textContent =
                    "";

                storySubtitle.style.display =
                    "none";

            }

        }


        // --------------------------------------------------
        // AUTHOR
        // --------------------------------------------------

        if (storyAuthor) {

            if (story.author) {

                storyAuthor.textContent =
                    `By ${story.author}`;

                storyAuthor.style.display =
                    "block";

            } else {

                storyAuthor.textContent =
                    "";

                storyAuthor.style.display =
                    "none";

            }

        }


        // --------------------------------------------------
        // GENRE
        // --------------------------------------------------

        if (storyGenre) {

            if (story.genre) {

                storyGenre.textContent =
                    story.genre;

                storyGenre.style.display =
                    "inline-block";

            } else {

                storyGenre.textContent =
                    "";

                storyGenre.style.display =
                    "none";

            }

        }


        // --------------------------------------------------
        // TAGS
        // --------------------------------------------------

        if (storyTags) {

            storyTags.innerHTML = "";

            if (
                Array.isArray(story.tags) &&
                story.tags.length > 0
            ) {

                story.tags.forEach(
                    tag => {

                        const tagElement =
                            document.createElement("span");

                        tagElement.className =
                            "story-tag";

                        tagElement.textContent =
                            `#${tag}`;

                        storyTags.appendChild(
                            tagElement
                        );

                    }
                );

                storyTags.style.display =
                    "flex";

            } else {

                storyTags.style.display =
                    "none";

            }

        }


        // --------------------------------------------------
        // DESCRIPTION
        // --------------------------------------------------

        if (storyDescription) {

            if (story.description) {

                storyDescription.textContent =
                    story.description;

                storyDescription.style.display =
                    "block";

            } else {

                storyDescription.textContent =
                    "";

                storyDescription.style.display =
                    "none";

            }

        }


        // --------------------------------------------------
        // COVER IMAGE
        // --------------------------------------------------

        if (storyCover) {

            if (story.coverImage) {

                storyCover.src =
                    story.coverImage;

                storyCover.alt =
                    story.title
                        ? `${story.title} cover`
                        : "Story cover";

                storyCover.style.display =
                    "block";

            } else {

                storyCover.removeAttribute(
                    "src"
                );

                storyCover.alt =
                    "No cover image";

                storyCover.style.display =
                    "none";

            }

        }


        // --------------------------------------------------
        // STORY CONTENT
        // --------------------------------------------------

        if (storyContent) {

            storyContent.innerHTML =
                formatStoryContent(
                    story.content || ""
                );

        }


        // --------------------------------------------------
        // UPDATE PAGE TITLE
        // --------------------------------------------------

        document.title =
            story.title
                ? `${story.title} | My Story Shelf`
                : "Story | My Story Shelf";


        // --------------------------------------------------
        // SHOW STORY
        // --------------------------------------------------

        if (storyLoading) {

            storyLoading.style.display =
                "none";

        }

        if (storyError) {

            storyError.style.display =
                "none";

        }

        if (storyContainer) {

            storyContainer.style.display =
                "grid";

        }


        console.log(
            "✅ Story displayed successfully."
        );

    }

    catch (error) {

        console.error(
            "🔥 Error displaying story:",
            error
        );

        showError();

    }

}


// ==========================================================
// FORMAT STORY CONTENT
// ==========================================================

function formatStoryContent(content) {

    if (!content) {

        return `
            <p class="story-empty">
                This story doesn't have any content yet.
            </p>
        `;

    }


    // ------------------------------------------------------
    // Escape HTML
    // ------------------------------------------------------

    const escapedContent =
        escapeHTML(content);


    // ------------------------------------------------------
    // Convert line breaks into paragraphs
    // ------------------------------------------------------

    const paragraphs =
        escapedContent
            .split(/\n\s*\n/)
            .map(
                paragraph =>
                    paragraph.trim()
            )
            .filter(
                paragraph =>
                    paragraph.length > 0
            );


    return paragraphs
        .map(
            paragraph => {

                const formatted =
                    paragraph
                        .replace(
                            /\n/g,
                            "<br>"
                        );

                return `
                    <p>
                        ${formatted}
                    </p>
                `;

            }
        )
        .join("");

}


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================================
// INCREMENT VIEWS
// ==========================================================

async function incrementViews(
    storyRef,
    story
) {

    try {

        const currentViews =
            Number(
                story.views || 0
            );


        await updateDoc(
            storyRef,
            {
                views:
                    currentViews + 1
            }
        );


        console.log(
            "👁️ Story view count updated:",
            currentViews + 1
        );

    }

    catch (error) {

        /*
         * View counting should NOT prevent
         * the story from being displayed.
         */

        console.warn(
            "⚠️ Could not update view count:",
            error
        );

    }

}


// ==========================================================
// SHOW LOADING
// ==========================================================

function showLoading() {

    if (storyLoading) {

        storyLoading.style.display =
            "block";

    }

    if (storyContainer) {

        storyContainer.style.display =
            "none";

    }

    if (storyError) {

        storyError.style.display =
            "none";

    }

}


// ==========================================================
// SHOW ERROR
// ==========================================================

function showError() {

    if (storyLoading) {

        storyLoading.style.display =
            "none";

    }

    if (storyContainer) {

        storyContainer.style.display =
            "none";

    }

    if (storyError) {

        storyError.style.display =
            "flex";

    }

}


// ==========================================================
// BACK BUTTON
// ==========================================================

const backButton =
    document.querySelector(
        ".back-button"
    );


if (backButton) {

    backButton.addEventListener(
        "click",
        event => {

            /*
             * Normal browser navigation
             * is enough here.
             */

        }
    );

}

// ==========================================================
// STORY COPY PROTECTION
// ==========================================================

if (storyContent) {

    // Prevent right-click inside story
    storyContent.addEventListener(
        "contextmenu",
        function (event) {

            event.preventDefault();

        }
    );


    // Prevent copy
    storyContent.addEventListener(
        "copy",
        function (event) {

            event.preventDefault();

        }
    );


    // Prevent cut
    storyContent.addEventListener(
        "cut",
        function (event) {

            event.preventDefault();

        }
    );


    // Prevent drag selection
    storyContent.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        }
    );

}

// ==========================================================
// PREVENT CTRL+C / CTRL+X
// ==========================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.ctrlKey &&
            (
                event.key.toLowerCase() === "c" ||
                event.key.toLowerCase() === "x"
            )
        ) {

            const selection =
                window.getSelection();

            if (
                selection &&
                selection.toString().length > 0
            ) {

                event.preventDefault();

            }

        }

    }
);