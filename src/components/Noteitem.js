import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(noteContext);  
  const {deleteNote} = context;
  return (
    <div className="col-md-4">
      <div className="card" style={{"width" : "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
          {note.description}
          </p>
        </div>
        <div className="d-grid gap-2 d-md-block">
            <button type="button" className="btn btn-primary btn-sm mx-2" onClick={()=>{updateNote(note)}}>Edit</button>
            <button type="button" className="btn btn-danger btn-sm mx-2" onClick={()=> {deleteNote(note._id)}}>Delete</button>
        </div>
      </div>           
    </div>
  );
};

export default Noteitem;
