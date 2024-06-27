import { useState } from "react";

import ListCard from "../../components/ListCard";
import ListModal from "../../components/ListModal";

import "./index.scss";

const Lists = () => {
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
          <ListCard />
          <ListCard />
          <ListCard />
          <ListCard />
          <ListCard />
        </div>
      </div>
    </>
  );
};

export default Lists;
