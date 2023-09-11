import { useState, useContext } from 'react';

import { Outlet, Link } from 'react-router-dom';

import { UsersContext } from '../../context/users.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import SignIn from '../sign-in/sign-in.component';

import LoadingScreen from '../../components/loading-screen/loading-screen.component';

import MainLogo from '../../assets/Qwrk Embleem Pakkie sb 130423 v1.png';

import { auth } from '../../utils/firebase/firebase.utils';

import { useAuthState } from 'react-firebase-hooks/auth';

const Navigation = () => {
  const [navBurgerStatus, setNavBurgerStatus] = useState(false);
  const { userName } = useContext(UsersContext);

  const handleBurger = () => {
    setNavBurgerStatus(!navBurgerStatus);
  };

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return user ? (
    <div>
      <nav className="navbar is-spaced">
        <div className="navbar-brand">
          <Link to="/" onClick={() => setNavBurgerStatus(false)}>
            <img src={MainLogo} width="100" alt="qwrk logo" />
          </Link>
          <button
            className={`navbar-burger ${navBurgerStatus && 'is-active'}`}
            aria-label="menu"
            aria-expanded="true"
            data-target="navbarBasicExample"
            onClick={handleBurger}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className={`navbar-menu ${navBurgerStatus && 'is-active'}`}>
          <div className="navbar-end">
            <Link
              to="/d2d"
              className="navbar-item"
              onClick={() => setNavBurgerStatus(false)}
            >
              <h1>D2D</h1>
            </Link>
            {user ? (
              <Link type className="navbar-item" onClick={signOutUser}>
                Sign Out
              </Link>
            ) : (
              <Link
                to="/sign-in"
                className="navbar-item"
                onClick={() => setNavBurgerStatus(false)}
              >
                <h1>Sign-In</h1>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  ) : (
    <SignIn />
  );
};

export default Navigation;
