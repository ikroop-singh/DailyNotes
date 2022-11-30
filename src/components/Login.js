import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const host = 'http://localhost:5000';
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        if (json.success) {
            //redirect
            localStorage.setItem('token',json.auth_jwt);
            navigate('/');
            props.alertHandler("You have been signed in successfully", "success");

        }
        else {
            props.alertHandler('Invalid credentials', 'danger');
        }
    }


    const changeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // console.log(credentials);
    }
    return (
        <div>
            <h4 className='my-4 text-center display-2'>Sign in  to your account</h4>

            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={changeHandler} name="email" className="form-control" value={credentials.email} id="email" aria-describedby="emailHelp" />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={changeHandler} name="password" value={credentials.password} className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-success">Sign in </button>
            </form>
        </div>
    )
}

export default Login
