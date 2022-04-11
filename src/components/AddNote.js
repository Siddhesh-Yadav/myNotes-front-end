import React, { useContext,useState } from 'react';
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNotes } = context;

    const [noteVal, setnoteVal] = useState({title:"", description:"", tag:""})
    const onChange = (e) =>{
        setnoteVal({...noteVal,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        addNotes(noteVal.title, noteVal.description, noteVal.tag);
        setnoteVal({title:"", description:"", tag:""})
    }
  return (
    <div>
      <h2>Add a note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title "
          name='title'
          placeholder="Your Title"
          onChange={onChange}
          value={noteVal.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name='tag'
          placeholder="#General"
          onChange={onChange}
          value={noteVal.tag}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name='description'
          rows="3"
          onChange={onChange}
          value={noteVal.description}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleClick}
      >
        Add Note
      </button>
    </div>
  )
}

export default AddNote