import { Routes } from "@/constants";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={Routes.ROOT} element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
