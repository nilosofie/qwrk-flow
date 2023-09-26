import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faGear } from "@fortawesome/free-solid-svg-icons";

import Popup from "../popup.component";

import { createList } from "../../utils/firebase/firestore-org.utils";

import { OrgContext } from "../../context/org.context";

import "./org-node.styles.scss";

const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const OrgNode = ({ nodeData }) => {
  const { orgId } = useContext(OrgContext);

  const [newNodePop, setNewNodePop] = useState(false);
  const toggleNewNodePop = () => setNewNodePop((old) => !old);

  const [nodeName, setNodeName] = useState("");
  const nodeNameTextHandler = (e) => setNodeName(e.target.value);
  const nodeNameSubmitHandler = () => {
    createList(orgId, nodeName, nodeData.id);
    setNodeName("");
    toggleNewNodePop();
  };

  return (
    <>
      <div className="box">
        <div className="position">{nodeData.title}</div>
        <div className="fullname">{nodeData.name}</div>
        <div className="columns is-mobile is-variable is-1">
          <span className="column">
            <button
              type="button"
              className="button is-dark is-outlined is-responsive"
              onClick={() => {
                toggleNewNodePop();
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </span>
          <span className="column">
            <button
              type="button"
              className="button is-dark is-outlined is-responsive"
              onClick={() => {
                console.log(nodeData.children);
              }}
            >
              <FontAwesomeIcon icon={faGear} />
            </button>
          </span>
          <span className="column">
            <button
              type="button"
              className="button is-link is-outlined is-responsive"
              onClick={() => {}}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </span>
        </div>
      </div>
      <Popup trigger={newNodePop} closePopup={toggleNewNodePop}>
        <form onSubmit={nodeNameSubmitHandler} className="box">
          <div className="field has-text-centered">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Department Name"
                value={nodeName}
                onChange={nodeNameTextHandler}
              />
            </div>
          </div>
          <div className="field has-text-centered">
            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Popup>
    </>
  );
};

OrgNode.propTypes = propTypes;

export default OrgNode;
