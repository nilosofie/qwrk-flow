import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import TextInput from "react-autocomplete-input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faGear } from "@fortawesome/free-solid-svg-icons";

import { query, getFirestore, doc } from "firebase/firestore";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Popup from "../popup.component";
import LoadingScreen from "../loading-screen/loading-screen.component";
import InputAuto from "../input-auto/input-auto.component";

import {
  createList,
  markListInactive,
  updateList,
} from "../../utils/firebase/firestore-org.utils";

import { OrgContext } from "../../context/org.context";

import "./org-node.styles.scss";

const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const OrgNode = ({ nodeData }) => {
  const { orgId, orgUsers } = useContext(OrgContext);

  //Database
  const db = getFirestore();

  const listQuery = orgId
    ? query(doc(db, `org/${orgId}/lists/${nodeData.id}`))
    : null;
  const [listData, listDataLoading] = useDocumentData(listQuery);

  // New Node
  const [newNodePop, setNewNodePop] = useState(false);
  const toggleNewNodePop = () => setNewNodePop((old) => !old);

  const [nodeName, setNodeName] = useState("");
  const nodeNameTextHandler = (e) => setNodeName(e.target.value);
  const nodeNameSubmitHandler = () => {
    createList(orgId, nodeName, listData.listId);
    setNodeName("");
    toggleNewNodePop();
  };

  //Edit Node
  const [editNodePop, setEditNodePop] = useState(false);
  const [newManager, setNewManager] = useState("");
  const [newUsers, setNewUsers] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const newManagerTextHandler = (event) => setNewManager(event);
  const newUsersTextHandler = (event) => setNewUsers(event);
  const newNotesTextHandler = (event) => setNewNotes(event.target.value);

  const splitToArr = (text) => {
    return text.split(/(?:,| )+/);
  };

  const toggleEditNodePop = () => {
    setEditNodePop((old) => !old);
    !editNodePop ? setNodeName(listData.list) : setNodeName("");
    setNewManager(listData?.manager);
    setNewUsers(listData?.users.toString());
    setNewNotes(listData.notes ? listData.notes : "");
  };

  const nodeEditSubmitHandler = () => {
    updateList(
      orgId,
      listData.listId,
      nodeName,
      newManager,
      splitToArr(newUsers),
      newNotes
    );
    setNodeName("");
    toggleEditNodePop();
  };

  if (listDataLoading) return <LoadingScreen />;

  return (
    <>
      <div className="notification">
        <div className="content is-small">
          <h3>{listData.list}</h3>
          {listData.manager && <h4>{`${listData.manager}`}</h4>}
        </div>
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
                toggleEditNodePop();
              }}
            >
              <FontAwesomeIcon icon={faGear} />
            </button>
          </span>
          <span className="column">
            <button
              type="button"
              className="button is-link is-outlined is-responsive"
              onClick={() => {
                markListInactive(orgId, listData.listId);
              }}
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
      <Popup trigger={editNodePop} closePopup={toggleEditNodePop}>
        <form className="box has-text-left" onSubmit={nodeEditSubmitHandler}>
          <div className="field">
            <label className="label">Name</label>
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
          <div className="field">
            <label className="label">Manager</label>
            <div className="conrtol">
              <InputAuto
                placeholder="Manager"
                data={orgUsers}
                defaultVal={newManager}
                onSelected={setNewManager}
                onChange={newManagerTextHandler}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Users</label>
            <div className="conrtol">
              <TextInput
                className="textarea"
                trigger={[" ", ",", ""]}
                options={orgUsers}
                spacer=""
                value={newUsers}
                onChange={newUsersTextHandler}
                rows="1"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Notes</label>
            <div className="conrtol">
              <textarea
                className="textarea"
                value={newNotes}
                onChange={newNotesTextHandler}
                rows="15"
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
