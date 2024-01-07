import React from "react";
import "./Showkeeper.css";
import axios from "axios";

const Showkeeper = ({ keeperList, setKeeperList }) => {
  const deleteKeeper = (id) => {
    axios
      .post("http://localhost:5000/api/delete", { id })
      .then((res) => setKeeperList(res.data));
  };

  const updateKeeper = (id) => {
    window.open(`http://localhost:3000/update/${id}`, "_self");
  };

  return (
    <div className="Showkeeper row">
      {keeperList.map((keeper) => (
        <div className="keeperCard " key={keeper._id}>
          <h1 className="title">{keeper.title}</h1>
          <i
            className="deleteIcon fa fa-trash"
            aria-hidden="true"
            onClick={() => deleteKeeper(keeper._id)}
          ></i>
          <i
            className="editIcon fa fa-pen-square"
            aria-hidden="true"
            onClick={() => updateKeeper(keeper._id)}
          ></i>
          <textarea
            className="descriptionBox"
            value={keeper.description}
            readOnly
          />
        </div>
      ))}
    </div>
  );
};

export default Showkeeper;
