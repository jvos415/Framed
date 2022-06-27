import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { ReactComponent as LinkedIn } from "../../images/linkedin.svg"
import { ReactComponent as GitHub } from "../../images/github.svg"

function Footer(){

  return (
    <ul className="footer">
      <li className="footer-items">
      <p>Developer: John Voskuyl</p>
      <a href="https://www.linkedin.com/in/john-voskuyl-a2214083">
        <LinkedIn id="linkedIn" />
      </a>
      <a href="https://github.com/jvos415">
        <GitHub id="GitHub"/>
      </a>
       <p><span>&copy;</span>FRAMED 2022</p>
      </li>
    </ul>
  );
}

export default Footer;
