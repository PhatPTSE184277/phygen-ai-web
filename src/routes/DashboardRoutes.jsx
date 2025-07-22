import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/user/dashboard";
import UserProfile from "../pages/user/profile";
import Membership from "../pages/user/member-ship";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InsertManager from "../pages/user/AI-question";
import TopicManager from "../pages/user/topic-question";
import TopicQuestion from "../pages/user/topic-question/question";

const ProtectRouteAuth = ({ children }) => {
  const user = useSelector((state) => state.user);
  console.log("User slice:", user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "manager") {
    return children;
  } else {
    toast.error("Access denied");
    return <Navigate to="/" />;
  }
};

const DashboardRoutes = [
  {
    path: "/",
    element: (
      <ProtectRouteAuth>
        <DashboardLayout />
      </ProtectRouteAuth>
    ),
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
        path: "/AIquestion",
        element: <InsertManager />,
      },
      {
        path: "/topic",
        element: <TopicManager />,
      },
      {
        path: "/topics/:id/detail",
        element: <TopicQuestion />,
      },
    ],
  },
];

export default DashboardRoutes;
