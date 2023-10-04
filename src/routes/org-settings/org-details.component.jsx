import React, { useState } from "react";

import { updateOrg } from "../../utils/firebase/firestore-org.utils";

function OrgDetails({ orgId, orgName, togglePop }) {
  const [locOrgName, setLocOrgName] = useState(orgName);
  const locOrgNameTextHandler = (e) => setLocOrgName(e.target.value);

  const submitOrgDetails = () => {
    updateOrg(orgId, locOrgName);
    togglePop();
  };

  return (
    <div>
      <form className="box has-text-left" onSubmit={submitOrgDetails}>
        <div className="field">
          <label className="label">Orginization Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Orginization Name"
              value={locOrgName}
              onChange={locOrgNameTextHandler}
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
    </div>
  );
}

export default OrgDetails;
