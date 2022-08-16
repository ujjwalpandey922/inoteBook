import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  //Do not hard code....(duhhh!!!!!!)
  const host = "https://i--note--book.herokuapp.com";
  const notesInitial = [];

  //Get all note
  const getAllNotes = async () => {
    //Api
    let url = `${host}/api/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYjE2MGVjNTU4NTgwNWZkYWQyYmJhIn0sImlhdCI6MTY2MDYyMjM1MH0.6oUB5TiQl-CFYy1JIO4RmYDtb_jlb120mAHjvdmQwaA",
      },
    });
    let json = await response.json();

    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //Api
    let url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYjE2MGVjNTU4NTgwNWZkYWQyYmJhIn0sImlhdCI6MTY2MDYyMjM1MH0.6oUB5TiQl-CFYy1JIO4RmYDtb_jlb120mAHjvdmQwaA",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Add API
    let url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYjE2MGVjNTU4NTgwNWZkYWQyYmJhIn0sImlhdCI6MTY2MDYyMjM1MH0.6oUB5TiQl-CFYy1JIO4RmYDtb_jlb120mAHjvdmQwaA",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to Edit
    newNotes.forEach((element, index) => {
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
    let url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYjE2MGVjNTU4NTgwNWZkYWQyYmJhIn0sImlhdCI6MTY2MDYyMjM1MH0.6oUB5TiQl-CFYy1JIO4RmYDtb_jlb120mAHjvdmQwaA",
      },
    });
    const json = response.json();
    console.log(json);
    //delete LOGIC
    const newNote = notes.filter((note) => note._id !== id);

    setNotes(newNote);
  };

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
