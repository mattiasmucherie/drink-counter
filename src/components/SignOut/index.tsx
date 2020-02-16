import React from "react";
import Firebase, { withFirebase } from "../Firebase";
import "./style.scss";
interface signOutFormProps {
  firebase: Firebase | null;
}
const SignOutButton: React.FC<signOutFormProps> = props => {
  return (
    <button
      className="btn-sign-out"
      type="button"
      onClick={props.firebase?.doSignOut}
    >
      Sign Out
    </button>
  );
};
const SignOut = withFirebase(SignOutButton);
export default SignOut;
