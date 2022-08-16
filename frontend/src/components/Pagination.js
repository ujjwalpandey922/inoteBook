import React, { useContext, useState, useEffect } from "react";
import contextValue from "../context/notes/NoteContext";

function Pagination({ numberOfNotes, setCurrentPage }) {
  const context = useContext(contextValue);
  const { notes } = context;

  const [currentButton, setCurrentButton] = useState(1);
  const numberOfPages = [];

  for (
    let index = 1;
    index <= Math.ceil(notes.length / numberOfNotes);
    index++
  ) {
    numberOfPages.push(index);
  }
  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-primary me-md-2 ${
            currentButton === 1 ? "disabled" : ""
          }`}
          type="button"
          onClick={() =>
            setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
          }
        >
          <i className={`fa-solid fa-3x fa-hand-point-left`}></i>
        </button>

        <button
          className={`btn btn-primary me-md-2 ${
            notes.length === 0 ||
            currentButton === Math.ceil(notes.length / numberOfNotes)
              ? "disabled"
              : ""
          }`}
          type="button"
          onClick={() =>
            setCurrentButton((next) =>
              next === numberOfPages.length ? next : next + 1
            )
          }
        >
          <i className="fa-solid fa-3x fa-hand-point-right" to="/1"></i>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
