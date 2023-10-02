import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

export const db = getFirestore(); //users

export const creatUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const getUserDoc = async (uid) => {
  const userDocRef = await doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data();
};

//users
export const realTimeUserListener = (callback, uid) =>
  onSnapshot(doc(db, "users", uid), callback);
//const userDocRef = await doc(db, 'users', uid);
