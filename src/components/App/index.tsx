import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import * as ROUTES from "../../constants/routes";
import LandingPage from "../Landing";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import PasswordForget from "../PasswordForget";
import Home from "../Home";
import Account from "../Account";
import Admin from "../Admin";
import Firebase from "../Firebase";
import { withAuthentication } from "../Session";

interface AppProps {
  firebase: Firebase | null;
}
const App: React.FC<AppProps> = props => {
  return (
    <Router>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
    </Router>
  );
};

export default withAuthentication(App);