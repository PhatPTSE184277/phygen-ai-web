import React from "react";
import { Outlet } from "react-router-dom";
import LoginHeader from "../components/login_header/login_header";

const LoginPageLayout = () => {
  return (
    <>
      <LoginHeader />
      <Outlet />
    </>
  );
};

export default LoginPageLayout;
