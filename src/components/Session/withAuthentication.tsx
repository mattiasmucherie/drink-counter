import React, { useState, useEffect } from "react";
import AuthUserContext from "./context";
import Firebase, { withFirebase } from "../Firebase";

interface WithAuthenticationProps {
  firebase: Firebase | null;
}

const withAuthentication = (Component: any) => {
  const WithAuthentication: React.FC<WithAuthenticationProps> = props => {
    const [authUser, setAuthUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const checkIsLoggedIn = async () => {
        if (props.firebase) {
          return await props.firebase.auth.onAuthStateChanged(authUser => {
            authUser ? setAuthUser(authUser) : setAuthUser(null);
            setLoading(false);
          });
        }
      };
      if (props.firebase) {
        setLoading(true);
        checkIsLoggedIn();
      }
    }, [props.firebase]);
    return (
      <AuthUserContext.Provider value={{ authUser, loading }}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
