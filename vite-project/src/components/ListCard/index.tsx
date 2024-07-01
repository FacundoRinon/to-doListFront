import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { deleteList } from "../../redux/userSlice";

interface List {
  list_id: number;
  title: string;
  state: string;
  type: string;
  creation_date: string;
  deadline: string;
}

interface ListCardProps {
  list: List;
}

const ListCard: React.FC<ListCardProps> = ({ list }) => {
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
  const [newDate, setNewDate] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const formatDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    };

    const formattedDate = formatDate(list.creation_date);
    const formattedDeadline = formatDate(list.deadline);
    setNewDate(formattedDate);
    setNewDeadline(formattedDeadline);
  }, [list.creation_date]);

  async function handleDelete() {
    const response = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/lists/${list.list_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(deleteList(list.list_id));
  }

  return (
    <div className="hoverElement w-full md:w-1/2 lg:w-1/3 xl:w-2/5 mx-5 mb-10 rounded-lg shadow-md overflow-hidden bg-white">
      <div
        className="cursor-pointer bg-gray-300 py-2 px-4 flex justify-between items-center"
        onClick={() => navigate(`/list/${list.list_id}?user_id=${user.id}`)}
      >
        <h2 className="cursor-pointer text-lg font-semibold text-blue-500 hover:text-blue-700">
          {list.title}
        </h2>
      </div>
      <div
        className="cursor-pointer p-4"
        onClick={() => navigate(`/list/${list.list_id}?user_id=${user.id}`)}
      >
        <p className="text-sm text-gray-600 mb-2">Type: {list.type}</p>
        <p className="text-sm text-gray-600 mb-2">Creation Date: {newDate}</p>
        <p className="text-sm text-gray-600 mb-2">Deadline: {newDeadline}</p>
        <p className="text-sm text-gray-600">State: {list.state}</p>
      </div>
      <div className="listCard__delete py-2 px-4 bg-gray-200 flex justify-end">
        <p
          className="cursor-pointer text-red-500 hover:text-red-700 font-semibold"
          onClick={() => handleDelete()}
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default ListCard;
