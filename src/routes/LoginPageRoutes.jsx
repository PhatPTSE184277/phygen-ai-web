
import LoginPageLayout from "../layouts/LoginPageLayout";
import Login from "../pages/login/login";
import Register from "../pages/register/register";

const LoginPageRoutes = [
  {
    path: "/",
    element: <LoginPageLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default LoginPageRoutes;
