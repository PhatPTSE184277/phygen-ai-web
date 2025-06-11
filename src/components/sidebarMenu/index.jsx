import React from "react";
import I1 from "../../img/i1.png";
import I2 from "../../img/i2.png";
import I3 from "../../img/i3.png";
import I4 from "../../img/i4.png";
import I5 from "../../img/i5.png";
import I6 from "../../img/Icon5.png";
import "./index.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ active, onMenuClick }) => {
  const menuItemsTop = [
    { icon: I1, label: "Dashboard", path: "/dashboard" },
    { icon: I3, label: "My Profile", path: "/profile" },
    { icon: I2, label: "Membership", path: "/membership" },
  ];

  const menuItemsBottom = [
    { icon: I4, label: "Generate", path: "/generate" },
    { icon: I5, label: "History" },
  ];

  return (
    <div className="sidebar">
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
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <span style={{ color: "#000" }}>Log Out</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
