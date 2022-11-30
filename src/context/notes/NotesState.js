import NoteContext from './NoteContext';
import {  useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  // fetching notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchingnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt_token":  localStorage.getItem('token'),
      },
    })
    const json = await response.json();
    setNotes(json);
  }

  //add a note
  const addNote = async (title, description, tag) => {
    //api call to add note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt_token":  localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //deleting a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "jwt_token": localStorage.getItem('token'),
      },

    });
    // const json = await response.json();
    //deleting notes in backend
    const newNotes = notes.filter((note) => { return id !== note._id });
    setNotes(newNotes);

  }
  //editing a note

  const editNote = async (id, title, description, tag) => {
    //api call for editing note

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "jwt_token":  localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    })
    // const json = await response.json();
    const newNote=JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNote.length; i++) {
      if (newNote[i]._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  }
  
  

  return (

    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;