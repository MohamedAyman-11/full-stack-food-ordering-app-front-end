import { Pages, Routes } from '@/constants';
import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Contact from '@/pages/Contact';
import Forgot from '@/pages/Forgot';
import Home from '@/pages/Home';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import Menu from '@/pages/Menu';
import Register from '@/pages/Register';
import Reset from '@/pages/Reset';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
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

const Router = () => {
  const { data: user, isLoading } = useGetCurrentUser();
  console.log('user', user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* GLOBAL */}
        <Route path={Routes.ROOT} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={Pages.ABOUT} element={<About />} />
          <Route path={Pages.CONTACT} element={<Contact />} />
          <Route path={Routes.MENU} element={<Menu />} />
          <Route path={Routes.CART} element={<Cart />} />
          <Route
            path={`${Routes.AUTH}/${Pages.LOGIN}`}
            element={
              <ProtectedRoute redirectTo={Routes.ROOT} isAllowed={!user} isLoading={isLoading}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${Routes.AUTH}/${Pages.REGISTER}`}
            element={
              <ProtectedRoute redirectTo={Routes.ROOT} isAllowed={!user} isLoading={isLoading}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
            element={
              <ProtectedRoute redirectTo={Routes.ROOT} isAllowed={!user} isLoading={isLoading}>
                <Forgot />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${Routes.AUTH}/${Pages.RESET_PASSWORD}/:token`}
            element={
              <ProtectedRoute redirectTo={Routes.ROOT} isAllowed={!user} isLoading={isLoading}>
                <Reset />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* USERS */}
        <Route
          path={`${Routes.PROFILE}`}
          element={
            <ProtectedRoute
              isLoading={isLoading}
              isAllowed={user && user.role === 'CUSTOMER'}
              redirectTo={`/${Routes.AUTH}/${Pages.LOGIN}`}
            >
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountDetails />} />
          <Route path={`${Pages.ACCOUNT_DETAILS}`} element={<AccountDetails />} />
          <Route path={`${Pages.PASSWORD}`} element={<UpdatePassword />} />
          <Route path={`${Pages.ORDERS}`} element={<h1>ORDERS</h1>} />
        </Route>
        {/* ADMIN */}
        <Route
          path={`${Routes.ADMIN}`}
          element={
            <ProtectedRoute
              isLoading={isLoading}
              isAllowed={user && user.role === 'ADMIN'}
              redirectTo={`/${Routes.AUTH}/${Pages.LOGIN}`}
            >
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountDetails />} />
          <Route path={`${Pages.ACCOUNT_DETAILS}`} element={<AccountDetails />} />
          <Route path={`${Pages.PASSWORD}`} element={<UpdatePassword />} />
          <Route path={`${Pages.DASHBOARD}`} element={<h1>DASHBOARD</h1>} />
          <Route path={`${Pages.CATEGORIES}`} element={<Categories />} />
          <Route path={`${Pages.CATEGORIES}/:id`} element={<UpdateCategory />} />
          <Route path={`${Pages.SIZES}`} element={<Sizes />} />
          <Route path={`${Pages.EXTRAS}`} element={<Extras />} />
          <Route path={`${Pages.ITEMS}`} element={<Products />} />
          <Route path={`${Pages.CUSTOMERS}`} element={<Users />} />
          <Route path={`${Pages.CUSTOMERS}/:id`} element={<UpdateUser />} />
          <Route path={`${Pages.ORDERS}`} element={<h1>ORDERS</h1>} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
