import React, { useContext, useState } from 'react';

import {
  createOrgDocument,
  getOrgCol,
} from '../../utils/firebase/firestore-org.utils';

import { UsersContext } from '../../context/users.context';

import {
  faBriefcase,
  faUsers,
  faUser,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';

import Popup from '../../components/popup.component';
import ClickCard from '../../components/click-card.component';
import { org } from '../../data/user-data';

function Home() {
  const { uid } = useContext(UsersContext);

  const [orgs, setOrgs] = useState();

  const [orgPop, setOrgPop] = useState(false);
  const toggeleOrgPop = async () => {
    setOrgPop((oldStatus) => !oldStatus);
    setOrgs(await getOrgCol(uid));
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
        <p className="title">{`Hello, John`}</p>
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
            <ClickCard icon={faUsers} onClick={() => getOrgCol(uid)}>
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
}

export default Home;
