import { useState } from "react";
import { useSelector } from "react-redux";

import ListCard from "../../components/ListCard";
import ListModal from "../../components/ListModal";

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
      <div className="lists w-100 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-lg font-semibold">All your lists</h1>
          <p
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            onClick={() => setModal(true)}
          >
            Create new list
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
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
