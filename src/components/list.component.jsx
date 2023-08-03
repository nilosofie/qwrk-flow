import React, { useRef, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import autoAnimate from '@formkit/auto-animate';

import ListItem from './list-item.component';
const List = ({ listObject, listLabel = 'label1' }) => {
  /*listObject Rules new
 {
    arr: [],
    addToArray: () => {alert("add to array")}, //Add Item
    removeFromArray: () => {alert("remove from array")}, //Delete
    sendToDone: () => {alert("Mark as done")}, // Move Item from main array to sub array
    addToArrayVis: true,
    removeFromArrayVis: true,
    sentToDoneVis: true,
  }
  */

  const {
    arr = [],
    addToArray = () => {
      alert('add to array');
    }, //Add Item
    removeFromArray = () => {
      alert('remove from array');
    }, //Delete
    sendToDone = () => {
      alert('Mark as done');
    }, // Move Item from main array to sub array
    addToArrayVis = true,
    removeFromArrayVis = true,
    sendToDoneVis = true,
    dna = {
      listId: '',
      typeId: '',
    },
  } = listObject;

  const [inputState, setInputState] = useState('');

  //--------Animation-----------
  const parentRef = useRef();

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  //---------------------------------

  const mainArr = arr.map(({ listItemId, item }) => {
    return (
      <ListItem
        id={listItemId}
        key={listItemId}
        value={item}
        removeFromArray={() => removeFromArray(listItemId)}
        sendToDone={() => sendToDone(listItemId)}
        removeFromArrayVis={removeFromArrayVis}
        sendToDoneVis={sendToDoneVis}
      />
    );
  });

  const textHandler = (event) => setInputState(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    addToArray(inputState, dna);
    setInputState('');
  };

  return (
    <div className="box block container">
      <div className=" is-fullwidth">
        <strong className="subtitle">{listLabel}</strong>
      </div>
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
