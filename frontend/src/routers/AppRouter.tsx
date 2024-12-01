import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layout
import MainLayout from "@layouts/MainLayout/MainLayout";
// pages
const Home = lazy(() => import("@pages/Home"));
const Watch = lazy(() => import("@pages/Watch"));
const Marketplace = lazy(() => import("@pages/Marketplace"));
const Groups = lazy(() => import("@pages/Groups"));
const Gaming = lazy(() => import("@pages/Gaming"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading ... </div>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: "home", element: <Home /> },
      { path: "watch", element: <Watch /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "groups", element: <Groups /> },
      { path: "gaming", element: <Gaming /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default AppRouter;
