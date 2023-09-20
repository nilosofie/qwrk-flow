import React, { useContext, useEffect, useState } from 'react';

import 'bulma/css/bulma.min.css';
import '../../mystyles.scss';

import { query, collection, getFirestore, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { nanoid } from 'nanoid';

import Notes from '../../components/notes.component';
import List from '../../components/list.component';
import ManageLists from '../../components/manage-lists.component';
import Popup from '../../components/popup.component';
import TitleSection from '../../components/tile-section.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';

import { UsersContext } from '../../context/users.context';
import { OrgContext } from '../../context/org.context';
import {
  addListItem,
  markListItemDone,
  markListItemInactive,
} from '../../utils/firebase/firestore-org.utils';

function D2d2() {
  //context
  const { userName, uid, addList, removeList } = useContext(UsersContext);

  const { orgId } = useContext(OrgContext);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  //Firestore Realtime////////////////////////////////////////////

  const db = getFirestore();

  //get ListTypes
  const listTypesQuery = uid
    ? query(collection(db, 'org', orgId, 'listTypes'))
    : null;

  const [listTypes, listTypeLoading, listTypeError] =
    useCollectionData(listTypesQuery);

  //get Lists
  const listsQuery = uid ? query(collection(db, 'org', orgId, 'lists')) : null;

  const [lists, listsLoading, listsError] = useCollectionData(listsQuery);

  // get ListItems
  const listItemsQuery = uid
    ? query(
        collection(db, 'org', orgId, 'listItems'),
        where('active', '==', true)
      )
    : null;
  const [listItems, listsItemsLoading, listsItemsError] =
    useCollectionData(listItemsQuery);

  const listItemsDone = listItems?.filter(({ done }) => done === true);

  useEffect(() => {
    if (listTypeLoading && listsLoading && listsItemsLoading) {
      setLoading(true);
    } else setLoading(false);
  }, [listTypeLoading, listsLoading, listsItemsLoading]);

  useEffect(() => {
    if (listTypeError || listsError || listsItemsError) {
      setError(true);
    } else setError(false);
  }, [listTypeError, listsError, listsItemsError]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Modals

  const [manageListsPopupStatus, setManageListsPopupStatus] = useState(false);

  const toggleManageListsPopupStatus = () => {
    setManageListsPopupStatus((old) => !old);
  };

  //MAPS///////////////////////////////////////////////////////////////////
  //Types
  const listTypeMap =
    !loading &&
    lists &&
    listTypes?.map((type) => {
      //Lists
      const listMap = lists.map((list) => {
        const listItemArray = listItems?.filter(
          ({ listId, listTypeId, done }) =>
            listId === list.listId &&
            listTypeId === type.listTypeId &&
            done === false
        );

        const addListItemHandler = (listItem) => {
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
          removeFromArray: markListItemInactive, //Delete
          sendToDone: markListItemDone, // Move Item from sub array to main array
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
  /////////////////////////////////////////////////////////////////////////////////////////////

  //
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
  if (error) return <p>error retrieving data</p>;
  if (loading) return <LoadingScreen />;

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
              removeFromArray: markListItemInactive,
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
