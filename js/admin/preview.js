// ==========================================================
// BOOK PREVIEW
// ==========================================================

console.log("Book Preview Loaded");


// ==========================================================
// INPUTS
// ==========================================================

const titleInput =
    document.getElementById("title");

const authorInput =
    document.getElementById("author");

const genreInput =
    document.getElementById("genre");

const spineColor =
    document.getElementById("spineColor");

const titleColor =
    document.getElementById("titleColor");

const genreColor =
    document.getElementById("genreColor");

const authorColor =
    document.getElementById("authorColor");

const coverInput =
    document.getElementById("coverImage");

const storyContent =
    document.getElementById("storyContent");


// ==========================================================
// PREVIEW ELEMENTS
// ==========================================================

const previewTitle =
    document.getElementById("previewTitle");

const previewGenre =
    document.getElementById("previewGenre");

const previewAuthor =
    document.getElementById("previewAuthor");

const previewSpine =
    document.getElementById("previewSpine");

const previewCover =
    document.getElementById("previewCover");


// ==========================================================
// TITLE
// ==========================================================

titleInput.addEventListener("input", () => {

    previewTitle.textContent =
        titleInput.value || "Story Title";

});


// ==========================================================
// AUTHOR
// ==========================================================

authorInput.addEventListener("input", () => {

    previewAuthor.textContent =
        authorInput.value || "Author";

});


// ==========================================================
// GENRE
// ==========================================================

genreInput.addEventListener("change", () => {

    previewGenre.textContent =
        genreInput.value || "Genre";

});


// ==========================================================
// SPINE COLOUR
// ==========================================================

spineColor.addEventListener("input", () => {

    previewSpine.style.backgroundColor =
        spineColor.value;

});


// ==========================================================
// TITLE COLOUR
// ==========================================================

titleColor.addEventListener("input", () => {

    previewTitle.style.color =
        titleColor.value;

});


// ==========================================================
// GENRE COLOUR
// ==========================================================

genreColor.addEventListener("input", () => {

    previewGenre.style.color =
        genreColor.value;

});


// ==========================================================
// AUTHOR COLOUR
// ==========================================================

authorColor.addEventListener("input", () => {

    previewAuthor.style.color =
        authorColor.value;

});


// ==========================================================
// COVER IMAGE PREVIEW
// ==========================================================

coverInput.addEventListener("change", () => {

    const file =
        coverInput.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function(event) {

        previewCover.style.backgroundImage =
            `url("${event.target.result}")`;

        previewCover.style.backgroundSize =
            "cover";

        previewCover.style.backgroundPosition =
            "center";

        previewCover.innerHTML = "";

    };

    reader.readAsDataURL(file);

});
// WORD COUNT

storyContent.addEventListener("input", () => {

    const words =
        storyContent.value
            .trim()
            .split(/\s+/)
            .filter(word => word.length > 0);

    console.log(
        "Words:",
        words.length
    );

});