import React, { useEffect, useState } from 'react'
import './users.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserType, deleteUser, fetchUserList } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';

function Users() {

	
	const dispatch = useDispatch();
	const { userlist } = useSelector(state => state.user);
	
	useEffect(() => {

		dispatch(fetchUserList());
	}, [dispatch])


	const handleChangeUserType = (e, user) => {
		const currentUserType = e.target.checked ? "Admin" : "User";
		dispatch(changeUserType({
			userType: currentUserType,
			guid: user.guid
		})).then((data) => {
			if (data.payload.status === 200) {
				dispatch(fetchUserList());
			}
		})
	}

	const handleDeleteUser = (user) => {

		dispatch(deleteUser({

			guid: user.guid
		})).then((data) => {
			if (data.payload.status === 200) {
				dispatch(fetchUserList());
			}
		})
	}


	return (
		<div className='p-5'>
			<Link to={'/dashboard'}><i class="fa-solid fa-arrow-left fs-2"></i></Link>
			<table>
				<thead>
					<tr >
						<th>Fullname</th>
						<th>Username</th>
						<th>userType</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{userlist.map((user) =>
						<tr key={user.guid}>
							<td>{user.fullname}</td>
							<td>{user.username}</td>
							<td>
								<label className='toggle-btn'>
									<input type="checkbox" checked={user.userType === "Admin"} onChange={(e) => handleChangeUserType(e, user)} /> <span className='toggle-btn-ui'></span>
								</label>
							</td>
							<td><button className=' delete-btn' onClick={() => handleDeleteUser(user)}><i class="fa-solid fa-circle-minus fs-3"></i></button></td>
						</tr>
					)

					}
				</tbody>
			</table>
		</div>
	)
}

export default Users