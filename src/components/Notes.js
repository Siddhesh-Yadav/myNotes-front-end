import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import{useHistory} from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("token")!== null){
      getNotes();
    }else{
      history.push("/login");
    };
  }, []);

  const myRef = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    myRef.current.click();
    setnoteVal({
      id : currentNote._id,
      etitle:currentNote.title,
      edescription:currentNote.description,
      etag: currentNote.tag
    });
  };

  const [noteVal, setnoteVal] = useState({id:"",etitle:"", etag:"", edescription:""})
    const onChange = (e) =>{
        setnoteVal({...noteVal,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        editNote(noteVal.id, noteVal.etitle, noteVal.etag, noteVal.edescription);
        refClose.current.click();
        
    }

  return (
    <div className="row">
      <h2 className="mt-3">Your notes</h2>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={myRef}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
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
                  id="etitle "
                  name='etitle'
                  placeholder="Your Title"
                  onChange={onChange}
                  value={noteVal.etitle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name='etag'
                  placeholder="#General"
                  onChange={onChange}
                  value={noteVal.etag}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name='edescription'
                  rows="3"
                  onChange={onChange}
                  value={noteVal.edescription}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {notes.map((note) => {
        return <Noteitem note={note} updateNote={updateNote} key={note._id} />;
      })}
    </div>
  );
};

export default Notes;
