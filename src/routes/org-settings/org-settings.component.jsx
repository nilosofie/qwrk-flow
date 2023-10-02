import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  faUsers,
  faSitemap,
  faCreditCard,
  faPuzzlePiece,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import {
  addOrgUser,
  removeOrgUser,
} from "../../utils/firebase/firestore-org.utils";

import ClickCard from "../../components/click-card.component";
import Popup from "../../components/popup.component";
import List from "../../components/list.component";

import { OrgContext } from "../../context/org.context";

function OrgSettings() {
  const { orgName, orgUsers, orgId } = useContext(OrgContext);
  const navigate = useNavigate();

  //Popups------------------------------------------------------------------------------------------
  //Org Details
  //Users
  const [userPop, setUserPop] = useState(false);
  const toggeleUserPop = () => {
    setUserPop((oldStatus) => !oldStatus);
  };

  const addOrgUserHandler = (userEmail) => {
    addOrgUser(orgId, userEmail);
  };

  const removeOrgUserHandler = (orgId, userEmail) => {
    removeOrgUser(orgId, userEmail);
  };

  const orgUsersArr = orgUsers?.map((user) => ({
    listItemId: user,
    listItem: user,
  }));

  console.log(orgUsersArr);

  const userListObj = {
    arr: orgUsersArr,
    addToArray: addOrgUserHandler, //Add Item
    removeFromArray: removeOrgUserHandler, //Delete
    addToArrayVis: true,
    removeFromArrayVis: true,
    sendToDoneVis: false,
  };
  //Modules
  //Plans

  return (
    <div>
      <br />
      <div className="container">
        <div className="hero">
          <div className="container hero-head has-text-centered">
            <p className="title">{orgName}</p>
            <p className="subtitle">Organization Settings</p>
          </div>
        </div>
        <br />
        <div className="columns is-multiline">
          <div className="column is-one-third">
            <ClickCard
              onClick={() => navigate("/org-chart")}
              icon={faBriefcase}
            >
              <div>
                <button className="button is-primary is-fullwidth">
                  Update Org Details
                </button>
              </div>
              <br />
              <div>
                <button className="button is-danger is-fullwidth">
                  Delete Org
                </button>
              </div>
            </ClickCard>
          </div>
          <div className="column is-one-third">
            <ClickCard onClick={() => navigate("/org-chart")} icon={faSitemap}>
              <div>
                <p>Update Org Chart</p>
              </div>
            </ClickCard>
          </div>
          <div className="column is-one-third">
            <ClickCard
              onClick={() => {
                toggeleUserPop();
              }}
              icon={faUsers}
            >
              <div>
                <p>Add/Remove Users</p>
              </div>
            </ClickCard>
          </div>
          <div className="column is-one-third">
            <ClickCard onClick={() => {}} icon={faPuzzlePiece}>
              <div>
                <p>Add/Remove Modules</p>
              </div>
            </ClickCard>
          </div>
          <div className="column is-one-third">
            <ClickCard onClick={() => {}} icon={faCreditCard}>
              <div>
                <p>Update Plan</p>
              </div>
            </ClickCard>
          </div>
        </div>
      </div>
      <Popup trigger={userPop} closePopup={toggeleUserPop}>
        <List listObject={userListObj} />
      </Popup>
    </div>
  );
}

export default OrgSettings;
