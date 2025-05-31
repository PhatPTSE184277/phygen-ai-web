import HomePageLayout from "../layouts/HomePageLayout";
import HomePage from "../pages/home/home";

const homePageRoutes = [
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
];

export default homePageRoutes;