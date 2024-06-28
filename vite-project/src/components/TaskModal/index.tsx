import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface ListModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal: React.FC<ListModalProps> = ({ setModal }) => {
  interface RootState {
    user: {
      id: number;
      username: string;
      email: string;
    };
  }

  const user = useSelector((state: RootState) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newDate = inputValue ? new Date(inputValue) : null;
    setDate(newDate);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/tasks`,
      data: {
        title,
        description,
        date,
        user_id: user.id,
      },
    });
    setModal(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {/* Fondo borroso: bg-black bg-opacity-50 */}
      <div className="bg-white w-11/12 sm:w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/12 rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Add Task</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setModal(false)}
          >
            &#x2715;
          </button>
        </div>

        {/* Modal Body: Form */}
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
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date to Complete
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={handleDateChange}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
