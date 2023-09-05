import Chats from "./Chats.jsx";
import { Search } from "./Search.jsx";
import { Navbar } from "./Navbar.jsx";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
