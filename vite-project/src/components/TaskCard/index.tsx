import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteTask } from "../../redux/userSlice";

interface Task {
  task_id: number;
  title: string;
  dateToComplete: string;
  state: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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
  const [cardTask, setCardTask] = useState(task);
  const [dueDate, setDueDate] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const formatDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    };

    const formattedDate = formatDate(task.dateToComplete);

    setDueDate(formattedDate);
  }, [task.dateToComplete]);

  async function handleState() {
    const response = await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_API_URL}/tasks/${task.task_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setCardTask(response.data);
  }

  async function handleDelete() {
    const response = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/tasks/${task.task_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(deleteTask(task.task_id));
  }

  return (
    <div className="hoverElement mb-6 mt-3 border bg-gray-200 rounded-lg p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-4/12 mb-2 md:mb-0 md:flex md:flex-col md:items-start">
        <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
        <p className="text-sm mb-1">Due date: {dueDate}</p>
        <p className="text-sm">State: {cardTask.state}</p>
      </div>

      <div className="taskCard__description w-full md:w-8/12 md:ml-4">
        <h3>Description:</h3>
        <p className="text-sm mb-3 mt-2 md: text-left">{task.description}</p>
      </div>

      <div className="w-full mt-2 md:mt-0 md:w-4/12 md:flex md:justify-end md:items-center">
        {cardTask && cardTask.state === "pending" ? (
          <p
            className="cursor-pointer bg-green-500 mr-1 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md mb-2 md:mb-0 md:mr-2 text-sm sm:mr-2"
            onClick={() => handleState()}
          >
            Check
          </p>
        ) : (
          <p
            className="cursor-pointer bg-gray-500 mr-1 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-md mb-2 md:mb-0 md:mr-2 text-sm sm:mr-2"
            onClick={() => handleState()}
          >
            Uncheck
          </p>
        )}
        <p
          className="cursor-pointer bg-red-500 mr-1 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md text-sm"
          onClick={() => handleDelete()}
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
