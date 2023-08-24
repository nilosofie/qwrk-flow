import React, { useContext, useState } from 'react';

import {
  faBriefcase,
  faUsers,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import Popup from '../../components/popup.component';
import ClickCard from '../../components/click-card.component';

function Home() {
  const [orgPop, setOrgPop] = useState(false);
  const toggeleOrgPop = () => setOrgPop((oldStatus) => !oldStatus);
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
            <ClickCard icon={faUsers}>Select Role</ClickCard>
          </div>
        </div>
      </div>
      <Popup trigger={orgPop} closePopup={toggeleOrgPop}>
        <div className="box has-background-grey-lighter">
          <div className="columns is-multiline">
            <div className="column is-third">
              <ClickCard icon={faUser}>Personal</ClickCard>
            </div>
            <div className="column is-third">
              <ClickCard icon={faBriefcase}>Create an Orginization</ClickCard>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Home;
