import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [err, setError] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoader(false);
      });
  };
  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>Chat</span>
        <span className={"title"}>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder={"email"} />
          <input type="password" placeholder={"password"} />
          {err && "Something went wrong"}
          {loader && "loading..."}
          <button>Sign in</button>
        </form>
        <p>
          You do have and account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};
