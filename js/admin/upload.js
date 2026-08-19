// ==========================================================
// CLOUDINARY IMAGE UPLOAD
// ==========================================================

const CLOUD_NAME = "tc9vd4dm";

const UPLOAD_PRESET = "story-covers";

const CLOUDINARY_URL =
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


// ==========================================================
// UPLOAD COVER IMAGE
// ==========================================================

export async function uploadCover(file) {

    if (!file) {

        throw new Error("No image selected.");

    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET);

    try {

        const response = await fetch(CLOUDINARY_URL, {

            method: "POST",

            body: formData

        });

        if (!response.ok) {

            throw new Error("Image upload failed.");

        }

        const data = await response.json();

        console.log("Cloudinary Upload Success");

        console.log(data);

        return data.secure_url;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}