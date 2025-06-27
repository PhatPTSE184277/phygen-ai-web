import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Membership from "../pages/user/member-ship";
import AdminDashboard from "../pages/admin/dashboard";
import AccountManager from "../pages/admin/account-manager";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRouteAuth = ({ children }) => {
  const user = useSelector((state) => state.user); // state.user là do bạn đặt tên trong rootReducer
  console.log("User slice:", user);
  if (user?.data?.account?.role === "Admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectRouteAuth>
        <DashboardLayout />
      </ProtectRouteAuth>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "account",
        element: <AccountManager />,
      },
      {
        path: "membership",
        element: <Membership />,
      },
    ],
  },
];

export default AdminRoutes;
