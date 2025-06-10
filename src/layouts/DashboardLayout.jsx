
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard-header";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
