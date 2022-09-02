import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../images/logo-32x32.png"

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const demoUserLogin = () => {
    const credential = "demo@user.io"
    const password = "password"
    return dispatch(sessionActions.login({ credential, password }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink id="add-image" exact to="/add-image">Add Image</NavLink>
        <NavLink id="add-image" exact to={`/my-albums/${sessionUser.id}`}>My Albums</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className="logged-in-nav">
        <button id="demo-user-button" onClick = {demoUserLogin}>Demo User</button>
        <NavLink id="login-button"  to="/login">Log In</NavLink>
        <NavLink id="signup-button" to="/signup">Sign Up</NavLink>
      </div>
    );
  };

  return (
    <div className="nav-bar">
      <p className="nav-bar-items-left">
        <NavLink id="framed-logo" exact to="/">
          <img src={logo} alt="FRAMED logo"></img>
        </NavLink>
        <NavLink id="framed" exact to="/">FRAMED</NavLink>
       </p>
       <div className="nav-bar-items-right">
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
