import { createBrowserRouter } from "react-router-dom";
import homePageRoutes from "./HomePageRoutes";
import LoginPageRoutes from "./LoginPageRoutes";
import DashboardRoutes from "./DashboardRoutes";

const routes = [
  ...homePageRoutes,
  ...LoginPageRoutes,
  ...DashboardRoutes,
];

const router = createBrowserRouter(routes);

export default router;