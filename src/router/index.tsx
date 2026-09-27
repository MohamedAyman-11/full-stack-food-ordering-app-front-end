import { Pages, Routes } from '@/constants';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home';
import Layout from '@/pages/Layout';
import Menu from '@/pages/Menu';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import DashboardLayout from '@/pages/DashboardLayout.tsx';
import AccountDetails from '@/pages/AccountDetails';
import UpdatePassword from '@/pages/UpdatePassword';
import Sizes from '@/pages/Sizes';
import Extras from '@/pages/Extra';
import Categories from '@/pages/Categories';
import UpdateCategory from '@/pages/UpdateCategory';
import UpdateUser from '@/pages/UpdateUser';
import Users from '@/pages/Users';
import Products from '@/pages/Products';
import UpdateProduct from '@/pages/UpdateProduct';
import CreateProduct from '@/pages/CreateProduct';
import Search from '@/pages/Search';
import AdminPanelLayout from '@/pages/AdminPanelLayout';
import AdminProtectedRoute from './AdminProtectedRoute';
import MyOrders from '@/pages/MyOrders';
import Order from '@/pages/Order';
import Forgot from '@/pages/Forgot';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Reset from '@/pages/Reset';
import AuthProtectedRoute from './AuthProtectedRoute';
import AuthLayout from '@/pages/AuthLayout';
import Checkout from '@/pages/Checkout';
import DeliveryLogin from '@/pages/DeliveryLogin';
import DeliveryLayout from '@/pages/DeliveryLayout';
import DeliveryProtectedRoute from './DeliveryProtectedRoute';
import DeliveryAuthProtectedRoute from './DeliveryAuthProtectedRoute';
import DeliveryOrders from '@/pages/DeliveryOrders';
import AdminOrders from '@/pages/AdminOrders';
import UserProtectedRoutes from './UserProtectedRoutes';
import AdminDeliveryBoys from '@/pages/AdminDeliveryBoys';
import CheckoutSuccess from '@/pages/CheckoutSuccess';
import CheckoutCancel from '@/pages/CheckoutCancel';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ==================== PUBLIC / USER ==================== */}
        <Route path={Routes.ROOT} element={<Layout />}>
          {/* Public */}
          <Route index element={<Home />} />
          <Route path={Pages.SEARCH} element={<Search />} />
          <Route path={Routes.MENU} element={<Menu />} />
          <Route path={Routes.CART} element={<Cart />} />

          {/* User Protected */}
          <Route element={<UserProtectedRoutes />}>
            <Route path={Pages.MY_ORDERS} element={<MyOrders />} />
            <Route path={`${Pages.MY_ORDERS}/:id`} element={<Order />} />
            <Route path={Pages.CHECKOUT} element={<Checkout />} />
            <Route path={Pages.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />
            <Route path={Pages.CHECKOUT_CANCEL} element={<CheckoutCancel />} />

            {/* Profile */}
            <Route path={Routes.PROFILE} element={<DashboardLayout />}>
              <Route index element={<AccountDetails />} />
              <Route path={Pages.ACCOUNT_DETAILS} element={<AccountDetails />} />
              <Route path={Pages.PASSWORD} element={<UpdatePassword />} />
            </Route>
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<AdminProtectedRoute />}>
          <Route path={Routes.ADMIN} element={<AdminPanelLayout />}>
            <Route index element={<Products />} />

            <Route path={Pages.ITEMS}>
              <Route index element={<Products />} />
              <Route path="new" element={<CreateProduct />} />
              <Route path=":id" element={<UpdateProduct />} />
            </Route>

            <Route path={Pages.CATEGORIES}>
              <Route index element={<Categories />} />
              <Route path=":id" element={<UpdateCategory />} />
            </Route>

            <Route path={Pages.SIZES} element={<Sizes />} />

            <Route path={Pages.EXTRAS} element={<Extras />} />

            <Route path={Pages.CUSTOMERS}>
              <Route index element={<Users />} />
              <Route path=":id" element={<UpdateUser />} />
            </Route>

            <Route path={Pages.ORDERS} element={<AdminOrders />} />
            <Route path={Pages.DELIVERY_PARTNERS} element={<AdminDeliveryBoys />} />
          </Route>
        </Route>

        {/* ==================== USER AUTH ==================== */}
        <Route element={<AuthProtectedRoute />}>
          <Route path={Routes.AUTH} element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path={Pages.LOGIN} element={<Login />} />
            <Route path={Pages.REGISTER} element={<Register />} />
            <Route path={Pages.FORGOT_PASSWORD} element={<Forgot />} />
            <Route path={`${Pages.RESET_PASSWORD}/:token`} element={<Reset />} />
          </Route>
        </Route>

        {/* ==================== DELIVERY AUTH ==================== */}
        <Route element={<DeliveryAuthProtectedRoute />}>
          <Route path={Routes.DELIVERY_AUTH} element={<AuthLayout />}>
            <Route index element={<DeliveryLogin />} />
            <Route path={Pages.LOGIN} element={<DeliveryLogin />} />
          </Route>
        </Route>

        {/* ==================== DELIVERY ==================== */}
        <Route element={<DeliveryProtectedRoute />}>
          <Route path={Routes.DELIVERY} element={<DeliveryLayout />}>
            <Route index element={<DeliveryOrders />} />

            <Route path={Pages.ORDERS} element={<DeliveryOrders />} />
          </Route>
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
