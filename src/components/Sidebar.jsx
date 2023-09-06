import { Chats } from "./Chats.jsx";
import { Search } from "./Search.jsx";
import { Navbar } from "./Navbar.jsx";
import { classNames } from "../lib/classNames.js";
import React from "react";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(true);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={classNames("sidebar", { collapsed }, [])}>
      <Navbar
        handleCollapsed={handleCollapsed}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Search />
      <Chats />
    </div>
  );
};
