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

const ProtectRouteAuth = ({ children }) => {
  const user = useSelector((state) => state.user); // state.user là do bạn đặt tên trong rootReducer
  console.log("User slice:", user);
  if (user?.data?.account?.role === "admin") {
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
        element:<AdminProfile />,
      },
    ],
  },
];

export default AdminRoutes;
