import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact to="/add-photo">Add Photo</NavLink>
        {/* the link above needs to go to an add-photo page, maybe make this a cool icon*/}
        <NavLink exact to="/">Home</NavLink>
        {/* the link above needs to go to the personal page for a user */}
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Demo User</NavLink>
        {/* the link needs to log you in as a demo user */}
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-bar">
      <li className="nav-bar-items">
       <NavLink id="framed" exact to="/">FRAMED.</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
