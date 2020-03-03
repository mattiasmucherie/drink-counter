import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../Navigation";
import * as ROUTES from "../../constants/routes";
import LandingPage from "../Landing";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import PasswordForget from "../PasswordForget";
import Home from "../Home";
import Account from "../Account";
import Admin from "../Admin";
import { withAuthentication, AuthUserContext } from "../Session";
import { Spinner } from "../spinner/spinner";
import "./style.scss";
import Team from "../Team";

const App: React.FC = () => {
  return (
    <AuthUserContext.Consumer>
      {props =>
        props.loading ? (
          <div className="spinner-wrapper">
            <Spinner color="dark large" />
          </div>
        ) : (
          <Router>
            <Navigation {...props} />
            <div className="main">
              <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_IN} component={SignIn} />
                <Route path={ROUTES.SIGN_UP} component={SignUp} />
                <Route
                  path={ROUTES.PASSWORD_FORGET}
                  component={PasswordForget}
                />
                <Route path={ROUTES.HOME} component={Home} {...props} />
                <Route path={ROUTES.ACCOUNT} component={Account} />
                <Route path={ROUTES.ADMIN} component={Admin} />
                <Route path={ROUTES.TEAM_WITH_ID} component={Team} />
              </Switch>
            </div>
          </Router>
        )
      }
    </AuthUserContext.Consumer>
  );
};

export default withAuthentication(App);
