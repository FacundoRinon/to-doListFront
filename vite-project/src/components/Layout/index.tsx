import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-sm">
        <NavBar />
      </div>
      <div className="flex-1 overflow-y-auto mt-20 justify-center bg-gray-200">
        <div className="px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
