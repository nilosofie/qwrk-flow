import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getCountFromServer,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { nanoid } from "nanoid";

export const db = getFirestore();

//Create a new Org Document in Firestore
export const createOrgDocument = async (orgName = "Unnamed Org", userEmail) => {
  const newOrgID = nanoid();
  const createdAt = new Date();
  const orgDocRef = doc(db, "org", newOrgID);

  try {
    await setDoc(orgDocRef, {
      orgName: orgName,
      orgId: newOrgID,
      users: [userEmail],
      createdAt: createdAt,
      active: true,
      owner: userEmail,
    });
  } catch (error) {
    console.log("error creating the user", error.message);
  }

  createDefaults(newOrgID, orgName, userEmail);

  return orgDocRef;
};

//Create a user Org document in firestore
export const createUserOrgDocument = async (userName = "User", userEmail) => {
  const orgDocRef = doc(db, "org", userEmail);
  const userOrgSnapshot = await getDoc(orgDocRef);

  if (!userOrgSnapshot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(orgDocRef, {
        orgName: userName,
        orgId: userEmail,
        users: [],
        createdAt: createdAt,
        active: true,
        owner: userEmail,
      });

      createDefaults(userEmail, userName, userEmail);
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return orgDocRef;
};

//Create List Types
export const createListType = async (
  orgId,
  listType = "Unnamed List Type",
  listTypeId = nanoid()
) => {
  const listTypeColRef = doc(db, "org", orgId, "listTypes", listTypeId);

  try {
    await setDoc(listTypeColRef, {
      listType,
      listTypeId,
      orgId,
      active: true,
    });
  } catch (error) {
    console.log("error creating the ListType", error.message);
  }

  return listTypeColRef;
};

//Create a List
export const createList = async (
  orgId,
  list = "Unnamed List",
  parentId,
  listId = nanoid(),
  users = []
) => {
  //get count
  const colCountRef = collection(db, "org", orgId, "lists");
  const countSnapshot = await getCountFromServer(colCountRef);
  const listCount = countSnapshot.data().count;

  //write list
  const listColRef = doc(db, "org", orgId, "lists", listId);

  try {
    await setDoc(listColRef, {
      list,
      listId,
      orgId,
      active: true,
      parentId,
      order: listCount,
      manager: "",
      users,
    });
  } catch (error) {
    console.log("error creating the List", error.message);
  }

  return listColRef;
};

//Create default entries when creating an org
const createDefaults = (orgId, orgName, userEmail) => {
  createList(orgId, orgName, "0", orgId, [userEmail]);
  createListType(orgId, "Once-Off (Actions)");
  createListType(orgId, "Follow-Up");
  createListType(orgId, "Recurring");
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
    const listItemRef = doc(db, "org", orgId, "listItems", listItemId);
    await updateDoc(listItemRef, { done: true });
  }
};

//Mark a created listItem as Inactive
export const markListItemInactive = async (orgId, listItemId) => {
  if (orgId) {
    const listItemRef = doc(db, "org", orgId, "listItems", listItemId);
    await updateDoc(listItemRef, { active: false });
  }
};

export const addOrgUser = async (orgId, userEmail) => {
  //const createdAt = new Date();

  if (orgId) {
    const orgItemRef = doc(db, `org/${orgId}`);
    await updateDoc(orgItemRef, {
      users: arrayUnion(userEmail),
    });
  }
};

export const removeOrgUser = async (orgId, userEmail) => {
  //const createdAt = new Date();
  if (orgId) {
    const orgItemRef = doc(db, `org/${orgId}`);
    await updateDoc(orgItemRef, {
      users: arrayRemove(userEmail),
    });
  }
};
