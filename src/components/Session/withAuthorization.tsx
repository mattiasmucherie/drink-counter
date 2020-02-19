import React, { useEffect } from "react";
import Firebase, { withFirebase } from "../Firebase";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "./context";

interface WithAuthorizationProps extends RouteComponentProps {
  firebase: Firebase | null;
}

const withAuthorization = (
  condition: (authUser: firebase.User | null) => boolean
) => (Component: any) => {
  const WithAuthorization: React.FC<WithAuthorizationProps> = propsAuth => {
    useEffect(() => {
      if (propsAuth.firebase)
        propsAuth.firebase.auth.onAuthStateChanged(authUser => {
          if (!condition(authUser)) {
            propsAuth.history.push(ROUTES.SIGN_IN);
          }
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <AuthUserContext.Consumer>
        {props =>
          condition(props.authUser) ? (
            <Component {...props} {...propsAuth} />
          ) : null
        }
      </AuthUserContext.Consumer>
    );
  };
  return withRouter(withFirebase(WithAuthorization));
};
export default withAuthorization;
