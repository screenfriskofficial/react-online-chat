import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext.jsx";
import { auth } from "../app/firebase.js";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ collapsed, handleCollapsed }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="navbar">
      {collapsed ? (
        <ToggleOffIcon
          onClick={handleCollapsed}
          fontSize={"large"}
          sx={{
            cursor: "pointer",
            color: "#a7bcff",
            ":hover": { color: "#3e3c61" },
          }}
        />
      ) : (
        <ToggleOnIcon
          onClick={handleCollapsed}
          fontSize={"large"}
          sx={{
            cursor: "pointer",
            color: "#a7bcff",
            ":hover": { color: "#3e3c61" },
          }}
        />
      )}
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
            onClick={handleSignOut}
          >
            <LogoutIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
