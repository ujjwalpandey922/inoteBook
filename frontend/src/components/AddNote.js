import React, { useContext, useState, useEffect } from "react";
import contextValue from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(contextValue);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [error, setError] = useState({});
  const [added, setAdded] = useState(false);

  const addNoteButton = (e) => {
    e.preventDefault();
    setError(validate(note));
    setAdded(true);
  };
  if (Object.keys(error).length === 0 && added) {
    setAdded(false);
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert(" YAHHHHH !!!!!!!! NOTE ADDED :D ", "success");
  }
  const onChange = (e) => {
    // note value + key and value pair
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && added) {
      console.log(note + added + Object.keys(error).length);
    }
    // eslint-disable-next-line
  }, [error]);

  const validate = (values) => {
    const error = {};
    const regex = /^[A-Za-z ]*$/;
    if (!values.title) {
      error.title = "Title is required Please....";
    } else if (values.title.length <= 2) {
      error.title = "Title should be more than 2 character...";
    } else if (values.title.length >= 10) {
      error.title = "Title should be less than 10 character ...";
    } else if (!regex.test(values.title)) {
      error.title = "Title can not be a number(or have numbers)..";
    }
    if (!values.description) {
      error.description = "Description is a must ...";
    } else if (values.description.length <= 10) {
      error.description = "Description should be more than 10 character...";
    } else if (!regex.test(values.description)) {
      error.description = "Description can not be a number(or have numbers)..";
    }
    if (!values.tag) {
      error.tag = "Tag is kind a not required but punch in something....";
    } else if (values.tag.length >= 15) {
      error.tag = "Tag can not be so long dude come on man...";
    } else if (values.tag.length <= 2) {
      error.tag = "Yah you still have to type in something...";
    } else if (!regex.test(values.tag)) {
      error.tag = "Come on man really????? Numbers Again ???";
    }
    return error;
  };

  return (
    <div>
      <h1>Add A Note</h1>
      <div className="mb-3 my-3 needs-validation" noValidate>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            placeholder="Enter the TITLE "
            onChange={onChange}
            required
          />
          <p> {error.title}</p>

          <div className="mb-3 my-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              placeholder="Enter the Description"
              onChange={onChange}
              required
            />
            <p> {error.description}</p>
            <div className="mb-3 my-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                placeholder="Enter the Tag"
                onChange={onChange}
                required
              />
              <p> {error.tag}</p>
              <button
                type="submit"
                className="btn btn-primary my-3"
                onClick={addNoteButton}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
