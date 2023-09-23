import React, { useContext, useState } from 'react';

import { query, collection, getFirestore, where } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import {
  createOrgDocument,
  createUserOrgDocument,
} from '../../utils/firebase/firestore-org.utils';

import { UsersContext } from '../../context/users.context';

import { OrgContext } from '../../context/org.context';

import {
  faBriefcase,
  faUsers,
  faUser,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';

import Popup from '../../components/popup.component';
import ClickCard from '../../components/click-card.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';
import OrgEditor from '../../components/org-editor.component';
import { async } from '@dabeng/react-orgchart';

const Home = () => {
  //Context-----------------------------------------------------------------------------------

  const { uid, userName } = useContext(UsersContext);

  const { orgName, updateOrgId, orgState } = useContext(OrgContext);

  //Database-------------------------------------------------------------------------------------------
  const db = getFirestore();

  const orgsQuery = uid
    ? query(collection(db, 'org'), where('users', 'array-contains', uid))
    : null;

  const [orgs, loading] = useCollectionData(orgsQuery);

  //Popups------------------------------------------------------------------------------------------

  const [orgPop, setOrgPop] = useState(false);
  const toggeleOrgPop = () => {
    setOrgPop((oldStatus) => !oldStatus);
  };

  const [orgNamePop, setOrgNamePop] = useState(false);
  const toggeleOrgNamePop = () => {
    setOrgNamePop((oldStatus) => !oldStatus);
    setNewOrgName('');
  };

  const [orgEditorPop, setOrgEditorPop] = useState(false);
  const toggleOrgEditorPop = () => {
    setOrgEditorPop((oldStatus) => !oldStatus);
  };

  //Create Org--------------------------------------------------------------------------------------------

  const [newOrgName, setNewOrgName] = useState('');

  const orgNameTextHandler = (e) => setNewOrgName(e.target.value);

  const createOrgPopupHandler = () => {
    toggeleOrgPop();
    toggeleOrgNamePop();
  };

  const createOrgSubmitHandler = async (event) => {
    event.preventDefault();
    updateOrgId(await createOrgDocument(newOrgName, uid));
    toggeleOrgNamePop();
    toggleOrgEditorPop();
  };

  //Select Org-------------------------------------------------------------------------------

  const orgSelect = (orgId) => {
    updateOrgId(orgId);
    toggeleOrgPop();
  };

  const userOrgSelect = () => {
    createUserOrgDocument(userName, uid);
    updateOrgId(uid);
    toggeleOrgPop();
  };
  //Maps----------------------------------------------------------------------------------------

  const orgsMap = orgs?.map((org) => (
    <div className="column is-half" key={org.orgId}>
      <ClickCard icon={faSitemap} onClick={() => orgSelect(org.orgId)}>
        {org.orgName}
      </ClickCard>
    </div>
  ));

  //Return-----------------------------------------------------------------------------------------

  if (loading) return <LoadingScreen />;

  return (
    <div className="hero is-primary is-fullheight">
      <br />
      <div className="hero-head block has-text-centered">
        <p className="title">{`Hello, ${userName}`}</p>
      </div>
      <br />
      <div className="container">
        <div className="columns is-variable is-8 is-multiline">
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
            <ClickCard
              icon={faUsers}
              onClick={() => console.log('roles clicked')}
            >
              <p>Select Role</p>
            </ClickCard>
          </div>
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
      {/*<Popup trigger={orgEditorPop} closePopup={toggleOrgEditorPop}>
        {OrgEditor}
            </Popup>*/}
    </div>
  );
};

export default Home;
