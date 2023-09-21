import React, { useRef, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import autoAnimate from '@formkit/auto-animate';

import ListItem from './list-item.org-wiz.component';
const List = ({ listObject, listLabel = 'label1' }) => {
  /*listObject Rules new
 {
    arr: [],
    addToArray: () => {}, //Add Item
    removeFromArray: () => {}, //Delete
    moveItemToSub: () => {}, // Move Item from main array to sub array
    sendItemToMain: ()= {}, // Move Item from sub array to main array
    addItemToChild: () => {}, // Move Item from main array to sub array child
    addToArrayVis: false,
    removeFromArrayVis: false,
    moveItemToSubVis: false,
    sendItemToMainVis: false,
    addItemToChildVis: false,
  }
  */

  const {
    arr = [],
    addToArray = () => {},
    removeFromArray = () => {},
    moveItemToSub = () => {},
    sendItemToMain = () => {},
    addItemToChild = () => {},
    addToArrayVis = false,
    removeFromArrayVis = false,
    moveItemToSubVis = false,
    sendItemToMainVis = false,
    addItemToChildVis = false,
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

  const mainArr = arr.map(({ id, item }) => {
    return (
      <ListItem
        id={id}
        key={id}
        value={item}
        removeFromArray={() => removeFromArray(id)}
        moveItemToSub={() => moveItemToSub({ id, item })}
        sendItemToMain={() => sendItemToMain(id)}
        addItemToChild={() => addItemToChild({ id, item })}
        removeFromArrayVis={removeFromArrayVis}
        moveItemToSubVis={moveItemToSubVis}
        sendItemToMainVis={sendItemToMainVis}
        addItemToChildVis={addItemToChildVis}
      />
    );
  });

  const textHandler = (event) => setInputState(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    addToArray(inputState);
    setInputState('');
  };

  return (
    <div className="list container block">
      <label className="subtitle">{listLabel}</label>
      <div className="container box block mobile-full-width-padding">
        <ul ref={parentRef}>
          {mainArr.length !== 0 ? mainArr : <em>No Items to Show</em>}
        </ul>
        {addToArrayVis && (
          <form
            className="new-item-container columns is-vcentered notification list-form is-mobile mobile-full-width-margin"
            onSubmit={submitHandler}
          >
            <span className="column">
              <input
                type="text"
                className="input is-normal"
                value={inputState}
                onChange={textHandler}
              />
            </span>
            <span className="column is-narrow">
              <button type="submit" className="button is-primary is-responsive">
                {' '}
                <FontAwesomeIcon icon={faPlus} />{' '}
              </button>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default List;
