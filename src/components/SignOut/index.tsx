import React from "react";
import Firebase, { withFirebase } from "../Firebase";

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
      <i className="fas fa-sign-out-alt"></i>
    </button>
  );
};
const SignOut = withFirebase(SignOutButton);
export default SignOut;
