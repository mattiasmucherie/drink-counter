import React from "react";
import Firebase, { withFirebase } from "../Firebase";

interface signOutFormProps {
  firebase: Firebase | null;
}
const SignOutButton: React.FC<signOutFormProps> = props => {
  return (
    <button type="button" onClick={props.firebase?.doSignOut}>
      Sign Out
    </button>
  );
};
const SignOut = withFirebase(SignOutButton);
export default SignOut;
