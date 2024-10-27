
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import ExpenseTracker from './pages/expense-tracker/expense-tracker';
import { useSelector } from 'react-redux';
import Register from './pages/register/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/dashboard';

import Users from './pages/adminPage/users';

function App() {

  const {token,userDetails} = useSelector(state=>{
    return state.auth});
   


  return (
    <><div className="App">
          <Routes>
            <Route path='/register' element={<Register/>}/>
            {token?<>
              <Route path='/expenses' element={<ExpenseTracker/>}/>
            </>:null}
            <Route path='*' element={token?<Dashboard/>: <Login/>} />

            
             {
               userDetails?.userType==="Admin" &&
              <Route path='/users' element={<Users/>} />}
          </Routes>
    </div>
     <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark" />
     </>
  );
}

export default App;
