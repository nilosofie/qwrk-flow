import { createContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { userB } from '../data/user-data';

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
});

const { d2dData } = userB;

export const UserDashProvider = ({ children }) => {
  const [uid, setUid] = useState(userB.uid);
  const [userName, setUserName] = useState(userB.displayName);
  const [notes, setNotes] = useState(d2dData.notes);
  const [listTypes, setListTypes] = useState(d2dData.listtypes);
  const [lists, setLists] = useState(d2dData.lists);
  const [listItems, setListItems] = useState(d2dData.listitems);
  const [listItemsDone, setListItemsDone] = useState(d2dData.listitemsdone);

  const handleNote = (event) => {
    setNotes(event.target.value);
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
  };

  const removeDoneItem = (id) => {
    setListItemsDone((oldList) =>
      oldList.filter((item) => item.listItemId !== id)
    );
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
  };

  return (
    <UserDashContext.Provider value={value}>
      {children}
    </UserDashContext.Provider>
  );
};
