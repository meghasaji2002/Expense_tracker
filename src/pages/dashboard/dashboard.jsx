import React, { useEffect } from 'react'
import './dashboard.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesGraphData } from '../../redux/slices/dashboardSlice';
import { fetchUserList, editUser } from '../../redux/slices/userSlice';
import { logout, updateUserState } from '../../redux/slices/authSlice';
import { apiURL } from '../../constants';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);





function Dashboard() {

	const [show, setShow] = useState(false);
	const [profileInput, setProfileInput] = useState(null);
	const [inputFullname, setInputFullname] = useState("");
	const [profileImageUrl, setProfileImageUrl] = useState("https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg");
	const [menuOpen, setMenuOpen] = useState(false);
	const [expenseYear, setExpenseYear] = useState(
		new Date().getFullYear()
	)

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();
	const { expenseGraphData } = useSelector(state => state.dashboard);
	const { userlist } = useSelector(state => state.user);
	const { userDetails } = useSelector(state => state.auth);
 console.log("userDetails ", userDetails);

	const logOut = () => {
		dispatch(logout())
	}

	useEffect(() => {
		if (userDetails?.fullname) {
			setInputFullname(userDetails?.fullname);
			setProfileImageUrl(apiURL + "/uploads/" + userDetails?.profile);
		}
	}, [userDetails]);

	useEffect(() => {
		dispatch(fetchExpensesGraphData(expenseYear));

	}, [dispatch, expenseYear])

	useEffect(() => {

		dispatch(fetchUserList());
	}, [dispatch])

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false
			},
		},
	};
	const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const data = {
		labels,
		datasets: [
			{
				label: 'Credit',
				data: expenseGraphData?.credits,
				backgroundColor: 'rgba(255, 99, 132, 1)',
			},
			{
				label: 'Debit',
				data: expenseGraphData?.debits,
				backgroundColor: 'rgba(53, 162, 235, 1)',
			},
		],
	};


	const handleProfileInput = (e) => {
		const files = e.target.files[0];
		setProfileInput(files);
		setProfileImageUrl(URL.createObjectURL(files));

	}

	const handleEditProfile = () => {
		let reqBody = null;
		reqBody = new FormData();
		reqBody.append("fullname", inputFullname);
		reqBody.append("profile", profileInput[0]);
		dispatch(editUser(reqBody, true)).then((data) => {
			if (data.payload.status === 200) {
				dispatch(updateUserState({ ...data?.payload?.data }));
				toast.success('profile image changed')
			}
		});
	}



	return (
		<div className='page-wrap'>
			{menuOpen &&
				<div className='menu-wrap'>
					<Link className='link' to="/">
						Home
					</Link>
					<Link className='link' to="/expenses">
						Expenses
					</Link>
					{userDetails?.userType === "Admin" &&
						<Link className='link' to="/users">
							Users
						</Link>}
				</div>}
			<div className='home-page page'>
				<header>
					<div onClick={() => {
						setMenuOpen(!menuOpen)
					}}>
						<i className="fa-solid fa-bars fs-3"></i>
					</div>
					<div className='logo-title' >
						<i className="fa-solid fa-wallet fs-3"></i>
						<h3 className='title'>WalletWatch</h3>
					</div>



					<div className='drop-profile'>
						<div>
							<Dropdown align="end">
								<Dropdown.Toggle id="dropdown-basic">
									Profile
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<div className='drop-bg'>
										<div className='drop-profile-img'><button className='profile-img-button' onClick={handleShow}><img className='avatar' width={45} height={45} src={userDetails?.profile ? profileImageUrl : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"} alt="profile-img" /></button></div>
										<div className='drop-fullname-username'><p>{userDetails?.fullname}</p>
											<p>{userDetails?.username}</p></div>
										<div>
											<button onClick={logOut} type='button' title='logout' className=' button-primary'><i className="fa-solid fa-right-from-bracket me-2"></i><span>Logout</span></button>
										</div>
									</div>
								</Dropdown.Menu>
							</Dropdown>
						</div>

						<Modal className='modal' show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title className='modal-title'>Edit Profile</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<div>
									<div className="img-upload-btn">
										<div className='img-preview-wrapper'>
											<img className='avatar' width={45} height={45} src={userDetails?.profile ? (apiURL + "/uploads/" + userDetails?.profile) : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"} alt="profile-img" />
										</div>
										<label>
											<input id='profile' onChange={handleProfileInput} type="file" style={{ display: 'none' }} />
											<div className='upload-btn' >Change Profile Picture</div>
										</label>
									</div>
									<div className="label-fullname">
										<label htmlFor="">Fullname</label>
										<input className='input-field fullname' value={inputFullname} onChange={(e) => setInputFullname(e.target.value)} type="text" />
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose} >
									Cancel
								</Button>
								<Button variant="primary" onClick={handleEditProfile}>
									Edit
								</Button>
							</Modal.Footer>
						</Modal>


					</div>

				</header>
				<section className='first-section'>
					<h1>WalletWatch</h1>
					<p>Your ultimate financial companion !</p>
				</section>
				<section className='second-section'>
					<div className='container-fluid main'>
						<div className="row">
							<div className="col-md-6 mb-3">
								<div className='d-flex align-items-center justify-content-between mb-2'>
									<h3>Expense Details</h3>
									<input className='input-field' value={expenseYear} onChange={(e) => setExpenseYear(e.target.value)} type="number" min="1950" max="2050" step="1" />
								</div>
								<div className='diagram border'>
									<Bar options={options} data={data} />
								</div>
							</div>
							{userDetails?.userType === "Admin" &&
								<div className="col-md-6 mb-3">
									<h3>Users</h3>
									<div className='user-details'>
										{userlist.map((item) => <div key={item.guid} className='single-user'>
											<div >
												<img className='avatar' width={45} height={45} src={item?.profile ? (apiURL + "/uploads/" + item?.profile) : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"} alt="" />
											</div>
											<div className='fullname-email'>
												<h5>{item.fullname}</h5>
												<p>{item.username}</p>
											</div>
										</div>)
										}


									</div>
								</div>}
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default Dashboard
