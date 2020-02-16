import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";
import "./style.scss";
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => {
  const [expanded, setExpanded] = useState(false);
  const burgerClick = () => {
    setExpanded(!expanded);
  };
  const closeExpanded = () => {
    setExpanded(false);
  };
  return (
    <nav className="navbar">
      <NavLink to={ROUTES.LANDING} exact className="logo">
        <span role="img" aria-label="Beer">
          🍺
        </span>
      </NavLink>
      <span className="navbar-toggle" onClick={burgerClick}>
        <i className="fas fa-bars"></i>
      </span>
      <ul className={`main-nav ${expanded ? "expanded" : ""}`}>
        <li>
          <NavLink
            to={ROUTES.HOME}
            className="nav-links"
            onClick={closeExpanded}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.ACCOUNT}
            className="nav-links"
            onClick={closeExpanded}
          >
            Account
          </NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
      {expanded && <hr />}
    </nav>
  );
};
const NavigationNonAuth = () => {
  return (
    <nav className="navbar">
      <div className="main-nav-non-auth">
        <NavLink to={ROUTES.LANDING} className="logo">
          <span role="img" aria-label="Beer">
            🍺
          </span>
        </NavLink>

        <NavLink to={ROUTES.SIGN_IN} className="sign-in">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
