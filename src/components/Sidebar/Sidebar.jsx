import { Search } from "../Search/Search.jsx";
import { Navbar } from "../Navbar/Navbar.jsx";
import React from "react";
import { ChatsFolder } from "../ChatsFolder/ChatsFolder.jsx";
import classes from "./Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <div className={`${classes.sidebar}`}>
      <Navbar />
      <Search />
      <ChatsFolder />
    </div>
  );
};
