import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";

import "./index.scss";

const Layout = () => {
  return (
    <div className="layout">
      <NavBar />
      <div className="layout__outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
