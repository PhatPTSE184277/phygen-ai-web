import { createBrowserRouter } from "react-router-dom";
import homePageRoutes from "./HomePageRoutes";
import LoginPageRoutes from "./LoginPageRoutes";

const routes = [
  ...homePageRoutes,
  ...LoginPageRoutes,
];

const router = createBrowserRouter(routes);

export default router;