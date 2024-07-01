import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

import { ROUTES } from "../../data/constants";

const ProtectedRoute = () => {
  interface RootState {
    user: {
      token: string;
      id: number;
      username: string;
      email: string;
      tasks: Array<{
        task_id: number;
        title: string;
        description: string;
        state: string;
        dateToComplete: string;
      }>;
      lists: Array<{
        list_id: number;
        title: string;
        type: string;
        state: string;
        deadline: string;
      }>;
      fastList: Array<string>;
    };
  }

  const user = useSelector((state: RootState) => state.user);

  if (user.token !== "") {
    return <Outlet />;
  }
  return <Navigate to={ROUTES.login} replace />;
};

export default ProtectedRoute;
