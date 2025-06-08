import React from "react";
import Header from "../components/header";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard_header";
import Sidebar from "../components/sidebarMenu";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
