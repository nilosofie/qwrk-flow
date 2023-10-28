//uid list array returns email addresses
import { db } from "./firestore-org.utils";

import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const getIndObj = (ind, docData) => {
  var retObj = {}; // Create an empty object
  retObj[ind] = docData; // Set the "ind" property to docData
  return retObj;
};

//uid string returns displayname string

export const uidToUserDoc = async (uid) => {
  const userDocRef = doc(db, "users", uid);

  const userDoc = await getDoc(userDocRef);

  return await userDoc.data();
};

// Return Org Document for orgId

export const orgDoc = async (orgId) => {
  const orgDocRef = orgId ? doc(db, "org", orgId) : null;

  const org = (await getDoc(orgDocRef)).data();

  return org;
};

// Return Orgs Assigned to user

export const userOrgs = async (uid) => {
  const retArr = [];
  let orgs = null;

  const orgsQuery = query(
    collection(db, "orgUsers"),
    where("uid", "==", uid),
    where("active", "==", true)
  );
  orgs = await getDocs(orgsQuery);

  orgs.forEach(async (userOrgDoc) => {
    const orgId = userOrgDoc.data().orgId;
    retArr.push(await orgDoc(orgId));
  });

  return retArr;
};

export const orgUserIdFromOrgId = async (orgId, uid) => {
  const retArr = [];
  const orgsIdQuery = query(
    collection(db, "orgUsers"),
    where("uid", "==", uid),
    where("orgId", "==", orgId)
  );
  const org = await getDocs(orgsIdQuery);

  org.forEach((org) => {
    retArr.push(org.id);
  });

  return await retArr[0];
};

// Returns user for orgUserId

export const userFromOrgRef = async (orgUserId) => {
  const orgUserDocRef = doc(db, "orgUsers", orgUserId);
  const orgUserDoc = await getDoc(orgUserDocRef);

  const docData = await uidToUserDoc(orgUserDoc.data().uid);

  const retObj = getIndObj(orgUserId, docData);

  return retObj;
};
