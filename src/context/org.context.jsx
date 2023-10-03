import { createContext, useState, useEffect, useContext } from "react";

import { query, getFirestore, doc } from "firebase/firestore";

import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";

import { updateNote } from "../utils/firebase/firestore-org.utils";

import { UsersContext } from "./users.context";

export const OrgContext = createContext({
  orgState: false,
  orgId: "",
  updateOrgId: () => {},
  orgName: "",
  notesObj: {},
  saveNote: () => {},
  orgUsers: [],
});

export const OrgProvider = ({ children }) => {
  //Context

  const { uid } = useContext(UsersContext);

  //states
  const [orgState, setOrgState] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");
  //const [orgUsers, setOrgUsers] = useState([]);

  //Database

  const db = getFirestore();

  const orgQuery = orgId ? query(doc(db, `org/${orgId}`)) : null;
  const [org, orgLoading] = useDocument(orgQuery);

  const notesQuery = orgId ? query(doc(db, `org/${orgId}/notes/${uid}`)) : null;
  const [notes, notesLoading, notesError] = useDocumentData(notesQuery);

  const notesObj = {
    notes,
    notesLoading,
    notesError,
  };

  // const orgUserQuery = org?.data().users
  //   ? query(collection(db, "users"), where("email", "in", org.data().users))
  //   : null;

  // const [regOrgUsers, regOrgUsersLoading] = useCollectionData(orgUserQuery);

  // useEffect(() => {
  //   if (!regOrgUsersLoading) {
  //     org.data().users.forEach((element) => {
  //       console.log(element);
  //       console.log(regOrgUsers);
  //       setOrgUsers((old) => {
  //         const retArr = [...old];
  //         retArr.push(element);
  //         return retArr;
  //       });
  //       //setOrgUsers(regOrgUsers);
  //     });
  //   }
  // }, [regOrgUsers]);

  const orgUsers = org?.data().users;

  //-------------------------------------------------------------------------

  const updateOrgId = (id) => {
    setOrgId(id);
    //setOrgUsers([]);
  };

  const saveNote = (note) => {
    updateNote(uid, orgId, note);
  };

  useEffect(() => {
    (() => {
      const localOrgName = org?.data().orgName;
      orgId ? setOrgState(true) : setOrgState(false);
      org && setOrgName(localOrgName);
    })();
  }, [orgId, org, orgLoading]);

  const value = {
    orgId,
    orgState,
    updateOrgId,
    orgName,
    notesObj,
    saveNote,
    orgUsers,
  };
  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
};
