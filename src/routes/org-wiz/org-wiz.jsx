//React
import React, { useContext } from 'react';

//Libraries
import OrganizationChart from '@dabeng/react-orgchart';
import 'bulma/css/bulma.min.css';
//import "./mystyles2.scss";

//import './mystyles.scss'; FIX
import logo from '../../assets/Qwrk Embleem Pakkie sb 130423 v1.png';
//Pages

import StepMain from './pages/step-main.page';

//Components

//Context

import { OrgTreeContext } from '../../context/org-tree.context';
import { WizStepCountContext } from '../../context/wiz-step-count.context';

const OrgWiz = () => {
  //Step Counter
  const { incStep, decStep } = useContext(WizStepCountContext);

  //buckets

  const { bucketList, treeView } = useContext(OrgTreeContext);

  return (
    <div className="App main container">
      <div className="columns is-centered is-mobile">
        <div className="column is-narrow">
          <figure className="image is-128x128">
            <img src={logo} alt="qwrk logo" />
          </figure>
        </div>
      </div>
      <div className="body notification mobile-full-width-margin ">
        <div className="header container block">
          <h2 className="title">Setup Wizzard</h2>
        </div>
        <div className="step-div container block">
          <StepMain />
        </div>
        <div className="wiz-nav container block columns is-mobile">
          <div className="column">
            <button
              type="button"
              className="button is-info is-outlined is-fullwidth"
              onClick={() => decStep()}
            >
              Previous
            </button>
          </div>
          <div className="column">
            <button
              type="button"
              className="button is-primary is-fullwidth"
              onClick={() => {
                incStep();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="container notification">
        <OrganizationChart datasource={treeView(bucketList)} />
      </div>
    </div>
  );
};

export default OrgWiz;
