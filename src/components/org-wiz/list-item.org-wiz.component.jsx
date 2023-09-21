import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faDiagramSuccessor,
  faDiagramPredecessor,
  faDiagramNext,
} from "@fortawesome/free-solid-svg-icons";

const ListItem = ({
  value,
  removeFromArray,
  moveItemToSub,
  sendItemToMain,
  addItemToChild,
  removeFromArrayVis,
  moveItemToSubVis,
  sendItemToMainVis,
  addItemToChildVis,
}) => {
  const removeFromArrayVar = (
    <span className="column">
      <button
        type="button"
        className="button is-link is-outlined is-responsive"
        onClick={() => removeFromArray()}
        title="Delete"
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </span>
  );

  const moveItemToSubVar = (
    <span className="column">
      <button
        type="button"
        className="button is-dark is-outlined is-responsive"
        onClick={() => moveItemToSub()}
        title="Send to Bucket"
      >
        <FontAwesomeIcon icon={faDiagramSuccessor} />
      </button>
    </span>
  );

  const sendItemToMainVar = (
    <span className="column">
      <button
        type="button"
        className="button is-dark is-outlined is-responsive"
        onClick={() => sendItemToMain()}
        title="Send to Main"
      >
        <FontAwesomeIcon icon={faDiagramPredecessor} />
      </button>
    </span>
  );

  const addItemToChildVar = (
    <span className="column">
      <button
        type="button"
        className="button is-dark is-outlined is-responsive"
        onClick={() => addItemToChild()}
        title="Send to Child"
      >
        <FontAwesomeIcon icon={faDiagramNext} />
      </button>
    </span>
  );

  return (
    <li className="block">
      <div className="container columns is-vcentered is-mobile">
        <span className="column">{value}</span>
        <span className="column is-narrow">
          <div className="columns is-mobile is-variable is-1">
            {moveItemToSubVis && moveItemToSubVar}{" "}
            {sendItemToMainVis && sendItemToMainVar}{" "}
            {addItemToChildVis && addItemToChildVar}{" "}
            {removeFromArrayVis && removeFromArrayVar}
          </div>
        </span>
      </div>
    </li>
  );
};

export default ListItem;
