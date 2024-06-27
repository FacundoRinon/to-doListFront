import React, { useEffect, useState } from "react";
import "./index.scss";

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
  const [newDate, setNewDate] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

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

  return (
    <>
      <div className="listCard">
        <div className="listCard__title">
          <h2>{list.title}</h2>
        </div>
        <div className="listCard__data">
          <p>Type: {list.type}</p>
          <p>Creation Date: {newDate}</p>
          <p>Deadline: {newDeadline}</p>
          <p>State: {list.state}</p>
        </div>
        <div className="listCard__delete">
          <h3>Delete</h3>
        </div>
      </div>
    </>
  );
};

export default ListCard;
