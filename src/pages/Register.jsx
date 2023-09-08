import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../app/firebase.js";
import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      file: "",
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string()
        .min(4, "Ваш логин должен содержать минимум 4 символов")
        .required("Обязательное поле"),
      email: Yup.string()
        .email("Неверный формат email")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Ваш пароль должен содержать минимум 6 символов")
        .required("Обязательное поле"),
      file: Yup.string(),
    }),
    onSubmit: async (values) => {
      const { displayName, email, password } = values;
      const file = fileInputRef.current.files[0];

      setLoader(true);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
                typing: false,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
              location.reload();
            } catch (err) {
              console.log(err);
              setLoader(false);
            }
          });
        });
      } catch (err) {
        setLoader(false);
      }
    },
  });

  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>Chat</span>
        <span className={"title"}>Register</span>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            error={Boolean(formik.errors.displayName)}
            helperText={formik.errors.displayName || null}
            id={"displayName"}
            name={"displayName"}
            onChange={formik.handleChange}
            value={formik.values.displayName}
            variant={"standard"}
            label={"Login"}
            type="text"
          />
          <TextField
            fullWidth
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email || null}
            id={"email"}
            name={"email"}
            onChange={formik.handleChange}
            value={formik.values.email}
            variant={"standard"}
            label={"Email"}
            type="email"
          />
          <TextField
            fullWidth
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password || null}
            id={"password"}
            name={"password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            variant={"standard"}
            label={"Password"}
            type="password"
          />
          <input
            ref={fileInputRef}
            id={"file"}
            name={"file"}
            style={{ display: "none" }}
            type="file"
            placeholder={"file"}
          />
          <label htmlFor="file">
            <img src={Add} alt="add" />
            <span>Add an avatar</span>
          </label>
          {loader && <CircularProgress />}
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
