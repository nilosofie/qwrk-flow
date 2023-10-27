import { createContext, useState, useEffect, useContext } from "react";

import {
  query,
  getFirestore,
  doc,
  getDoc,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import { useDocumentData } from "react-firebase-hooks/firestore";

import { updateNote } from "../utils/firebase/firestore-org.utils";

import { UsersContext } from "./users.context";

export const OrgContext = createContext({
  orgState: false,
  orgId: "",
  orgUserId: "",
  updateOrgId: () => {},
  updateOrgUserId: () => {},
  orgName: "",
  notesObj: {},
  saveNote: () => {},
  orgUsers: [],
  orgUsersData: [],
});

export const OrgProvider = ({ children }) => {
  //Context

  const { uid } = useContext(UsersContext);

  //states
  const [orgState, setOrgState] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [orgUserId, setOrgUserId] = useState("");
  const [orgName, setOrgName] = useState("");

  //Database

  const db = getFirestore();

  const orgQuery = orgId ? query(doc(db, `org/${orgId}`)) : null;
  const [org, orgLoading] = useDocumentData(orgQuery);

  const notesQuery = orgId ? query(doc(db, `org/${orgId}/notes/${uid}`)) : null;
  const [notes, notesLoading, notesError] = useDocumentData(notesQuery);

  const notesObj = {
    notes,
    notesLoading,
    notesError,
  };

  const orgUsers = org?.users;

  const [orgUsersData, setOrgUsersData] = useState([]);

  const fetchUserDetails = async (uids) => {
    if (org) {
      const userPromises = uids.map(async (user) => {
        // Query the users collection for each uid
        //const userDoc = await db.collection("users").doc(uid).get();
        const docRef = doc(db, "users", user);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
          // User exists, return user data
          return { ...userDoc.data(), registered: true };
        } else {
          // Handle the case where the user with this uid doesn't exist

          //Current function to Fix
          const checkEmail = async (userEmail) => {
            const userCollection = collection(db, "users");
            const checkEmailQuery = query(
              userCollection,
              where("email", "==", userEmail)
            );
          };
          checkEmail(user);
          return { displayName: user, registered: false };
        }
      });

      // Wait for all promises to resolve
      const users = await Promise.all(userPromises);

      // Filter out any null values (non-existing users)
      const userDetails = users.filter((user) => user !== null);

      return userDetails;
    } else return ["none"];
  };

  useEffect(() => {
    setOrgUsersData(async () => fetchUserDetails(await orgUsers), [orgUsers]);
  }, [org]);

  //-------------------------------------------------------------------------

  const updateOrgId = (id) => {
    setOrgId(id);
  };

  const updateOrgUserId = (orgUserId) => {
    setOrgUserId(orgUserId);
  };

  const saveNote = (note) => {
    updateNote(uid, orgId, note);
  };

  useEffect(() => {
    (() => {
      const localOrgName = org?.orgName;
      orgId ? setOrgState(true) : setOrgState(false);
      org && setOrgName(localOrgName);
    })();
  }, [orgId, org, orgLoading]);

  const value = {
    orgId,
    orgUserId,
    orgState,
    updateOrgId,
    updateOrgUserId,
    orgName,
    notesObj,
    saveNote,
    orgUsers,
    orgUsersData,
  };
  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
};
