import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const db = getFirestore(); //users

export const createOrgDocument = async (orgName = 'Unnamed Org', uid) => {
  const newOrgID = nanoid();
  const orgDocRef = doc(db, 'org', newOrgID);

  try {
    await setDoc(orgDocRef, {
      orgName: orgName,
      users: [uid],
    });
  } catch (error) {
    console.log('error creating the user', error.message);
  }

  return orgDocRef;
};

export const getOrgCol = async (uid) => {
  const q = query(collection(db, 'org'), where('users', 'array-contains', uid));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
  /*const orgs = await getDocs(collection(db, 'org'));

  orgs.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });*/
};

export const getUserDoc = async (uid) => {
  const userDocRef = await doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data();
};

//users
export const realTimeUserListener = (callback, uid) =>
  onSnapshot(doc(db, 'users', uid), callback);
//const userDocRef = await doc(db, 'users', uid);

//user
export const updateNote = async (uid, note) => {
  if (uid) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { 'd2dData.notes': note });
  }
};

//users
export const updateListItems = async (uid, listItems) => {
  if (uid) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { 'd2dData.listitems': listItems });
  }
};

export const updateListItemsDone = async (uid, listItemsDone) => {
  if (uid) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { 'd2dData.listitemsdone': listItemsDone });
  }
};

//users
export const updateLists = async (uid, lists) => {
  if (uid) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { 'd2dData.lists': lists });
  }
};
