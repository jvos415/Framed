import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../images/logo-32x32.png"

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const demoUserLogin = () => {
    setCredential("demo@user.io")
    setPassword("password")
    dispatch(sessionActions.login({ credential, password }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact to="/add-image">Add Image</NavLink>
        {/* the link above needs to go to an add-photo page, maybe make this a cool icon*/}
        <NavLink exact to="/">My Albums</NavLink>
        {/* the link above needs to go to the personal page for a user */}
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button onClick = {demoUserLogin}>Demo User</button>
        {/* the link needs to log you in as a demo user */}
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-bar">
      <li className="nav-bar-items">
        <NavLink id="framed-logo" exact to="/">
          <img src={logo} alt="FRAMED logo"></img>
        </NavLink>
       <NavLink id="framed" exact to="/">FRAMED</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
