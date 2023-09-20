import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { nanoid } from 'nanoid';

export const db = getFirestore();

//Create a new Org Document in Firestore
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

  createDefaults(newOrgID, orgName);

  return orgDocRef;
};

//Create a user Org document in firestore
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

      createDefaults(uid, userName);
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return orgDocRef;
};

//Create List Types
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

//Create a List
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

//Create default entries when creating an org
const createDefaults = (orgId, orgName) => {
  createList(orgId, orgName, orgId);
  createListType(orgId, 'Once-Off (Actions)');
  createListType(orgId, 'Follow-Up');
  createListType(orgId, 'Recurring');
};

//Update notes
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

//Add a listItem
export const addListItem = async (
  listItem,
  uid,
  orgId,
  listId,
  listTypeId,
  listItemId = nanoid()
) => {
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
      done: false,
      active: true,
    });
  }
};

//Mark a created listItem as done
export const markListItemDone = async (orgId, listItemId) => {
  if (orgId) {
    const listItemRef = doc(db, 'org', orgId, 'listItems', listItemId);
    await updateDoc(listItemRef, { done: true });
  }
};

//Mark a created listItem as Inactive
export const markListItemInactive = async (orgId, listItemId) => {
  if (orgId) {
    const listItemRef = doc(db, 'org', orgId, 'listItems', listItemId);
    await updateDoc(listItemRef, { active: false });
  }
};
