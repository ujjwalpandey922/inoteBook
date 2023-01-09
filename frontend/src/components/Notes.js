import React, { useContext, useEffect, useRef, useState } from "react";
import contextValue from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
//All logic Same as addNotes #could have made a component of validate.....

export default function Notes(props) {
  const context = useContext(contextValue);
  const { notes, getAllNotes, editNote } = context;
  const [error, setError] = useState({});
  const [added, setAdded] = useState(false);
  const [CurrentPages, setCurrentPages] = useState(1);
  const numberOfNotes = 6;
  const navTo = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
      console.log(localStorage.getItem("token"));
    } else {
      navTo("/LogIn");
      console.log("Dont have tokken");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  //Update function
  const onclickUpdate = (e) => {
    setError(validate(note));
    setAdded(true);
  };
  if (Object.keys(error).length === 0 && added) {
    refClose.current.click();
    setAdded(false);
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");
  }
  const onChange = (e) => {
    //  name as key and value as value pair
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = (values) => {
    const error = {};
    const regex = /^[A-Za-z ]*$/;
    if (!values.etitle) {
      error.etitle = "Title is required Please....";
    } else if (values.etitle.length <= 2) {
      error.etitle = "Title should be more than 2 character ...";
    } else if (values.etitle.length >= 10) {
      error.etitle = "Title should be less than 10 character ...";
    } else if (!regex.test(values.etitle)) {
      error.etitle = "Title can not be a number(or have numbers)..";
    }
    if (!values.edescription) {
      error.edescription = "Description is a must ...";
    } else if (values.edescription.length <= 10) {
      error.edescription = "Description should be more than 10 character...";
    } else if (!regex.test(values.edescription)) {
      error.edescription = "Description can not be a number(or have numbers)..";
    }
    if (!values.etag) {
      error.etag = "Tag is kind a not required but punch in something....";
    } else if (values.etag.length <= 2) {
      error.tag = "Yah you still have to type in something...";
    } else if (values.etag.length >= 15) {
      error.etag = "Tag can not be so long dude come on man...";
    } else if (!regex.test(values.etag)) {
      error.etag = "Come on man really????? Numbers Again ???";
    }
    return error;
  };

  //Logic to daisplay only fixed number to notes
  const indexOfLastItem = CurrentPages * numberOfNotes;
  const indexOfFirstItem = indexOfLastItem - numberOfNotes;
  const currentItems = notes.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note!!!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  placeholder="Enter the TITLE "
                  value={note.etitle}
                  onChange={onChange}
                />
              </div>
              <p> {error.etitle}</p>

              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  placeholder="Enter the Description"
                  value={note.edescription}
                  onChange={onChange}
                />
                <p> {error.edescription}</p>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="etext"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter the Tag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <p> {error.etag}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onclickUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "NO NOTES TO DISPLAY"}
        </div>
        {currentItems.map((note) => (
          <NoteItem
            notes={note}
            key={note._id}
            updateNote={updateNote}
            showAlert={props.showAlert}
          />
        ))}
      </div>
      <Pagination
        numberOfNotes={numberOfNotes}
        setCurrentPage={setCurrentPages}
      />
    </>
  );
}
