import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar.jsx";

export const MainLayout = () => {
  const location = useLocation();
  return (
    <div className={"home"}>
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
