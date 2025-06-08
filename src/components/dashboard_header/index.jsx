import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import axios from "axios";

function DashboardHeader() {
  const api = "https://683590cfcd78db2058c23218.mockapi.io/user";
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    const reponse = await axios.get(api);
    console.log(reponse.data);
    setUser(reponse.data);
  };

  useEffect(() => {
    fetchUser();
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
                {user[0]
                  ? `Hello ${user[0].name.split(" ").slice(-1)[0]}, 👋🏼`
                  : "Hello 👋🏼"}
              </p>
              <img src={user[0]?.avatar} alt="" />
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default DashboardHeader;
