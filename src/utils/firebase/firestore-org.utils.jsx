import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getCollection,
  getDocs,
  query,
  where,
  addDoc,
} from 'firebase/firestore';

//import { ref, getDatabase } from 'firebase/database';
import { nanoid } from 'nanoid';

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

  createDefaultListTypes(newOrgID);
  createDefaultList(newOrgID, orgName);

  return orgDocRef;
};

export const createUserOrgDocument = async (userName = 'User', uid) => {
  const orgDocRef = doc(db, 'org', uid);
  const userOrgSnapshot = await getDoc(orgDocRef);

  if (!userOrgSnapshot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(orgDocRef, {
        orgName: userName,
        orgId: uid,
        users: [],
        createdAt: createdAt,
        active: true,
      });

      createDefaultListTypes(uid);
      createDefaultList(uid, userName);
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return orgDocRef;
};

// List Types
export const createListType = async (
  orgId,
  listType = 'Unnamed List Type',
  listTypeId = nanoid()
) => {
  const listTypeColRef = doc(db, 'org', orgId, 'listTypes', listTypeId);

  try {
    await setDoc(listTypeColRef, {
      listType,
      listTypeId,
      orgId,
      active: true,
    });
  } catch (error) {
    console.log('error creating the ListType', error.message);
  }

  return listTypeColRef;
};
const createDefaultListTypes = (orgId) => {
  createListType(orgId, 'Once-Off (Actions)');
  createListType(orgId, 'Follow-Up');
  createListType(orgId, 'Recurring');
};

//Lists
export const createList = async (
  orgId,
  list = 'Unnamed List',
  listId = nanoid()
) => {
  const listColRef = doc(db, 'org', orgId, 'lists', listId);

  try {
    await setDoc(listColRef, {
      list,
      listId,
      orgId,
      active: true,
    });
  } catch (error) {
    console.log('error creating the List', error.message);
  }

  return listColRef;
};

const createDefaultList = (orgId, orgName) => {
  createList(orgId, orgName, orgId);
};

// export const createTemp = async (userName = 'User', uid) => {
//   const orgDocRef = doc(db, 'org', uid);
//   const userOrgSnapshot = await getDoc(orgDocRef);

//   if (!userOrgSnapshot.exists()) {
//     const createdAt = new Date();
//     try {
//       await setDoc(orgDocRef, {
//         orgName: userName,
//         orgId: uid,
//         users: [],
//         createdAt: createdAt,
//         active: true,
//       });
//     } catch (error) {
//       console.log('error creating the user', error.message);
//     }
//   }

//   return orgDocRef;
// };

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

export const addListItem = async (
  listItem,
  uid,
  orgId,
  listId,
  listTypeId,
  listItemId = nanoid()
) => {
  console.log('ListItem: ', listItem);
  console.log('uid: ', uid);
  console.log('orgId: ', orgId);
  console.log('listId: ', listId);
  console.log('listtypeId: ', listTypeId);
  console.log('listItemId: ', listItemId);

  const createdAt = new Date();

  if (orgId) {
    const listItemRef = doc(db, `org/${orgId}/listItems/${listItemId}`);
    await setDoc(listItemRef, {
      orgId,
      uid,
      listItem,
      createdAt,
      listId,
      listTypeId,
      listItemId,
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
