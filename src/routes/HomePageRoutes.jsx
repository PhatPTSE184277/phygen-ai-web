import HomePageLayout from "../layouts/HomePageLayout";
import HomePage from "../pages/home/home";

const HomePageRoutes = [
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

export default HomePageRoutes;