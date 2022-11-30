import React ,{useContext, useState} from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context=useContext(noteContext);
    const [note,setNote]=useState({title:'',description:'',tag:''});
    const {addNote}=context;

    const handleclick=(e)=>{
      e.preventDefault()
      addNote(note.title,note.description,note.tag);
      setNote({title:'',description:'',tag:''});
      props.alertHandler('Note have been added','success');
    }
    
    const onchange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value});
    }
    
  return (
    <div >
      <h1 className=" display-4 heading_custom" >Write your note</h1>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onchange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description </label>
            <input type="text" className="form-control"value={note.description}  id="description" name="description" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag </label>
            <input type="text" className="form-control"value={note.tag}  id="tag" name="tag" onChange={onchange} />
          </div>
          
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary "onClick={handleclick} >Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
