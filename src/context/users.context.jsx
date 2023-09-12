import { createContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

import {
  creatUserDocumentFromAuth,
  getUserDoc,
  updateNote,
  updateListItems,
  updateListItemsDone,
  updateLists,
  realTimeUserListener,
} from '../utils/firebase/firestore-users.utils';

// CONTEXT
export const UsersContext = createContext({
  uid: '',
  userName: '',
  notes: '',
  handleNote: () => {},
  listTypes: [],
  lists: [],
  listItems: [],
  listItemsDone: [],
  addListItem: () => {},
  sendToDone: () => {},
  removeListItem: () => {},
  removeDoneItem: () => {},
  updateUser: () => {},
  clearUser: () => {},
  sendNoteToFS: () => {},
  noteStatus: false,
  addList: () => {},
  removeList: () => {},
  setUser: () => {},
});

export const UsersProvider = ({ children }) => {
  const [uid, setUid] = useState();
  const [userName, setUserName] = useState();
  const [notes, setNotes] = useState();
  const [listTypes, setListTypes] = useState();
  const [lists, setLists] = useState();
  const [listItems, setListItems] = useState();
  const [listItemsDone, setListItemsDone] = useState();
  const [noteStatus, setNoteStatus] = useState(false);

  // useEffect(() => {
  //   const unsubscribeUser = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       await creatUserDocumentFromAuth(user);
  //       updateUser(getUserDoc(user.uid));
  //       setUid(user.uid);
  //     } else clearUser();
  //   });

  //   return unsubscribeUser;
  // }, []);

  // useEffect(() => {
  //   if (uid) {
  //     const unsubscribeRT = realTimeUserListener(async (snapshot) => {
  //       if (snapshot) {
  //         setListItems(snapshot.data().d2dData.listitems);
  //         setLists(snapshot.data().d2dData.lists);
  //         setListItemsDone(snapshot.data().d2dData.listitemsdone);
  //       } else clearUser();
  //     }, uid);

  //     return unsubscribeRT;
  //   }
  // }, [uid]);

  const updateUser = async (userDoc) => {
    const { d2dData, displayName } = await userDoc;
    setUserName(displayName);
    setNotes(d2dData.notes);
    setListTypes(d2dData.listtypes);
    setLists(d2dData.lists);
    setListItems(d2dData.listitems);
    setListItemsDone(d2dData.listitemsdone);
  };

  const clearUser = () => {
    setUid(null);
    setUserName(null);
    setNotes('');
    setListTypes();
    setLists();
    setListItems();
    setListItemsDone();
  };

  const handleNote = (event) => {
    setNotes(event.target.value);

    setNoteStatus(true);
  };

  const sendNoteToFS = () => {
    updateNote(uid, notes);

    setNoteStatus(false);
  };

  const addListItem = (item, { listId, typeId }) => {
    const listItemsToSend = [
      ...listItems,
      { listItemId: nanoid(), listId: listId, typeId: typeId, item: item },
    ];
    updateListItems(uid, listItemsToSend);
  };

  const addList = (item) => {
    const listsToSend = [...lists, { listName: item, listId: nanoid() }];
    updateLists(uid, listsToSend);
  };

  const sendToDone = (id) => {
    const doneObj = listItems.filter((item) => item.listItemId === id);
    const listItemsDoneToSend = [...listItemsDone, doneObj[0]];
    updateListItemsDone(uid, listItemsDoneToSend);
    removeListItem(id);
  };

  const removeListItem = (id) => {
    const listItemsToSend = listItems.filter((item) => item.listItemId !== id);
    updateListItems(uid, listItemsToSend);
  };

  const removeDoneItem = (id) => {
    const listItemsDoneToSend = listItemsDone.filter(
      (item) => item.listItemId !== id
    );

    updateListItemsDone(uid, listItemsDoneToSend);
  };

  const removeList = (id) => {
    const listItemsToSend = listItems.filter((item) => item.listId !== id);
    updateListItems(uid, listItemsToSend);

    const listsToSend = lists.filter((item) => item.listId !== id);
    updateLists(uid, listsToSend);
  };

  // useEffect(() => {
  //   if (uid) updateListItemsDone(uid, listItemsDone);
  // }, [listItemsDone]);

  //new user Code
  const setUser = (uid, displayName) => {
    setUid(uid);
    setUserName(displayName);
  };

  const value = {
    uid,
    userName,
    notes,
    handleNote,
    listTypes,
    lists,
    listItems,
    listItemsDone,
    addListItem,
    sendToDone,
    removeListItem,
    removeDoneItem,
    updateUser,
    clearUser,
    sendNoteToFS,
    noteStatus,
    addList,
    removeList,
    setUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
