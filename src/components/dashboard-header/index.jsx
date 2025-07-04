import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { useSelector } from "react-redux";

function DashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };
  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <nav className="dashboard_header__nav">
        <h3 onClick={handleLogoClick}>EXAMIFY</h3>
        <div className="dashboard_header__nav__items">
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
              <Link to="/dashboard">Contact</Link>
            </li>
            <div className="nav__items__user">
              <p>
                {user
                  ? `Hello ${user?.data?.account?.username}, 👋🏼`
                  : "Hello 👋🏼"}
              </p>
              <img src={user?.avatar} alt="" />
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default DashboardHeader;
