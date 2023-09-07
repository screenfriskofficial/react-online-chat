import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar.jsx";

export const MainLayout = () => {
  return (
    <div className={"home"}>
      <div className={"container"}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
