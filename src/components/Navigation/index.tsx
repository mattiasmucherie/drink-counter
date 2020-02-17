import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import "./style.scss";
import { User } from "firebase";

const Navigation: React.FC<{
  authUser: User | null;
  loading: boolean;
}> = props => {
  return props.authUser ? <NavigationAuth /> : <NavigationNonAuth />;
};

const NavigationAuth = () => {
  return (
    <nav className="navbar">
      <NavLink to={ROUTES.LANDING} exact className="logo">
        <span role="img" aria-label="Beer">
          Drink Counter
        </span>
      </NavLink>

      <ul className={`main-nav `}>
        <li>
          <NavLink to={ROUTES.HOME} className="nav-links">
            <i className="fas fa-home"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ACCOUNT} className="nav-links">
            <i className="fas fa-user-circle"></i>
          </NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};
const NavigationNonAuth = () => {
  return (
    <nav className="navbar">
      <NavLink to={ROUTES.LANDING} className="logo">
        <span role="img" aria-label="Beer">
          Drink Counter
        </span>
      </NavLink>
      <ul className="main-nav">
        <li>
          <NavLink to={ROUTES.SIGN_IN} className="nav-links">
            <i className="fas fa-sign-in-alt"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
