import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { CircularProgress, TextField } from "@mui/material";

const Login = () => {
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
        location.reload();
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
          <TextField variant={"standard"} label={"Email"} type="email" />
          <TextField variant={"standard"} label={"Password"} type="password" />
          {loader && <CircularProgress />}
          {err && "Something went wrong"}
          <button>Sign in</button>
        </form>
        <p>
          You do have and account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
