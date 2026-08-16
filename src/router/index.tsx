import { Pages, Routes } from "@/constants";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Contact from "@/pages/Contact";
import Forgot from "@/pages/Forgot";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Menu from "@/pages/Menu";
import Register from "@/pages/Register";
import Reset from "@/pages/Reset";
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
          <Route path={Routes.MENU} element={<Menu />} />
          <Route path={Routes.CART} element={<Cart />} />
          <Route path={`${Routes.AUTH}/${Pages.LOGIN}`} element={<Login />} />
          <Route
            path={`${Routes.AUTH}/${Pages.Register}`}
            element={<Register />}
          />
          <Route
            path={`${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
            element={<Forgot />}
          />
          <Route
            path={`${Routes.AUTH}/${Pages.RESET_PASSWORD}`}
            element={<Reset />}
          />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
