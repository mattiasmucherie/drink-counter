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
      <ul className="main-nav">
        <li className="nav-item">
          <NavLink to={ROUTES.LANDING} exact className="nav-link">
            <i className="fas fa-beer"></i>
            <span className="link-text">Drink Counter</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={ROUTES.HOME} className="nav-link">
            <i className="fas fa-user-friends"></i>
            <span className="link-text">Home</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={ROUTES.ACCOUNT} className="nav-link">
            <i className="fas fa-user-circle"></i>
            <span className="link-text">Profile</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <SignOutButton />
          <span className="link-text">Sign Out</span>
        </li>
      </ul>
    </nav>
  );
};
const NavigationNonAuth = () => {
  return (
    <nav className="navbar">
      <ul className="main-nav">
        <NavLink to={ROUTES.LANDING} className="nav-item logo">
          <span role="img" aria-label="Beer">
            Drink Counter
          </span>
        </NavLink>
        <li className="nav-item">
          <NavLink to={ROUTES.SIGN_IN} className="nav-link">
            <span className="link-text">Sign Out</span>
            <i className="fas fa-sign-in-alt"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
