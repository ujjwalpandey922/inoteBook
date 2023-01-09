import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  //Do not hard code....
  // const host = "http://localhost:5000";
  const notesInitial = [];

  //Get all note
  const getAllNotes = async () => {
    //Api
    let url = `/api/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    let json = await response.json();

    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //Api
    let url = `/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Add API
    let url = `/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to Edit
    newNotes.forEach((element) => {
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        element.description = description;
      }
    });
    setNotes(newNotes);
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API
    let url = `/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    //delete LOGIC
    const newNote = notes.filter((note) => note._id !== id);
    setNotes(newNote);
  };

  //pin any note
  const pinnedNote = async (id, title, description, tag) => {
    //Add API
    let url = `/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    //Logic to be pinned

    let restNote = notes.filter((note) => note._id !== id);
    const newPinnedNote = notes.filter((note) => note._id === id);
    restNote.unshift(newPinnedNote);
    let NewPosition = JSON.parse(JSON.stringify(restNote.flat(1)));
    setNotes(NewPosition);
  };

  const [notes, setNotes] = useState(notesInitial);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getAllNotes, pinnedNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
