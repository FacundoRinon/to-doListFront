import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./data/constants";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TailwindTest from "./pages/TailwindTest";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<SignUp />} />
      <Route path={ROUTES.test} element={<TailwindTest />} />
    </Routes>
  );
}

export default App;
