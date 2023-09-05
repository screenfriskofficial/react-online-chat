import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext.jsx";
import { auth } from "../firebase.js";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      {currentUser && (
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <button onClick={() => signOut(auth)}>logout</button>
        </div>
      )}
    </div>
  );
};
