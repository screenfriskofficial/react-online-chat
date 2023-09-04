import React from "react";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx";
import {Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <Routes>
        <Route path={'/'}>
            <Route index element={<Home/>}/>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'register'} element={<Register/>}/>
        </Route>
    </Routes>
  );
};

export default App;
