import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar.jsx";

export const MainLayout = () => {
  const location = useLocation();
  return (
    <div className={"main"}>
      <div className={"container"}>
        {location.pathname === "/register" || location.pathname === "/login" ? (
          ""
        ) : (
          <Sidebar />
        )}

        <Outlet />
      </div>
    </div>
  );
};
