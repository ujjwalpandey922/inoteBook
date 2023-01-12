import React, { useContext, useEffect, useState } from "react";
import contextValue from "../context/notes/NoteContext";
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai";

const NoteItem = (props) => {
  const context = useContext(contextValue);
  const { deleteNote, pinnedNote, unPinnedNotes } = context;
  const { updateNote, notes } = props;

  const [toggle, setToggle] = useState(false);
  const date = new Date(notes.Date).toLocaleString();
  useEffect(() => {
    let allpinnedNotes = JSON.parse(localStorage.getItem("pinned"));
    // console.log(allpinnedNotes);
    allpinnedNotes?.forEach((e) => {
      if (e._id === notes._id) setToggle(true);
    });
  }, [notes]);
  const handlePin = () => {
    setToggle(true);
    pinnedNote(notes._id);
    window.scroll(0, 0);
    props.showAlert(" PINNED to the Top", "success");
  };
  const handleUnPin = () => {
    setToggle(false);
    unPinnedNotes(notes._id);
    window.scroll(0, 0);
    props.showAlert(" Note unpinned", "danger");
  };
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
        <footer className="footer mx-1 my-1 d-flex align-items-center me-auto p-2">
          <div className="card-footer text-muted">{date}</div>
          {!toggle ? (
            <AiOutlinePushpin
              onClick={handlePin}
              style={{ cursor: "pointer", fontSize: "20" }}
            />
          ) : (
            <AiFillPushpin
              onClick={handleUnPin}
              style={{ cursor: "pointer", fontSize: "20" }}
            />
          )}

          <i className="fa-regular fa-location-check"></i>
        </footer>
      </div>
    </div>
  );
};

export default NoteItem;
