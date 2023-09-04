import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export const Navbar = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      {currentUser && (
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </div>
  );
};
