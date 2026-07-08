import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFk7skhWtLdMUd-Kwok7K1ZjOY_NaPwkU",
  authDomain: "bha-first-page-generator.firebaseapp.com",
  projectId: "bha-first-page-generator",
  storageBucket: "bha-first-page-generator.firebasestorage.app",
  messagingSenderId: "156105221087",
  appId: "1:156105221087:web:f3b0a04324d114ad471a6a",
  measurementId: "G-XJKB5SYHGZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;

console.log("Firebase Connected Successfully");


/*window.saveStudent = async function(name, className, rollNo){

    if(name.trim()==="") return;

    await setDoc(
        doc(db,"students",name.trim().toLowerCase()),
        {
            name:name.trim(),
            className:className.trim(),
            rollNo:rollNo.trim()
        }
    );

    console.log("Student Saved");
}
*/


window.saveStudent = async function(name, className, rollNo) {

    name = name.trim();
    className = className.trim();
    rollNo = rollNo.trim();

    if (name === "") return;

    const studentsRef = collection(db, "students");

    const q = query(
        studentsRef,
        where("name", "==", name)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {

        await addDoc(studentsRef, {
            name: name,
            className: className,
            rollNo: rollNo
        });

        console.log("New Student Added");

    } else {

        const document = querySnapshot.docs[0];

        await updateDoc(document.ref, {
            className: className,
            rollNo: rollNo
        });

        console.log("Student Updated");

    }

}


window.loadStudent = async function(name) {

    name = name.trim();

    if (name === "") {
        document.getElementById("className").value = "";
        document.getElementById("rollNo").value = "";
        return;
    }

    const studentsRef = collection(db, "students");

    const q = query(
        studentsRef,
        where("name", "==", name)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {

        document.getElementById("className").value = "";
        document.getElementById("rollNo").value = "";

        return;
    }

    const data = querySnapshot.docs[0].data();

    document.getElementById("className").value = data.className;
    document.getElementById("rollNo").value = data.rollNo;

}