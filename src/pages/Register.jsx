import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@mui/material";

const Register = () => {
  const [err, setErr] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            location.reload();
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoader(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoader(false);
    }
  };

  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>Chat</span>
        <span className={"title"}>Register</span>
        <form onSubmit={handleSubmit}>
          <TextField variant={"standard"} label={"Login"} type="text" />
          <TextField variant={"standard"} label={"Email"} type="email" />
          <TextField variant={"standard"} label={"Password"} type="password" />
          <input
            style={{ display: "none" }}
            type="file"
            placeholder={"file"}
            id="file"
          />
          <label htmlFor="file">
            <img src={Add} alt="add" />
            <span>Add an avatar</span>
          </label>
          {loader && <CircularProgress />}
          {err && "Something went wrong"}
          <button>Sign Up</button>
        </form>

        <p>
          You do have and account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
