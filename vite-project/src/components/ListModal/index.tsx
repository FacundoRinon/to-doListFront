import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { addList } from "../../redux/userSlice";

interface ListModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListModal: React.FC<ListModalProps> = ({ setModal }) => {
  interface RootState {
    user: {
      token: string;
      id: number;
      username: string;
      email: string;
    };
  }

  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newDeadline = inputValue ? new Date(inputValue) : null;
    setDeadline(newDeadline);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/lists`,
      data: {
        title,
        type,
        deadline,
        user_id: user.id,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(addList(response.data));
    setModal(false);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Create a new list
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setModal(false)}
            >
              &#x2715;
            </button>
          </div>

          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Name of the list"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-1 p-2 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <input
                  id="type"
                  type="text"
                  placeholder="Select the type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="mt-1 p-2 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deadline
                </label>
                <input
                  id="deadline"
                  type="date"
                  placeholder="Date"
                  value={deadline ? deadline.toISOString().split("T")[0] : ""}
                  onChange={handleDateChange}
                  className="mt-1 p-2 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListModal;
