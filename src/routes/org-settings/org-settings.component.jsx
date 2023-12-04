import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  faUsers,
  faSitemap,
  faCreditCard, //Don't delete
  faPuzzlePiece, //Don't delete
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import {
  addOrgUser,
  removeOrgUser,
  updateOrg,
} from "../../utils/firebase/firestore-org.utils";

import ClickCard from "../../components/click-card.component";
import Popup from "../../components/popup.component";
import List from "../../components/list.component";
import OrgDetails from "./org-details.component";

import { OrgContext } from "../../context/org.context";

function OrgSettings() {
  const { orgName, orgUsers, orgId, orgUsersN } = useContext(OrgContext);
  const navigate = useNavigate();

  //Popups------------------------------------------------------------------------------------------
  //Org Details
  const [orgDetailsPop, setOrgDetailsPop] = useState(false);
  const toggleOrgDetailsPop = () => {
    setOrgDetailsPop((old) => !old);
  };

  //Users
  const [userPop, setUserPop] = useState(false);
  const toggleUserPop = () => {
    setUserPop((oldStatus) => !oldStatus);
  };

  const addOrgUserHandler = (userEmail) => {
    addOrgUser(orgId, userEmail);
  };

  const removeOrgUserHandler = (orgId, userEmail) => {
    removeOrgUser(orgId, userEmail);
  };

  const orgUsersNArr = () => {
    const retArr = [];

    for (const key in orgUsersN) {
      retArr.push({ listItemId: key, listItem: orgUsersN[key].email });
    }
    return retArr;
  };

  const orgUsersArr = orgUsers?.map((user) => ({
    listItemId: user,
    listItem: user,
  }));

  const userListObj = {
    arr: orgUsersNArr(),
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
            <ClickCard onClick={toggleOrgDetailsPop} icon={faBriefcase}>
              <p>Update Orginization Details</p>
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
                toggleUserPop();
              }}
              icon={faUsers}
            >
              <div>
                <p>Add/Remove Users</p>
              </div>
            </ClickCard>
          </div>
          <div className="column is-one-third">
            {/*<ClickCard onClick={() => {}} icon={faPuzzlePiece}>
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
            </ClickCard>*/}
          </div>
        </div>
      </div>
      <Popup trigger={userPop} closePopup={toggleUserPop}>
        <List listObject={userListObj} />
      </Popup>
      <Popup trigger={orgDetailsPop} closePopup={toggleOrgDetailsPop}>
        <OrgDetails
          orgId={orgId}
          orgName={orgName}
          togglePop={toggleOrgDetailsPop}
        />
      </Popup>
    </div>
  );
}

export default OrgSettings;
