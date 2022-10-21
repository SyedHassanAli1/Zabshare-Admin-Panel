import firebase from 'firebase'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxU0akXwr7j-i0RQ00_ZtBKSbtt3qTFfQ",
  authDomain: "zabshare-65702.firebaseapp.com",
  projectId: "zabshare-65702",
  storageBucket: "zabshare-65702.appspot.com",
  messagingSenderId: "757277888595",
  appId: "1:757277888595:web:369d51c2c70aacf329b6a6",
  measurementId: "G-HRNXRL05YR"
};
  const Firebase = firebase.initializeApp(firebaseConfig);
  const db = Firebase.firestore();
  const auth = Firebase.auth();
  const doc = Firebase.firestore()
  const onSnapshot = Firebase.firestore()
  // const signInWithEmailAndPassword = firebase.auth();
  // const storage = firebase.storage();
  // const firestore = firestore();
  export {Firebase,db,auth,doc,onSnapshot};