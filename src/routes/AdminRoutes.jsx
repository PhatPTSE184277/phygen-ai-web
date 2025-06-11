import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/user/profile";
import Membership from "../pages/user/member-ship";
import AdminDashboard from "../pages/admin/dashboard";
import AccountManager from "../pages/admin/account-manager";

const AdminRoutes = [
  {
    path: "/admin",
    element: <DashboardLayout />,
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
