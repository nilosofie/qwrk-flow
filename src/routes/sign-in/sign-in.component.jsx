import { useContext } from 'react';

import { UserDashContext } from '../../context/user-dash.context';

import {
  signInWithGooglePopup,
  getUserDoc,
  creatUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const { updateUser } = useContext(UserDashContext);

  const signInWithGoogle = async () => {
    //Note after lesson 111
    //const { user } = await signInWithGooglePopup();
    //const userDocRef = await creatUserDocumentFromAuth(user);
    //const userDoc = await getUserDoc(user.uid);
    //updateUser(userDoc);
    await signInWithGooglePopup();
  };

  return (
    <div>
      <h1>Sign-In Page</h1>
      <button className="button is-info" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
