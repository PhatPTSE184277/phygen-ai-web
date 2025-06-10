import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/user/dashboard";
import UserProfile from "../pages/user/profile";
import Membership from "../pages/user/member_ship";

const DashboardRoutes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/membership",
        element: <Membership />,
      },
    ],
  },
];

export default DashboardRoutes;
