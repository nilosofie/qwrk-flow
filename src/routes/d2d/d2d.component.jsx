import React, { useContext, useState } from 'react';

import 'bulma/css/bulma.min.css';

import '../../mystyles.scss';

import Notes from '../../components/notes.component';

import List from '../../components/list.component';
import ManageLists from '../../components/manage-lists.component';
import Popup from '../../components/popup.component';
import TitleSection from '../../components/tile-section.component';

import { UserDashContext } from '../../context/user-dash.context';

function D2d() {
  //context
  const {
    userName,
    listTypes,
    lists,
    listItems,
    listItemsDone,
    addListItem,
    sendToDone,
    removeListItem,
    removeDoneItem,
    sendNoteToFS,
    noteStatus,
    addList,
    removeList,
  } = useContext(UserDashContext);

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

        const listObj = {
          arr: listItemArray,
          addToArray: addListItem, //Add Item
          removeFromArray: removeListItem, //Delete
          sendToDone: sendToDone, // Move Item from sub array to main array
          addToArrayVis: true,
          removeFromArrayVis: true,
          sendToDoneVis: true,
          dna: {
            listId: list.listId,
            typeId: type.typeId,
          },
        };
        return (
          <div className="block">
            <List listObject={listObj} listLabel={list.listName} />
          </div>
        );
      });

      return (
        <div className="column is-half">
          <TitleSection title={type.typeName}>{listMap}</TitleSection>
        </div>
      );
    });

  //list map to be moved
  const listsMap = lists.map((list) => ({
    listId: list.listId,
    listName: list.listName,
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
    <div className="App hero is-primary is-fullheight">
      <br />
      <div className="container hero-head block">
        <p className="title">{`Hello, ${userName}`}</p>
      </div>
      <div className="container">
        <div className=" columns is-variable is-8 is-multiline">
          <div className="column is-half">
            <TitleSection title={'Notes'}>
              <Notes />
              <br />
              <button
                type="button"
                onClick={() => sendNoteToFS()}
                className="button is-fullwidth is-info"
                disabled={!noteStatus}
              >
                {!noteStatus ? 'Saved' : 'Changes not saved'}
              </button>
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
        <List
          listObject={{
            arr: listItemsDone,
            removeFromArray: removeDoneItem,
            addToArrayVis: false,
            sendToDoneVis: false,
          }}
          listLabel="Done"
        />
        <br />
      </div>
    </div>
  );
}

export default D2d;
