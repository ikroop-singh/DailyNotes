import React, { useContext, useEffect, useRef ,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteComponent from './NoteComponent';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Note = (props) => {
    const context = useContext(NoteContext);
    const { notes, fetchNotes ,editNote} = context;
    let navigate=useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNotes();
        }
        else{
      navigate('/signin');
        }
        
        // eslint-disable-next-line
    }, []);
    
    const ref = useRef(null);
    const clref=useRef(null);
    const [note,setNote]=useState({id:'',etitle:'',edescription:'',etag:''});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }

    const handleclick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        e.preventDefault();
        clref.current.click();
        props.alertHandler('Changes are saved ','success');
      }
  
      const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
      }

    return (
        <>
            <AddNote alertHandler={props.alertHandler}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} value={note.etitle}minLength={3} required/>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description </label>
                                    <input type="text" className="form-control"value={note.edescription} id="edescription" name="edescription" onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag </label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={clref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edescription.length<5 || note.etitle.length<3} type="button" className="btn btn-primary" onClick={handleclick}> Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <h1 className='display-4 heading_custom'>Your notes</h1>
            <div className="row">
                <p className='lead mx-1'>{notes.length===0 && 'No notes to display '}</p>
                {notes.map((note) => {
                    return <NoteComponent note={note} key={note._id} updateNote={updateNote} alertHandler={props.alertHandler} />
                })}

            </div>
        </>

    )
}

export default Note
