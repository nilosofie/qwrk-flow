import React from "react";

import WhiteLogo from "../../assets/Qwrk Embleem Pakkie sb 130423 v13.png";

import "./loading-screen.styles.scss";

function LoadingScreen() {
  return (
    <div className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="has-text-centered">
                <figure className="image is-128x128 is-inline-block fade-animation">
                  <img src={WhiteLogo} width="100" alt="qwrk logo" />
                </figure>
                <p className="content is-small">loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
