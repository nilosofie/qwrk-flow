import React, { useContext } from "react";

import OrgEditor from "../../components/org-editor.component";

import { OrgContext } from "../../context/org.context";

function OrgChart() {
  const { orgName } = useContext(OrgContext);
  return (
    <div>
      <br />
      <div className="hero">
        <div className="container hero-head block has-text-centered">
          <p className="title">{orgName}</p>{" "}
          <p className="subtitle">Organizational Chart</p>
        </div>
        <OrgEditor />
      </div>
    </div>
  );
}

export default OrgChart;
