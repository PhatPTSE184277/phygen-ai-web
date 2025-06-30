import React, { useState } from "react";
import I1 from "../../../img/a1.png";
import I2 from "../../../img/a2.png";
import I3 from "../../../img/a3.png";
import I4 from "../../../img/a4.png";
import I5 from "../../../img/i1.png";
import I6 from "../../../img/Icon5.png";
import "./index.scss";
import { Link } from "react-router-dom";

const AdminSidebar = ({ active, onMenuClick }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const menuItems = [
    { icon: I5, label: "Dashboard", path: "/admin/dashboard" },
    { icon: I1, label: "Account", path: "/admin/account" },
    {
      icon: I2,
      label: "Exam",
      children: [
        { label: "Exam Matrix", path: "/admin/exammatrix" },
        { label: "Matrix Detail", path: "/admin/matrixdetail" },
        { label: "Matrix Section", path: "/admin/matrixsectiion" },
      ],
    },
    { icon: I2, label: "Subject", path: "/admin/subject" },
    { icon: I2, label: "Feedback", path: "/admin/feedback" },
    { icon: I4, label: "AI", path: "/AI" },
  ];

  return (
    <div className="sidebar-menu-admin">
      <div className="menu">
        {menuItems.map((item, idx) =>
          item.children ? (
            <div className="menu-item-group" key={idx}>
              <div
                className={`menu-item parent ${
                  openMenu === item.label ? "open" : ""
                } ${active === item.label ? "active" : ""}`}
                onClick={() => {
                  toggleMenu(item.label);
                  onMenuClick(item.label); // Để tô màu luôn khi click cha
                }}
              >
                <img src={item.icon} alt={item.label} className="icon-img" />
                <span className="label">{item.label}</span>
              </div>
              {openMenu === item.label && (
                <div className="submenu">
                  {item.children.map((child, cIdx) => (
                    <Link
                      to={child.path}
                      key={cIdx}
                      className={`sub ${
                        active === child.label ? "active" : ""
                      }`}
                      onClick={() => onMenuClick(child.label)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={item.path}
              style={{ textDecoration: "none" }}
              key={idx}
              className={`menu-item ${active === item.label ? "active" : ""}`}
              onClick={() => onMenuClick(item.label)}
            >
              <img src={item.icon} alt={item.label} className="icon-img" />
              <span className="label">{item.label}</span>
            </Link>
          )
        )}

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

export default AdminSidebar;
