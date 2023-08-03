import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';

const ListItem = ({
  value,
  removeFromArray,
  sendToDone,
  removeFromArrayVis,
  sendToDoneVis,
}) => {
  const removeFromArrayVar = (
    <span className="column">
      <button
        type="button"
        className="button is-link is-outlined is-responsive"
        onClick={() => removeFromArray()}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </span>
  );

  const sendToDoneVar = (
    <span className="column">
      <button
        type="button"
        className="button is-dark is-outlined is-responsive"
        onClick={() => sendToDone()}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </span>
  );

  return (
    <li className="block">
      <div className="container columns is-vcentered is-mobile">
        <span className="column">{value}</span>
        <span className="column is-narrow">
          <div className="columns is-mobile is-variable is-1">
            {sendToDoneVis && sendToDoneVar}{' '}
            {removeFromArrayVis && removeFromArrayVar}
          </div>
        </span>
      </div>
    </li>
  );
};

export default ListItem;
