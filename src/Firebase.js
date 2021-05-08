import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyALs694KSK74xWWDHlpsrgJkHndT7-aJVA",
    authDomain: "instagram-clone-react-6e17b.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-6e17b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "instagram-clone-react-6e17b",
    storageBucket: "instagram-clone-react-6e17b.appspot.com",
    messagingSenderId: "841025444655",
    appId: "1:841025444655:web:a5a85050ad0826b4211fda",
    measurementId: "G-M4XJCD7P7X"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };