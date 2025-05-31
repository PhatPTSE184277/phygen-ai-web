import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"; // Assuming you have a CSS file for styles

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <h3>EXAMIFY</h3>
        <div className="header__nav__items">
          <ul>
            <li className="nav__btn">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
          <div>
            <Link to={"/login"}>
              <button className="nav__button">Sign in</button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
