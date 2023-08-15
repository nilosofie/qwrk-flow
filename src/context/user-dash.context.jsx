import { createContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import {
  creatUserDocumentFromAuth,
  onAuthStateChangedListener,
  getUserDoc,
  updateNote,
  updateListItems,
  updateListItemsDone,
} from '../utils/firebase/firebase.utils';

// CONTEXT
export const UserDashContext = createContext({
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
});

export const UserDashProvider = ({ children }) => {
  const [uid, setUid] = useState();
  const [userName, setUserName] = useState();
  const [notes, setNotes] = useState();
  const [listTypes, setListTypes] = useState();
  const [lists, setLists] = useState();
  const [listItems, setListItems] = useState();
  const [listItemsDone, setListItemsDone] = useState();
  const [noteStatus, setNoteStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await creatUserDocumentFromAuth(user);
        updateUser(getUserDoc(user.uid));
        setUid(user.uid);
      } else clearUser();
    });

    return unsubscribe;
  }, []);

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
    setListItems((oldList) => [
      ...oldList,
      { listItemId: nanoid(), listId: listId, typeId: typeId, item: item },
    ]);
  };

  const sendToDone = (id) => {
    const doneObj = listItems.filter((item) => item.listItemId === id);
    console.log(doneObj);
    setListItemsDone((oldList) => [...oldList, doneObj[0]]);
    removeListItem(id);
  };

  const removeListItem = (id) => {
    setListItems((oldList) => oldList.filter((item) => item.listItemId !== id));
    updateListItems(uid, listItems);
  };

  const removeDoneItem = (id) => {
    setListItemsDone((oldList) =>
      oldList.filter((item) => item.listItemId !== id)
    );
  };

  useEffect(() => {
    if (uid) updateListItems(uid, listItems);
  }, [listItems]);

  useEffect(() => {
    if (uid) updateListItemsDone(uid, listItemsDone);
  }, [listItemsDone]);

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
  };

  return (
    <UserDashContext.Provider value={value}>
      {children}
    </UserDashContext.Provider>
  );
};
