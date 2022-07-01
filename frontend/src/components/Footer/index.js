import React from 'react';
import './Footer.css';
import { ReactComponent as LinkedIn } from "../../images/linkedin.svg"
import { ReactComponent as GitHub } from "../../images/github.svg"

function Footer(){

  return (
    <ul className="footer">
      <li className="footer-items">
      <p>Created By John Voskuyl</p>
      <a href="https://www.linkedin.com/in/john-voskuyl-a2214083" target="blank">
        <LinkedIn id="linkedIn" />
      </a>
      <a href="https://github.com/jvos415" target="blank">
        <GitHub id="GitHub"/>
      </a>
       <p id="stack-items">Built using React, Redux, PostgreSQL, Express.js, Node.js</p>
       <p id="established"><span>&copy;</span> FRAMED 2022</p>
      </li>
    </ul>
  );
}

export default Footer;
