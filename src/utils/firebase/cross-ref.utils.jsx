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

export const uidsToEmail = async (uidArray, displayNameObj) => {
  const retArr = [];
  const displayNameObjLoc = await displayNameObj;

  console.log(displayNameObjLoc);

  uidArray.forEach((uid) => {
    const i = displayNameObjLoc.findIndex((obj) => {
      return obj.uid === uid;
    });

    i !== -1 ? retArr.push(displayNameObjLoc[i].email) : retArr.push(uid);
  });
  console.log(retArr);
  return retArr;
};

//uid string returns displayname string

export const uidToDisplay = async (uid, displayNameObj) => {
  const displayNameObjLoc = await displayNameObj;

  const i = displayNameObjLoc.findIndex((obj) => {
    return obj.uid === uid;
  });

  console.log("I", i);
  displayNameObjLoc[i] &&
    console.log("Displayname", displayNameObjLoc[i].displayName);

  return i !== -1 ? displayNameObjLoc[i].displayName : undefined;
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
