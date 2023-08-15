import React, { useContext } from 'react';

import 'bulma/css/bulma.min.css';

import '../../mystyles.scss';

import Notes from '../../components/notes.component';

import List from '../../components/list.component';

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
  } = useContext(UserDashContext);

  // Map Types
  const listTypeMap =
    listTypes &&
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
          <div>
            <h3>
              <strong>{type.typeName}:</strong>
            </h3>
            {listMap}
          </div>
        </div>
      );
    });

  //App return
  return (
    <div className="App">
      <div className="container hero block">
        <h2 className="subtitle">{`Hello, ${userName}`}</h2>
      </div>
      <div className="container">
        <div className=" columns is-variable is-8 is-multiline">
          <div className="column is-half">
            <Notes />
            <br />
            <button
              type="submit"
              onClick={() => sendNoteToFS()}
              className="button is-primary is-outlined is-fullwidth"
            >
              Save
            </button>
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
