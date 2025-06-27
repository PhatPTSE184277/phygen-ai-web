import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import "./index.scss";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((store) => store.user);
  console.log(user);
  const dispatch = useDispatch();

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
      <nav className="header__nav">
        <h3 onClick={handleLogoClick}>EXAMIFY</h3>
        <div className="header__nav__items">
          <ul>
            <li className="nav__btn">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/admin/dashboard">Blog</Link>
            </li>
            <li>
              <Link to="/dashboard">Contact</Link>
            </li>
            <div>
              {user == null ? (
                <Link to="/login">
                  <button className="nav__button">Sign in</button>
                </Link>
              ) : (
                <button
                  className="nav__button"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                >
                  Log out
                </button>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
