import React from "react";
import "./index.scss";
import Sidebar from "../sidebarMenu";
import { Outlet } from "react-router-dom";

function Dashboard({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__content">{children}</div>
    </div>
  );
}

export default Dashboard;
