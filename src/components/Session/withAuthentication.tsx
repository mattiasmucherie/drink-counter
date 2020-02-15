import React, { useState, useEffect } from "react";
import AuthUserContext from "./context";
import Firebase, { withFirebase } from "../Firebase";

interface WithAuthenticationProps {
  firebase: Firebase | null;
}

const withAuthentication = (Component: any) => {
  const WithAuthentication: React.FC<WithAuthenticationProps> = props => {
    const [authUser, setAuthUser] = useState<firebase.User | null>(null);
    useEffect(() => {
      if (props.firebase)
        props.firebase.auth.onAuthStateChanged(authUser => {
          authUser ? setAuthUser(authUser) : setAuthUser(null);
        });
    }, [props.firebase]);
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
