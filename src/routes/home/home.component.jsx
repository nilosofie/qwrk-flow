import React, { useContext, useEffect, useState } from "react";

import {
  createOrgDocument,
  createUserOrgDocument,
} from "../../utils/firebase/firestore-org.utils";

import {
  userOrgs,
  orgUserIdFromOrgId,
} from "../../utils/firebase/cross-ref.utils";

import { UsersContext } from "../../context/users.context";

import { OrgContext } from "../../context/org.context";

import {
  faBriefcase,
  faUsers,
  faUser,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

import Popup from "../../components/popup.component";
import ClickCard from "../../components/click-card.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";

const Home = () => {
  //Context-----------------------------------------------------------------------------------

  const { uid, userName, userEmail } = useContext(UsersContext);

  const { orgName, updateOrgId, orgState, updateOrgUserId } =
    useContext(OrgContext);

  //Database-------------------------------------------------------------------------------------------

  const [orgs, setOrgs] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await userOrgs(uid);
      setOrgs(res);
    })();
  }, [uid]);

  //Popups------------------------------------------------------------------------------------------

  const [orgPop, setOrgPop] = useState(false);
  const toggeleOrgPop = () => {
    setOrgPop((oldStatus) => !oldStatus);
  };

  const [orgNamePop, setOrgNamePop] = useState(false);
  const toggeleOrgNamePop = () => {
    setOrgNamePop((oldStatus) => !oldStatus);
    setNewOrgName("");
  };

  //Create Org--------------------------------------------------------------------------------------------

  const [newOrgName, setNewOrgName] = useState("");

  const orgNameTextHandler = (e) => setNewOrgName(e.target.value);

  const createOrgPopupHandler = () => {
    toggeleOrgPop();
    toggeleOrgNamePop();
  };

  const createOrgSubmitHandler = async (event) => {
    event.preventDefault();
    const newOrgId = await createOrgDocument(newOrgName, userEmail);
    orgSelect(newOrgId);
    updateOrgUserId(await orgUserIdFromOrgId(newOrgId, uid));
    //createOrgPopupHandler();
    toggeleOrgNamePop();
    toggeleOrgPop();
  };

  //Select Org-------------------------------------------------------------------------------

  const orgSelect = async (orgId) => {
    updateOrgId(orgId);
    updateOrgUserId(await orgUserIdFromOrgId(orgId, uid));
    toggeleOrgPop();
  };

  const userOrgSelect = () => {
    createUserOrgDocument(userName, userEmail);
    updateOrgId(userEmail);
    toggeleOrgPop();
  };
  //Maps----------------------------------------------------------------------------------------

  const orgsMap = orgs?.map(
    (org) =>
      org && (
        <div className="column is-half" key={org.orgUserId}>
          <ClickCard icon={faSitemap} onClick={() => orgSelect(org.orgId)}>
            {org.orgName}
          </ClickCard>
        </div>
      )
  );

  //Return-----------------------------------------------------------------------------------------

  if (orgs === null) return <LoadingScreen />;

  //if (loading) return <LoadingScreen />;

  return (
    <div>
      <br />
      <div className="container">
        <div className="hero">
          <div className="container hero-head has-text-centered">
            <p className="title">{`Hello, ${userName}`}</p>
          </div>
        </div>
        <br />
        <div className="columns is-multiline">
          <div className="column is-half">
            {orgState ? (
              <ClickCard icon={faSitemap} onClick={toggeleOrgPop}>
                <p>Orginization: {orgName}</p>
              </ClickCard>
            ) : (
              <ClickCard icon={faBriefcase} onClick={toggeleOrgPop}>
                <p>Select Orginization</p>
              </ClickCard>
            )}
          </div>

          <div className="column is-half">
            <ClickCard icon={faUsers} onClick={async () => console.log("")}>
              <p>Select Role</p>
            </ClickCard>
          </div>
        </div>
        <Popup trigger={orgPop} closePopup={toggeleOrgPop}>
          <div className="box has-background-grey-lighter">
            <div className="columns is-multiline">
              <div className="column is-half">
                <ClickCard icon={faUser} onClick={userOrgSelect}>
                  Personal
                </ClickCard>
              </div>
              {orgsMap}
              <div className="column is-half">
                <ClickCard icon={faBriefcase} onClick={createOrgPopupHandler}>
                  Create an Orginization
                </ClickCard>
              </div>
            </div>
          </div>
        </Popup>
        <Popup trigger={orgNamePop} closePopup={toggeleOrgNamePop}>
          <form onSubmit={createOrgSubmitHandler} className="box">
            <div className="field has-text-centered">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Orginization Name"
                  value={newOrgName}
                  onChange={orgNameTextHandler}
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
      </div>
    </div>
  );
};

export default Home;
