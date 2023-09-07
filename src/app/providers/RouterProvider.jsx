import { Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "../../pages/main-layout/index.js";
import ChatsPage from "../../pages/ChatsPage.jsx";

import { AuthContext } from "../../context/AuthContext.jsx";
import { lazy, useContext } from "react";
import { Loadable } from "../../ui/Loadable.jsx";

const HomePage = Loadable(lazy(() => import("../../pages/Home.jsx")));
const LoginPage = Loadable(lazy(() => import("../../pages/Login.jsx")));
const RegisterPage = Loadable(lazy(() => import("../../pages/Register.jsx")));

export const RouterProvider = () => {
  const { currentUser } = useContext(AuthContext);

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/chats",
          element: <ChatsPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);
};
