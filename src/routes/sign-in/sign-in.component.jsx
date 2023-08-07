import {
  signInWithGooglePopup,
  creatUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await creatUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign-In Page</h1>
      <button className="button is-info" onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
    </div>
  );
};

export default SignIn;
