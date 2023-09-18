import React, { useContext, useState } from 'react';

import 'bulma/css/bulma.min.css';

import '../../mystyles.scss';

import Notes from '../../components/notes.component';
import List from '../../components/list.component';
import ManageLists from '../../components/manage-lists.component';
import Popup from '../../components/popup.component';
import TitleSection from '../../components/tile-section.component';

import { UsersContext } from '../../context/users.context';
import { OrgContext } from '../../context/org.context';

import { addListItem } from '../../utils/firebase/firestore-org.utils';

import { query, collection, getFirestore, where } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { nanoid } from 'nanoid';

function D2d2() {
  //context
  const {
    userName,
    uid,
    listItems,
    listItemsDone,
    sendToDone,
    removeListItem,
    removeDoneItem,
    addList,
    removeList,
  } = useContext(UsersContext);

  const { orgId } = useContext(OrgContext);

  //Database

  const db = getFirestore();

  //get ListTypes
  const listTypesQuery = uid
    ? query(collection(db, 'org', orgId, 'listTypes'))
    : null;

  const [listTypes, listTypeLoading, listTypeError] =
    useCollectionData(listTypesQuery);

  console.log(listTypes);

  //get Lists

  const listsQuery = uid ? query(collection(db, 'org', orgId, 'lists')) : null;

  const [lists, listsLoading, listsError] = useCollectionData(listsQuery);

  console.log(lists);

  // ListItems

  // Modals

  const [manageListsPopupStatus, setManageListsPopupStatus] = useState(false);

  const toggleManageListsPopupStatus = () => {
    setManageListsPopupStatus((old) => !old);
  };

  // Map Types
  const listTypeMap =
    listTypes &&
    lists.length !== 0 &&
    listTypes.map((type) => {
      //Lists Map
      const listMap = lists.map((list) => {
        const listItemArray = listItems.filter(
          ({ listId, typeId }) =>
            listId === list.listId && typeId === type.typeId
        );

        const addListItemHandler = (listItem, listId, listTypeId) => {
          addListItem(
            listItem,
            uid,
            orgId,
            list.listId,
            type.listTypeId,
            nanoid()
          );
        };

        const listObj = {
          arr: listItemArray,
          addToArray: addListItemHandler, //Add Item
          removeFromArray: removeListItem, //Delete
          sendToDone: sendToDone, // Move Item from sub array to main array
          addToArrayVis: true,
          removeFromArrayVis: true,
          sendToDoneVis: true,
          dna: {
            listId: list.listId,
            typeId: type.listTypeId,
          },
        };
        return (
          <div className="block" key={list.listId}>
            <List listObject={listObj} listLabel={list.list} />
          </div>
        );
      });

      return (
        <div className="column is-half" key={type.typeId}>
          <TitleSection title={type.listType}>{listMap}</TitleSection>
        </div>
      );
    });

  //list map to be moved
  const listsMap = lists?.map((list) => ({
    listId: list.listId,
    listName: list.list,
  }));

  const manageListsObj = {
    arr: listsMap,
    addToArray: addList, //Add Item
    removeFromArray: removeList, //Delete
    addToArrayVis: true,
    removeFromArrayVis: true,
    sendToDoneVis: false,
    dna: {
      listId: '',
      typeId: '',
    },
  };
  //App return
  return (
    <div className="App hero is-fullheight">
      <br />
      <div className="container hero-head block">
        <p className="title">{`Hello, ${userName}`}</p>
      </div>
      <div className="container is-fluid">
        <div className=" columns is-variable is-8 is-multiline">
          <div className="column is-half">
            <TitleSection title={'Notes'}>
              <Notes />
            </TitleSection>
            <div className="container">
              <button
                type="button"
                onClick={() => {
                  toggleManageListsPopupStatus();
                }}
                className="button is-fullwidth is-info"
              >
                Manage Lists
              </button>
              <Popup
                trigger={manageListsPopupStatus}
                closePopup={() => {
                  toggleManageListsPopupStatus();
                }}
              >
                <ManageLists
                  listObject={manageListsObj}
                  listLabel="Manage Lists"
                />
              </Popup>
            </div>
          </div>
          {listTypeMap}
        </div>
        <br />
        <TitleSection title={'Done'}>
          <List
            listObject={{
              arr: listItemsDone,
              removeFromArray: removeDoneItem,
              addToArrayVis: false,
              sendToDoneVis: false,
            }}
          />
        </TitleSection>
        <br />
      </div>
    </div>
  );
}

export default D2d2;
