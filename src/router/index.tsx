import { Pages, Routes } from "@/constants";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
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
          <Route path={Pages.ABOUT} element={<About />} />
          <Route path={Pages.CONTACT} element={<Contact />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
