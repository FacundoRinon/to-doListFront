import { useState } from "react";
import { useSelector } from "react-redux";

import ListCard from "../../components/ListCard";
import ListModal from "../../components/ListModal";

import "./index.scss";

const Lists = () => {
  interface List {
    list_id: number;
    title: string;
    state: string;
    type: string;
    creation_date: string;
    deadline: string;
  }

  interface RootState {
    user: {
      email: string;
      id: number;
      token: string;
      lists: List[];
      username: string;
    };
  }

  const user = useSelector((state: RootState) => state.user);

  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <ListModal setModal={setModal} />}
      <div className="lists">
        <div className="lists__header">
          <h1>All your lists</h1>
          <p onClick={() => setModal(true)}>Create new list</p>
        </div>
        <div className="lists__lists">
          {user &&
            user.lists.map((list) => (
              <ListCard key={list.list_id} list={list} />
            ))}
          {user &&
            user.lists.map((list) => (
              <ListCard key={list.list_id} list={list} />
            ))}
          {user &&
            user.lists.map((list) => (
              <ListCard key={list.list_id} list={list} />
            ))}
          {user &&
            user.lists.map((list) => (
              <ListCard key={list.list_id} list={list} />
            ))}
          {user &&
            user.lists.map((list) => (
              <ListCard key={list.list_id} list={list} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Lists;
