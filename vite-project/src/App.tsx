import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./data/constants";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import TailwindTest from "./pages/TailwindTest";

import Layout from "./components/Layout";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.signup} element={<SignUp />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.lists} element={<Lists />} />
        <Route path={ROUTES.test} element={<TailwindTest />} />
      </Route>
    </Routes>
  );
}

export default App;
