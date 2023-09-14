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
  addDoc,
} from 'firebase/firestore';

//import { ref, getDatabase } from 'firebase/database';
import { nanoid } from 'nanoid';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export const db = getFirestore(); //users

export const createOrgDocument = async (orgName = 'Unnamed Org', uid) => {
  const newOrgID = nanoid();
  const createdAt = new Date();
  const orgDocRef = doc(db, 'org', newOrgID);

  try {
    await setDoc(orgDocRef, {
      orgName: orgName,
      orgId: newOrgID,
      users: [uid],
      createdAt: createdAt,
      active: true,
    });
  } catch (error) {
    console.log('error creating the user', error.message);
  }

  return orgDocRef;
};

export const getOrgCol = async (uid) => {
  const q = query(collection(db, 'org'), where('users', 'array-contains', uid));

  const retArr = [];

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    retArr.push({ orgId: doc.id, orgName: doc.data().orgName });
  });

  console.log(retArr);
  return retArr;
};

export const orgCollection = (uid) => {
  const q = query(collection(db, 'org'), where('users', 'array-contains', uid));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [docs, loading, error, snapshot] = useCollectionData(q);

  return { docs, loading, error, snapshot };
};

//users

//const userDocRef = await doc(db, 'users', uid);

//Notes updating for org
export const updateNote = async (uid, orgId, note) => {
  const updatededAt = new Date();
  if (uid) {
    const noteRef = doc(db, `org/${orgId}/notes/${uid}`);
    await setDoc(noteRef, {
      orgId,
      uid,
      note,
      updatededAt,
    });
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
