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
});

export const OrgProvider = ({ children }) => {
  //Context

  const { uid, userName } = useContext(UsersContext);

  //states
  const [orgState, setOrgState] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");

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

  const updateOrgId = (id) => {
    setOrgId(id);
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
  };
  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
};
