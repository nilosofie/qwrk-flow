import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

import {
  creatUserDocumentFromAuth,
  getUserDoc,
} from "../utils/firebase/firestore-users.utils";

// CONTEXT
export const UsersContext = createContext({
  uid: "",
  userName: "",
  userEmail: "",
  updateUser: () => {},
  clearUser: () => {},
  setUser: () => {},
});

export const UsersProvider = ({ children }) => {
  const [uid, setUid] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

  //Creates user
  useEffect(() => {
    const unsubscribeUser = onAuthStateChangedListener(async (user) => {
      if (user) {
        await creatUserDocumentFromAuth(user);
        updateUser(getUserDoc(user.uid));
        setUid(user.uid);
      } else clearUser();
    });

    return unsubscribeUser;
  }, []);

  const updateUser = async (userDoc) => {
    const { displayName, email } = await userDoc;
    setUserName(displayName);
    setUserEmail(email);
  };

  const clearUser = () => {
    setUid(null);
    setUserName(null);
    setUserEmail(null);
  };

  //new user Code
  const setUser = (uid, displayName, email) => {
    setUid(uid);
    setUserName(displayName);
    setUserEmail(email);
  };

  const value = {
    uid,
    userName,
    userEmail,
    updateUser,
    clearUser,
    setUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
