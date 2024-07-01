import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteFast } from "../../redux/userSlice";

interface FastTaskProps {
  fast: string;
  index: number;
}

const FastTask: React.FC<FastTaskProps> = ({ fast, index }) => {
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

  const handleDelete = () => {
    dispatch(deleteFast(index));
  };

  return (
    <div className="hoverElement flex items-center bg-gray-100 p-4 mt-3 mb-3 rounded-lg">
      <p className="text-gray-600 font-semibold w-10">{index + 1}</p>
      <div className="flex-1">
        <p className="text-gray-800">{fast}</p>
      </div>
      <button
        className="bg-red-500 text-white py-2 px-3 rounded-lg w-1/5 ml-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
};

export default FastTask;
