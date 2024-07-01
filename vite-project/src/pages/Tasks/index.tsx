import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TaskCard from "../../components/TaskCard";
import { updateTasks } from "../../redux/userSlice";

const Tasks = () => {
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
    };
  }

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTasks() {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/tasks/${user.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(updateTasks(response.data));
    }
    getTasks();
  }, [user.tasks]);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-200">
      <div className=" mt-5 max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        {user.tasks.length > 0 ? (
          <h1 className="text-blue-500 text-2xl font-bold mb-4">
            All your tasks
          </h1>
        ) : (
          <>
            <h1 className="text-5xl text-blue-600 mb-4">
              Oops {user.username}, it looks like you haven't created any tasks
              yet.
            </h1>
            <p className="text-3xl mt-10">
              You can start by creating a list and then adding tasks, or simply
              use the main list.
            </p>
            <p
              className="cursor-pointer mt-10 hover:text-blue-500"
              onClick={() => navigate("/")}
            >
              Go to the home page
            </p>
            <p
              className="cursor-pointer mt-5 hover:text-blue-500"
              onClick={() => navigate("/lists")}
            >
              Go to the lists page
            </p>
          </>
        )}
        {user.tasks &&
          user.tasks.map((task) => <TaskCard key={task.task_id} task={task} />)}
      </div>
    </div>
  );
};

export default Tasks;
