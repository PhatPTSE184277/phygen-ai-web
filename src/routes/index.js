import { createBrowserRouter } from "react-router-dom";
import homePageRoutes from "./HomePageRoutes";
import LoginPageRoutes from "./LoginPageRoutes";
import DashboardRoutes from "./DashboardRoutes";
import AdminRoutes from "./AdminRoutes";

const routes = [
  ...homePageRoutes,
  ...LoginPageRoutes,
  ...DashboardRoutes,
  ...AdminRoutes
];

const router = createBrowserRouter(routes);

export default router;