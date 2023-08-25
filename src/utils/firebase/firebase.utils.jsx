import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLKGxWy-3v4ny8KMDOE2gvjn_H8CxWZr8',
  authDomain: 'qwrk-flow.firebaseapp.com',
  projectId: 'qwrk-flow',
  storageBucket: 'qwrk-flow.appspot.com',
  messagingSenderId: '231279035075',
  appId: '1:231279035075:web:5f74e4cc64205307bed876',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();

//export const

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// export const db = getFirestore(); //users

//users
// export const creatUserDocumentFromAuth = async (userAuth) => {
//   const userDocRef = doc(db, 'users', userAuth.uid);

//   const userSnapshot = await getDoc(userDocRef);

//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//         d2dData: {
//           notes: '',
//           listtypes: [
//             { typeId: 't001', typeName: 'Once-off (Action)' },
//             { typeId: 't002', typeName: 'Follow-Up' },
//             { typeId: 't003', typeName: 'Recurring' },
//           ],
//           lists: [],
//           listitems: [],
//           listitemsdone: [],
//         },
//       });
//     } catch (error) {
//       console.log('error creating the user', error.message);
//     }
//   }

//   return userDocRef;
// };

//users
// export const getUserDoc = async (uid) => {
//   const userDocRef = await doc(db, 'users', uid);
//   const userDoc = await getDoc(userDocRef);
//   return userDoc.data();
// };

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//users
// export const realTimeUserListener = (callback, uid) =>
//   onSnapshot(doc(db, 'users', uid), callback);

//user
// export const updateNote = async (uid, note) => {
//   if (uid) {
//     const userRef = doc(db, 'users', uid);
//     await updateDoc(userRef, { 'd2dData.notes': note });
//   }
// };

//users
// export const updateListItems = async (uid, listItems) => {
//   if (uid) {
//     const userRef = doc(db, 'users', uid);
//     await updateDoc(userRef, { 'd2dData.listitems': listItems });
//   }
// };

//users
// export const updateListItemsDone = async (uid, listItemsDone) => {
//   if (uid) {
//     const userRef = doc(db, 'users', uid);
//     await updateDoc(userRef, { 'd2dData.listitemsdone': listItemsDone });
//   }
// };

//users
// export const updateLists = async (uid, lists) => {
//   if (uid) {
//     const userRef = doc(db, 'users', uid);
//     await updateDoc(userRef, { 'd2dData.lists': lists });
//   }
// };
