import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://mynotes-back-end.herokuapp.com";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);
  const getNotes = async () => {
    // Logic to api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json);
  };






  const addNotes = async (title,description, tag) => {
    
    
    // Making an api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      
      body: JSON.stringify({title:title,description:description,tag:tag}),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };




  const editNote = async (id, title, tag, description) => {
    // Logic to api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },

      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        newNotes[index].description = description;
        break;
      }
    }
    setnotes(newNotes);
  };





  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
    });

    // Logic fot delting note
      const newNote = notes.filter((note) => {
        return note._id !== id;
      });
      setnotes(newNote);
  };




  return (
    <noteContext.Provider
      value={{ notes, setnotes, editNote, deleteNote, addNotes, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
