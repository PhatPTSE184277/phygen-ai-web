import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Membership from "../pages/user/member-ship";
import AdminDashboard from "../pages/admin/dashboard";
import AccountManager from "../pages/admin/account-manager";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ExamMatrix from "../pages/admin/exam-manager/exam-matriix";
import Subject from "../pages/admin/exam-manager/subject";
import MatrixDetail from "../pages/admin/exam-manager/matrix-detail";
import MatrixSection from "../pages/admin/exam-manager/matrix-section";
import Topic from "../pages/admin/exam-manager/topic";
import AdminProfile from "../pages/admin/profile";
import InsertQuestion from "../pages/admin/insert";
import { toast } from "react-toastify";
import TopicDetail from "../pages/admin/exam-manager/topic/topicDetail";

const ProtectRouteAuth = ({ children }) => {
  const user = useSelector((state) => state.user);
  console.log("User slice:", user);
  if (user?.role === "admin") {
    return children;
  } else {
    toast.error("Access denied");
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
      {
        path: "exammatrix",
        element: <ExamMatrix />,
      },
      {
        path: "matrixdetail",
        element: <MatrixDetail />,
      },
      {
        path: "matrixsectiion",
        element: <MatrixSection />,
      },
      {
        path: "subject",
        element: <Subject />,
      },
      {
        path: "topic",
        element: <Topic />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "questionForAI",
        element: <InsertQuestion />,
      },
      {
        path: "topics/:id/detail",
        element: <TopicDetail />,
      },
    ],
  },
];

export default AdminRoutes;
