import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext.jsx";
import { auth } from "../../app/firebase.js";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./Navbar.module.scss";

export const Navbar = () => {
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
    <div className={classes.navbar}>
      {currentUser && (
        <>
          <div className={classes.logo} onClick={() => navigate("/")}>
            Chat
          </div>
          <div className={classes.user}>
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <IconButton
              sx={{
                color: "#a7bcff",
                ":hover": { color: "#3e3c61" },
                cursor: "pointer",
              }}
              onClick={handleSignOut}
            >
              <LogoutIcon />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};
