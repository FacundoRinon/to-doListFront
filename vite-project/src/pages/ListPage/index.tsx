import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import TaskModal from "../../components/TaskModal";
import TaskCard from "../../components/TaskCard";

interface List {
  list_id: number;
  title: string;
  type: string;
  deadline: string;
  state: string;
}

interface Task {
  task_id: number;
  title: string;
  state: string;
  description: string;
  dateToComplete: string;
}

const ListPage = () => {
  interface RootState {
    user: {
      token: string;
      id: number;
      username: string;
      email: string;
    };
  }

  const user = useSelector((state: RootState) => state.user);

  const [list, setList] = useState<List | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modal, setModal] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getList() {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/lists/${id}?user_id=${user.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setList(response.data);
      setTasks(response.data.tasks);
    }
    getList();
  }, [user]);

  return (
    <div className=" min-h-screen flex justify-center">
      {list && (
        <div className=" w-11/12 lg:w-9/12 xl:w-9/12 mt-10">
          <div className="flex justify-between items-center bg-gray-300 p-4 rounded-t-md">
            <p className="text-lg font-semibold text-gray-800">{list.title}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              onClick={() => setModal(true)}
            >
              Add Task
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-md mt-2">
            {tasks &&
              tasks.map((task) => <TaskCard key={task.task_id} task={task} />)}
          </div>
          {modal && id && <TaskModal setModal={setModal} listId={id} />}
        </div>
      )}
    </div>
  );
};

export default ListPage;
