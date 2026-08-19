// ==========================================================
// ADMIN PANEL
// ==========================================================

console.log("Admin Dashboard Loaded");


// ==========================================================
// IMPORTS
// ==========================================================

import {
    db,
    auth,
    collection,
    addDoc,
    serverTimestamp
} from "../firebase/firebase.js";

import { uploadCover } from "./upload.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ==========================================================
// ELEMENTS
// ==========================================================

const title =
    document.getElementById("title");

const subtitle =
    document.getElementById("subtitle");

const author =
    document.getElementById("author");

const genre =
    document.getElementById("genre");

const tags =
    document.getElementById("tags");

const description =
    document.getElementById("description");

const coverImage =
    document.getElementById("coverImage");

const storyContent =
    document.getElementById("storyContent");

const featured =
    document.getElementById("featured");

const latest =
    document.getElementById("latest");

const publishBtn =
    document.getElementById("publishStory");

const saveDraftBtn =
    document.getElementById("saveDraft");


// ==========================================================




let currentUser = null;

onAuthStateChanged(auth, (user) => {

    if (user) {

        currentUser = user;

        console.log("✅ Admin authenticated:");
        console.log("Email:", user.email);
        console.log("UID:", user.uid);

    } else {

        currentUser = null;

        console.warn("❌ No authenticated user.");
    }

});







// EVENTS
// ==========================================================

if (publishBtn) {
    publishBtn.addEventListener(
        "click",
        publishStory
    );
}

if (saveDraftBtn) {
    saveDraftBtn.addEventListener(
        "click",
        saveDraft
    );
}


// ==========================================================
// PUBLISH STORY
// ==========================================================

async function publishStory() {

    try {

        // ------------------------------------------
        // READ FORM
        // ------------------------------------------

        const titleValue = title.value.trim();
        const subtitleValue = subtitle.value.trim();
        const authorValue = author.value.trim();
        const genreValue = genre.value;

        const tagsValue = tags.value
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "");

        const descriptionValue = description.value.trim();
        const contentValue = storyContent.value.trim();
        const coverFile = coverImage.files[0];


        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (!titleValue) {
            alert("Please enter a story title.");
            return;
        }

        if (!authorValue) {
            alert("Please enter the author name.");
            return;
        }

        if (!descriptionValue) {
            alert("Please enter a description.");
            return;
        }

        if (!contentValue) {
            alert("Please write the story content.");
            return;
        }


        // ------------------------------------------
        // BUTTON
        // ------------------------------------------

        publishBtn.disabled = true;
        publishBtn.textContent = "Publishing...";


        // ------------------------------------------
        // COVER IMAGE
        // ------------------------------------------

        let coverURL = "";

        if (coverFile) {

            console.log(
                "Uploading cover image..."
            );

            coverURL =
                await uploadCover(coverFile);

            console.log(
                "Cover uploaded:",
                coverURL
            );
        }


        // ------------------------------------------
        // STORY OBJECT
        // ------------------------------------------

        const story = {

            title: titleValue,

            subtitle: subtitleValue,

            author: authorValue,

            genre: genreValue,

            tags: tagsValue,

            description: descriptionValue,

            content: contentValue,

            coverImage: coverURL,

            featured: featured.checked,

            latest: latest.checked,

            draft: false,

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp(),

            views: 0,

            likes: 0,

            comments: 0,

            bookmarks: 0
        };


        console.log(
            "STEP 1: Story object created:",
            story
        );


        // ------------------------------------------
        // FIRESTORE DATABASE
        // ------------------------------------------

        console.log(
            "STEP 2: Firestore database:",
            db
        );


        console.log(
            "STEP 3: Attempting Firestore write..."
        );


        // IMPORTANT:
        // Declare storyRef here so it is available
        // throughout the rest of this function.

        const storyRef = await addDoc(
            collection(db, "stories"),
            story
        );


        // ------------------------------------------
        // FIRESTORE SUCCESS
        // ------------------------------------------

        console.log(
            "STEP 4: Firestore write successful:",
            storyRef.id
        );


        // ------------------------------------------
        // SUCCESS
        // ------------------------------------------

        alert(
            "Story published successfully!"
        );


        // ------------------------------------------
        // CLEAR FORM
        // ------------------------------------------

        clearForm();

    }

    catch (error) {

        console.error(
            "🔥 Publishing error:",
            error
        );

        alert(
            "Unable to publish story.\n\n" +
            error.message
        );

    }

    finally {

        publishBtn.disabled = false;

        publishBtn.textContent =
            "Publish Story";
    }
}



// ==========================================================
// SAVE DRAFT
// ==========================================================

async function saveDraft() {

    try {

        // ------------------------------------------
        // READ FORM
        // ------------------------------------------

        const titleValue =
            title.value.trim();

        const contentValue =
            storyContent.value.trim();


        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (!titleValue) {

            alert(
                "Please enter a story title."
            );

            return;
        }

        if (!contentValue) {

            alert(
                "Please write some story content."
            );

            return;
        }


        // ------------------------------------------
        // BUTTON
        // ------------------------------------------

        saveDraftBtn.disabled = true;

        saveDraftBtn.textContent =
            "Saving...";


        // ------------------------------------------
        // DRAFT OBJECT
        // ------------------------------------------

        const draft = {

            title:
                titleValue,

            subtitle:
                subtitle.value.trim(),

            author:
                author.value.trim(),

            genre:
                genre.value,

            tags:
                tags.value
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(tag => tag !== ""),

            description:
                description.value.trim(),

            content:
                contentValue,

            coverImage:
                "",

            featured:
                featured.checked,

            latest:
                latest.checked,

            draft:
                true,

            createdAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),

            views:
                0,

            likes:
                0,

            comments:
                0,

            bookmarks:
                0
        };


        console.log(
            "DRAFT OBJECT:",
            draft
        );


        // ------------------------------------------
        // FIRESTORE DATABASE
        // ------------------------------------------

        console.log(
            "Attempting to save draft..."
        );


        // ------------------------------------------
        // SAVE TO FIRESTORE
        // ------------------------------------------

        const draftRef = await addDoc(
            collection(db, "stories"),
            draft
        );


        // ------------------------------------------
        // SUCCESS
        // ------------------------------------------

        console.log(
            "Draft saved successfully:",
            draftRef.id
        );


        alert(
            "Draft saved successfully!"
        );


        // ------------------------------------------
        // CLEAR FORM
        // ------------------------------------------

        clearForm();

    }

    catch (error) {

        console.error(
            "🔥 Draft error:",
            error
        );

        alert(
            "Unable to save draft.\n\n" +
            error.message
        );

    }

     finally {

        saveDraftBtn.disabled = false;

        saveDraftBtn.textContent =
            "Save Draft";
    }
}


// ==========================================================
// CLEAR FORM
// ==========================================================

function clearForm() {

    title.value = "";

    subtitle.value = "";

    author.value = "Himadri Singh";

    genre.selectedIndex = 0;

    tags.value = "";

    description.value = "";

    storyContent.value = "";

    coverImage.value = "";

    featured.checked = false;

    latest.checked = false;
}