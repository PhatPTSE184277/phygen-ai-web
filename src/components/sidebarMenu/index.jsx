import React from "react";
import I1 from "../../img/i1.png";
import I2 from "../../img/i2.png";
import I3 from "../../img/i3.png";
import I4 from "../../img/i4.png";
import I5 from "../../img/i5.png";
import I6 from "../../img/Icon5.png";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

const Sidebar = ({ active, onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItemsTop = [
    { icon: I1, label: "Dashboard", path: "/dashboard" },
    { icon: I3, label: "My Profile", path: "/profile" },
    { icon: I2, label: "Membership", path: "/membership" },
  ];

  const menuItemsBottom = [
    { icon: I4, label: "AI Question", path: "/AIquestion" },
    { icon: I5, label: "Topic", path: "/topic" },
  ];

  return (
    <div className="sidebar-menu-user">
      <div className="top-menu">
        {menuItemsTop.map((item, idx) => (
          <Link
            style={{ textDecoration: "none" }}
            to={item.path}
            key={idx}
            className={`menu-item ${active === item.label ? "active" : ""}`}
            onClick={() => onMenuClick(item.label)}
          >
            <img src={item.icon} alt={item.label} className="icon-img" />
            <span className="label">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="bottom-menu">
        {menuItemsBottom.map((item, idx) => (
          <Link
            to={item.path}
            style={{ textDecoration: "none" }}
            key={idx}
            className="menu-item"
            onClick={() => onMenuClick(item.label)}
          >
            <img src={item.icon} alt={item.label} className="icon-img" />

            <span className="label">{item.label}</span>
          </Link>
        ))}

        <div>
          <div
            style={{
              border: "1px solid #9197b3",
              margin: "10px 18px",
              width: "230px",
            }}
          />
          <div className="logout">
            <img src={I6} alt="" />
            <span
              className="nav__button"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              style={{ color: "#000" }}
            >
              Log Out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
