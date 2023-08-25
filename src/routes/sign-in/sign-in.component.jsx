import React from 'react';

//import { UserDashContext } from '../../context/user-dash.context';

import MainLogo from '../../assets/Qwrk Embleem Pakkie sb 130423 v1.png';

import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  //const { updateUser } = useContext(UserDashContext);

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    await signInWithGooglePopup();
  };

  return (
    <div className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={signInWithGoogle} className="box">
                <div className="field has-text-centered">
                  <figure className="image is-128x128 is-inline-block">
                    <img src={MainLogo} width="100" alt="qwrk logo" />
                  </figure>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      className="button is-info is-fullwidth"
                      type="submit"
                    >
                      Sign in with Google
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
