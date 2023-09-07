import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Неверный формат email")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Пароль должен содержать минимум 6 символов")
        .required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        setLoader(true);
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        location.reload();
      } catch (err) {
        console.error(err);
        setLoader(false);
      }
    },
  });

  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>Chat</span>
        <span className={"title"}>Login</span>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email || null}
            id={"email"}
            name={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            variant={"standard"}
            label={"Password"}
            type="password"
          />
          {loader && <CircularProgress />}
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
