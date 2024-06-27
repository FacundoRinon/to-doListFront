import React, { useState } from "react";
import { UseSelector, useSelector } from "react-redux";
import axios from "axios";

import "./index.scss";

interface ListModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListModal: React.FC<ListModalProps> = ({ setModal }) => {
  interface RootState {
    user: {
      id: number;
      username: string;
      email: string;
    };
  }

  const user = useSelector((state: RootState) => state.user);

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
    });
  }

  return (
    <>
      <div className="listModal">
        <div className="listModal__closeRow">
          <p onClick={() => setModal(false)}>Close</p>
        </div>
        <div className="listModal__form">
          <h1>Create a new list</h1>
          <form id="form" method="post" action="" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              placeholder="Name of the list"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <label htmlFor="type">Type:</label>
            <input
              id="type"
              type="text"
              placeholder="select the type"
              value={type}
              onChange={(event) => setType(event.target.value)}
            />
            <label htmlFor="deadline">Deadline:</label>
            <input
              id="type"
              type="date"
              placeholder="Date"
              value={deadline ? deadline.toISOString().split("T")[0] : ""}
              onChange={handleDateChange}
            />
            <button>Create list</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ListModal;
