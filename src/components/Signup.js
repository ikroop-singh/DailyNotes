import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const host = 'http://localhost:5000';
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const {name, email, password} = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.auth_jwt);
      navigate('/');
      // redirect
      props.alertHandler('Accounted created successfully','success');
    }
    else {
      props.alertHandler('Fill out the details correctly','danger');
    }
  }

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials);
  }
  return (
    <div>
      <div>
      
        <h4 className='my-4 text-center display-2'>Make your account</h4>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text"  onChange={changeHandler} name="name" className="form-control" value={credentials.name} id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" onChange={changeHandler} name="email" className="form-control" value={credentials.email} id="email" aria-describedby="emailHelp" />
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" onChange={changeHandler} name="password" value={credentials.password} className="form-control" id="password" />
          </div>

          <button type="submit" className="btn btn-primary">Sign up </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
