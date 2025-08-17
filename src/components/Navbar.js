import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/finance">Wealth</Link>
        </li>
        <li>
          <Link to="/Lifestyles">LifeStyles</Link>
        </li>
        <li>
          <Link to="/entertainment">Entertainment</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
