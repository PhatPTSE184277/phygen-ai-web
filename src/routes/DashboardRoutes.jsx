import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/user/dashboard";
import UserProfile from "../pages/user/profile";
import Membership from "../pages/user/member-ship";
import Generate from "../pages/user/generate";
import History from "../pages/user/history";
import HistoryGenerate from "../pages/user/history-generate";
import GenerateEdit from "../pages/user/generate-edit";

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
      {
        path: "/generate",
        element: <Generate />,
      },
      {
        path: "/generate/edit",
        element: <GenerateEdit />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/history/generate",
        element: <HistoryGenerate />,
      },
    ],
  },
];

export default DashboardRoutes;
