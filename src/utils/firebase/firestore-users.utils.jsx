import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

export const db = getFirestore(); //users

export const creatUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        d2dData: {
          notes: '',
          listtypes: [
            { typeId: 't001', typeName: 'Once-off (Action)' },
            { typeId: 't002', typeName: 'Follow-Up' },
            { typeId: 't003', typeName: 'Recurring' },
          ],
          lists: [],
          listitems: [],
          listitemsdone: [],
        },
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
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
