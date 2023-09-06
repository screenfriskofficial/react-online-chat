import { lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
import { Loadable } from "./ui/Loadable.jsx";

const HomePage = Loadable(lazy(() => import("./pages/Home.jsx")));
const LoginPage = Loadable(lazy(() => import("./pages/Login.jsx")));
const RegisterPage = Loadable(lazy(() => import("./pages/Register.jsx")));

const App = () => {
  const { currentUser } = useContext(AuthContext);
  // TODO: Create validate
  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };
  return (
    <Routes>
      <Route path={"/"}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path={"login"} element={<LoginPage />} />
        <Route path={"register"} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
