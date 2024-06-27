import "./index.scss";

const ListCard = () => {
  return (
    <>
      <div className="listCard">
        <div className="listCard__title">
          <h2>Titulo de lista</h2>
        </div>
        <div className="listCard__data">
          <p>Type: ----------</p>
          <p>Creation Date: -----</p>
          <p>Deadline: ---------</p>
          <p>State: -------</p>
        </div>
        <div className="listCard__delete">
          <h3>Delete</h3>
        </div>
      </div>
    </>
  );
};

export default ListCard;
