import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { db } from "js/firebase/firebase.js";

const querySnapshot = await getDocs(collection(db, "stories"));

querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});