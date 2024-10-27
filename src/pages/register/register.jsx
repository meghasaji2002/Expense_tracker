import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import './register.css'


function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [fullname, setFullname] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("");
	const [secretKey, setsecretKey] = useState("");




	const handleRegister = (e) => {
		if (userType == "Admin" && secretKey != "MeghaS") {
			e.preventDefault();
			alert('Invalid Admin')
		}
		else {
			e.preventDefault();
			dispatch(register({ username, password, fullname, userType })).then((data) => {
				const { status, message } = data.payload || {};
				if (status === 200) {
					toast('registration successfull', {
						type: 'success'
					})
					navigate("/");
				}
				else {
					toast(message, {
						type: 'error'
					})
				}
			});
		}

	}
	return (
		<div className='register-wrap '>
			<form onSubmit={handleRegister} className='register-box'>
				<h2>Register</h2>
				{/* 
                <div className='w-75 d-flex justify-content-around'>
                  Register as
                  
                <div> <input type="radio" name="UserType"  value="Admin" onChange={(e)=>setUserType(e.target.value)}/>Admin</div>

                 
                 <div><input type="radio" name="UserType"  value="User" onChange={(e)=>setUserType(e.target.value)}/>User</div>
                </div> */}

				{userType == "Admin" ?
					<input type="text" value={secretKey} onChange={(e) => setsecretKey(e.target.value)} placeholder='enter secretkey' className='input-username input-field' />
					: null}



				<input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder='enter username' className='input-username input-field' />

				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter email Id' className='input-email input-field' />

				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter password' className='input-password input-field' />
				<button type='submit' className='button-submit button-primary'>Register</button><span>already an user ? Please<Link to={'/login'}>login</Link></span>
			</form>
		</div>
	)
}

export default Register