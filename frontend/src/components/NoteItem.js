import React, { useContext } from "react";
import contextValue from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(contextValue);
  const { deleteNote } = context;
  const { notes, updateNote } = props;
  return (
    <div className="col-md-3 mx-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title me-auto p-2">{notes.title}</h5>
            <i
              className="fa-solid fa-pen-to-square mx-3 "
              onClick={() => {
                updateNote(notes);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can mx-3 "
              onClick={() => {
                deleteNote(notes._id);
                props.showAlert(" Note DELETED XOXOXO", "success");
              }}
            ></i>
          </div>
          <div className="card-text">{notes.description}</div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
