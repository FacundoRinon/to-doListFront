import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FastTask from "../../components/FastTask";
import { addFast } from "../../redux/userSlice";

const Home = () => {
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
  const dispatch = useDispatch();

  const [taskContent, setTaskContent] = useState("");

  const addFastTask = () => {
    dispatch(addFast(taskContent));
    setTaskContent("");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full">
      <div className="md:w-1/2 ">
        <div className="bg-white p-4 m-2 rounded-lg">
          <h2 className="text-4xl font-bold text-blue-500 mb-4">
            Welcome {user.username}
          </h2>
          <p className="text-xl text-gray-700">
            You can use the quick list if you don't want to create a permanent
            list, but these data won't be saved permanently. In this list, you
            can only add specific tasks and delete them.
          </p>
        </div>
        <div className="bg-white p-4 m-2 rounded-lg mt-10">
          <h3 className="text-2xl font-bold text-blue-500 mb-4">
            User Information
          </h3>
          <p className="text-xl mt-3 text-gray-700">
            Username: {user.username}
          </p>
          <p className="text-xl mt-3 text-gray-700">E-mail: {user.email}</p>
          <p className="text-xl mt-3 text-gray-700">
            Lists: {user.lists.length}
          </p>
          <p className="text-xl mt-3 text-gray-700">
            Lists: {user.tasks.length}
          </p>
        </div>
      </div>

      <div className="md:w-1/2 bg-green-200 p-4 m-2 rounded-lg flex flex-col">
        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-2">Fast List</h2>
          {user.fastList.length === 0 && (
            <p className="text-gray-700 mb-4">There are no tasks yet</p>
          )}

          {user &&
            user.fastList.map((fast, index) => (
              <FastTask key={index} fast={fast} index={index} />
            ))}
        </div>
        <div className="flex">
          <textarea
            className="w-full rounded-lg border border-gray-300 py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter task here..."
            value={taskContent}
            onChange={(event) => setTaskContent(event.target.value)}
          ></textarea>
          <button
            onClick={() => addFastTask()}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
