import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { db } from "./firebase.js";

const querySnapshot = await getDocs(collection(db, "stories"));

querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});