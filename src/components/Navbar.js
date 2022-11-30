import React,{useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom';

const Navbar = () => {
    let location=useLocation();
    useEffect(()=>{
        // eslint-disable-next-line
    },[location])
   
     let navigate=useNavigate();

    const logoutHandler=()=>{
        localStorage.removeItem('token');
        navigate('/signin');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                   <Link className="navbar-brand logo" to="/">DailyNotes</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                               <Link className={`nav-link ${location.pathname==='/'?"active":" "}`} aria-current="page" to="/">Home</Link >
                            </li>
                            <li className="nav-item">
                               <Link className={`nav-link ${location.pathname==='/about'?"active":" "}`} to="/about">About</Link >
                            </li>
                                                        
                        </ul>
                        {!localStorage.getItem('token')?  <form className="d-flex" role="search">
                            <Link to='/signin' className="btn btn-success mx-2" role="button">Signin</Link>
                            <Link to='/signup' className="btn btn-primary mx-2" role="button">Signup</Link>
                        </form> :<button onClick={logoutHandler} className='btn btn-danger'>Log out </button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
