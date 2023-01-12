import NoteContext from "./NoteContext";
import { useEffect, useState } from "react";

const NoteState = (props) => {
  //Do not hard code....
  // const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);

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
    setEverthing(json);
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
  const pinnedNote = (id) => {
    // use find to get only needed note
    let selectedNote = notes.find((e) => e._id === id);
    //use filter to get remaining notes
    let restOfNotes = notes.filter((e) => e._id !== id);
    //set remaining notes into note
    setNotes(restOfNotes);
    //do not use setPinnedNotes (will show error as state is note changed)
    pinnedNotes.push(selectedNote);
    //store to local storage
    localStorage.setItem("pinned", JSON.stringify(pinnedNotes));
  };
  //remove notes from pin
  const unPinnedNotes = (id) => {
    // use find to get only needed note
    let selectedNote = pinnedNotes.find((e) => e._id === id);
    //use filter to get remaining notes
    let restOfNotes = pinnedNotes.filter((e) => e._id !== id);
    //set remaining notes into pinnednotes
    setPinnedNotes(restOfNotes);
    //do not use setPinnedNotes (will show error as state is note changed)
    notes.push(selectedNote);
    //unpinned data in local storage
    pinnedNotes.length !== 1
      ? localStorage.setItem("pinned", JSON.stringify(pinnedNotes))
      : localStorage.removeItem("pinned");
  };
  const setEverthing = (allnotes) => {
    let allpinnedNotes = JSON.parse(localStorage.getItem("pinned"));
    let refresedNotes = allnotes.filter(
      (e) => !allpinnedNotes?.find((ele) => e._id === ele._id)
    );
    refresedNotes.length === 0 ? <></> : setNotes(refresedNotes);
    allpinnedNotes ? setPinnedNotes(allpinnedNotes) : setPinnedNotes([]);
  };
  console.log(pinnedNotes);
  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        editNote,
        deleteNote,
        getAllNotes,
        pinnedNote,
        pinnedNotes,
        setPinnedNotes,
        unPinnedNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
