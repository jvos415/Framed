import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer(){

  return (
    <ul className="footer">
      <li className="footer-items">
       <NavLink exact to="/about">About</NavLink>
       <p><span>&copy;</span> FRAMED 2022</p>
      </li>
    </ul>
  );
}

export default Footer;
