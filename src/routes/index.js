import { createBrowserRouter } from "react-router-dom";
import homePageRoutes from "./HomePageRoutes";

const routes = [
  ...homePageRoutes,
];

const router = createBrowserRouter(routes);

export default router;