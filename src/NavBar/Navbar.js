import React from 'react';
import '../App.css';
import Button from '@mui/material/Button';




function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Players <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Club
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
