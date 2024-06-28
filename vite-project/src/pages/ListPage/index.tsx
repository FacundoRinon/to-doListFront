import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import TaskModal from "../../components/TaskModal";

interface List {
  list_id: number;
  title: string;
  type: string;
  deadline: string;
  state: string;
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
  const [modal, setModal] = useState(false);

  const { id } = useParams();

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
    }
    getList();
  }, []);

  console.log(list);

  return (
    <div className="listPage min-h-screen flex justify-center">
      {list && (
        <div className="listPage__container w-11/12 lg:w-9/12 xl:w-9/12 mt-10">
          <div className="listPage__header flex justify-between items-center bg-gray-300 p-4 rounded-t-md">
            <p className="text-lg font-semibold text-gray-800">{list.title}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              onClick={() => setModal(true)}
            >
              Add Task
            </button>
          </div>
          <div className="listPage__content bg-white p-4 rounded-b-md mt-2">
            {/* {list.tasks.map((task) => (
              <p key={task.task_id} className="py-2 border-b border-gray-200">
                {task.name}
              </p>
            ))} */}
            <p>task</p>
            <p>task</p>
            <p>task</p>
            <p>task</p>
          </div>
          {modal && <TaskModal setModal={setModal} />}
        </div>
      )}
    </div>
  );
};

export default ListPage;
