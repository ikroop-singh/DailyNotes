import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NotesState'
import Alert from './components/Alert'
import Signup from './components/Signup';
import Login from './components/Login';
import {useState} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [alert,setAlert]=useState(null);

  const alertHandler=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    });

    setTimeout(()=>{
    setAlert(null);
    },2000)
  }

  return (
    <div >
      <NoteState>
      <BrowserRouter>
        <Navbar />
          <Alert alert={alert}/>
        <div className="container my-4">
        <Routes>
          <Route exact path='/' element={<Home alertHandler={alertHandler}/>} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/signup' element={<Signup alertHandler={alertHandler} />} />
          <Route exact path='/signin' element={<Login alertHandler={alertHandler}/>} />
        </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </div >
  );
}

export default App;
