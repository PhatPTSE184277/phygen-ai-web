import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./login_header.scss";

function LoginHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <nav className="header__nav">
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
        <div className="tab-container">
          <Link
            to="/login"
            id="signInTab"
            className={`tab ${
              currentPath === "/login" ? "active" : "bordered"
            }`}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            id="registerTab"
            className={`tab ${
              currentPath === "/register" ? "active" : "bordered"
            }`}
          >
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default LoginHeader;
