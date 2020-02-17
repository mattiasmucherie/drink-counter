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
  const WithAuthorization: React.FC<WithAuthorizationProps> = props => {
    useEffect(() => {
      if (props.firebase)
        props.firebase.auth.onAuthStateChanged(authUser => {
          if (!condition(authUser)) {
            props.history.push(ROUTES.SIGN_IN);
          }
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <AuthUserContext.Consumer>
        {props => (condition(props.authUser) ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  };
  return withRouter(withFirebase(WithAuthorization));
};
export default withAuthorization;
