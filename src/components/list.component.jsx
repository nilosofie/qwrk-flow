import React, { useRef, useState, useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import autoAnimate from '@formkit/auto-animate';

import ListItem from './list-item.component';

import { OrgContext } from '../context/org.context';

const List = ({ listObject, listLabel }) => {
  /*listObject Rules new
 {
    arr: [],
    addToArray: () => {alert("add to array")}, //Add Item
    removeFromArray: removeFromArray(orgId, listItemId), //Delete
    sendToDone: () => sendToDone(orgId, listItemId), // Move Item from main array to sub array
    addToArrayVis: true,
    removeFromArrayVis: true,
    sentToDoneVis: true,
  }
  */

  //Destructuring object received in props
  const {
    arr = [],
    addToArray = () => {
      alert('add to array');
    },
    removeFromArray = () => {
      alert('remove from array');
    },
    sendToDone = () => {
      alert('Mark as done');
    },
    addToArrayVis = true,
    removeFromArrayVis = true,
    sendToDoneVis = true,
  } = listObject;

  //Context///////////////////////////////////////////////////////////////////
  const { orgId } = useContext(OrgContext);
  //Local States//////////////////////////////////////////////////////////////
  const [inputState, setInputState] = useState('');

  //State Handlers
  const textHandler = (event) => setInputState(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    addToArray(inputState);
    setInputState('');
  };
  ////////////////////////////////////////////////////////////////////////////

  //--------Animation-----------
  const parentRef = useRef();

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  //---------------------------------

  //Maps////////////////////////////////////////////////////////
  //Map of array received in the list object
  const mainArr = arr.map(({ listItemId, listItem }) => {
    return (
      <ListItem
        id={listItemId}
        key={listItemId}
        value={listItem}
        removeFromArray={() => removeFromArray(orgId, listItemId)}
        sendToDone={() => sendToDone(orgId, listItemId)}
        removeFromArrayVis={removeFromArrayVis}
        sendToDoneVis={sendToDoneVis}
      />
    );
  });

  //Component Return//////////////////////////////////////////////////////
  return (
    <div className="box block container">
      {listLabel && (
        <section className="hero is-info is-fullwidth is-small">
          <div className="hero-body">
            <div className="columns is-mobile">
              <span className="subtitle column">{listLabel}</span>
            </div>
          </div>
        </section>
      )}
      <div className="container block is-fullwidth">
        <ul ref={parentRef} className="block">
          {mainArr.length !== 0 ? mainArr : <em>No Items to Show</em>}
        </ul>
        {addToArrayVis && (
          <form className=" is-mobile" onSubmit={submitHandler}>
            <div className="columns is-vcentered is-mobile">
              <span className="column">
                <input
                  type="text"
                  className="input is-normal"
                  value={inputState}
                  onChange={textHandler}
                />
              </span>
              <span className="column is-narrow">
                <button
                  type="submit"
                  className="button is-primary is-responsive"
                >
                  {' '}
                  <FontAwesomeIcon icon={faPlus} />{' '}
                </button>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default List;
