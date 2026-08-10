import { Routes } from "@/constants";
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
          <Route index element={<h2>HOME PAGE</h2>} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
