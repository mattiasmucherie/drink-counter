import React from "react";
import PasswordForget from "../PasswordForget";
import PasswordChange from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";

const Account = () => (
  <AuthUserContext.Consumer>
    {props => {
      if (props.authUser) {
        return (
          <div>
            <h1>Account: {props.authUser.email}</h1>
            <PasswordForget />
            <PasswordChange />
          </div>
        );
      }
    }}
  </AuthUserContext.Consumer>
);
const condition = (authUser: firebase.User | null) => !!authUser;
export default withAuthorization(condition)(Account);
