import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext.jsx";
import { auth } from "../firebase.js";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, IconButton } from "@mui/material";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      {currentUser && (
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <IconButton
            sx={{
              color: "#a7bcff",
              ":hover": { color: "#3e3c61" },
              cursor: "pointer",
            }}
            className={"logout_btn"}
            onClick={() => signOut(auth)}
          >
            <LogoutIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
