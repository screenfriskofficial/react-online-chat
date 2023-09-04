import React, { useContext } from "react";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";

const App = () => {
  const { currentUser } = useContext(AuthContext);

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
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
