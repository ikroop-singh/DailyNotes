import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const NoteComponent = (props) => {
    const { note, updateNote } = props
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3 my-2">
            <div className="card" >
                <div className="card-body componentCss">
                    
                        <h5 className="card-title" style={{ 'marginRight': '60px' }}>{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <div className="d-flex justify-content-center">

                        <i className="fa-solid fa-file-pen me-4"style={{"display":"inline-block"}} onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-trash"style={{"display":"inline-block"}} onClick={() => {
                            
                           
                            if (window.confirm('Do you really want to delete this note ')) {
                                deleteNote(note._id);
                                props.alertHandler('Note have been deleted ', 'success')
                            }
                        }

                    }
                    ></i>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NoteComponent
