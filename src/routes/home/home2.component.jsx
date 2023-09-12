import React, { useContext, useState } from 'react';

import { query, collection, getFirestore, where } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { createOrgDocument } from '../../utils/firebase/firestore-org.utils';

import { UsersContext } from '../../context/users.context';

import {
  faBriefcase,
  faUsers,
  faUser,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';

import Popup from '../../components/popup.component';
import ClickCard from '../../components/click-card.component';

const Home2 = () => {
  const { uid, userName } = useContext(UsersContext);

  const db = getFirestore();

  const orgsQuery = uid
    ? query(collection(db, 'org'), where('users', 'array-contains', uid))
    : null;

  const [orgs, loading, error] = useCollectionData(orgsQuery);

  const [orgPop, setOrgPop] = useState(false);
  const toggeleOrgPop = async () => {
    setOrgPop((oldStatus) => !oldStatus);
  };

  const [orgNamePop, setOrgNamePop] = useState(false);
  const toggeleOrgNamePop = () => {
    setOrgNamePop((oldStatus) => !oldStatus);
    setOrgName('');
  };

  const [orgName, setOrgName] = useState('');

  const orgNameTextHandler = (e) => setOrgName(e.target.value);

  const createOrgPopupHandler = () => {
    toggeleOrgPop();
    toggeleOrgNamePop();
  };

  const createOrgSubmitHandler = (event) => {
    event.preventDefault();
    createOrgDocument(orgName, uid);
    createOrgPopupHandler();
  };

  const orgsMap = orgs ? (
    orgs.map((org) => (
      <div className="column is-half">
        <ClickCard icon={faSitemap}>{org.orgName}</ClickCard>
      </div>
    ))
  ) : (
    <div>Nothing to show</div>
  );

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
            <ClickCard
              icon={faBriefcase}
              content={'Select Orginization'}
              onClick={toggeleOrgPop}
            >
              Select Orginization
            </ClickCard>
          </div>

          <div className="column is-half">
            <ClickCard
              icon={faUsers}
              onClick={() => console.log('roles clicked')}
            >
              Select Role
            </ClickCard>
          </div>
        </div>
      </div>
      <Popup trigger={orgPop} closePopup={toggeleOrgPop}>
        <div className="box has-background-grey-lighter">
          <div className="columns is-multiline">
            <div className="column is-half">
              <ClickCard icon={faUser}>Personal</ClickCard>
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
                value={orgName}
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
  );
};

export default Home2;
