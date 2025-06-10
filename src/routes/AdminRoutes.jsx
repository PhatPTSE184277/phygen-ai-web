import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/user/profile";
import Membership from "../pages/user/member-ship";
import AdminDashboard from "../pages/admin/dashboard";

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
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "membership",
        element: <Membership />,
      },
    ],
  },
];

export default AdminRoutes;
