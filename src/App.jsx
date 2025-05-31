import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
 return <RouterProvider router={router} />;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;

}

export default App;
