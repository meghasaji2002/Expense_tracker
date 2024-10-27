import React, { useState } from 'react'
import './login.css';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password })).then((data) => {
      if (data.payload.status === 200) {
        toast('login successfull', {
          type: 'success'
        })
      } else {
        toast(data.payload.message, {
          type: 'error'
        })
      }
    });
  }

  return (
    <div className='login-wrap '>
      <form onSubmit={handleSubmit} className='login-box'>
        <h2>Login</h2>

        <input onChange={(e) => setUsername(e.target.value)} type="text" value={username} placeholder='enter username' className='input-username input-field' />
        <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder='enter password' className='input-password input-field' />
        <button type='submit' className='button-submit button-primary'>Login</button><span>new user? <Link to={'/register'}>register</Link></span>
      </form>
    </div>
  )
}

export default Login