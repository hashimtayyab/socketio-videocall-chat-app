import React, { useEffect, useState } from 'react';
import {Routes, Route} from "react-router";

import SignupForm from "./components/Signup/SignupForm";
import LoginForm from './components/Login/LoginForm';
import HomePage from './pages/Home/HomePage';
import MyNavbar from './components/Navbar/Navbar';
import EmployeeDashboard from './pages/EmployeeDashboard/EmpDashboard/EmployeeDashboard';
import ViewFellowEmployees from './pages/EmployeeDashboard/ViewFellowEmployees/ViewFellowEmployees';
import Messenger from './pages/EmployeeDashboard/Messenger/Messenger';
import axios from 'axios';
import VideoCall from './pages/EmployeeDashboard/Messenger/VideoCall/VideoCall';

import { decodeToken } from 'react-jwt';
import { useLocation } from 'react-router-dom';
import { UserContext } from './components/Context/userContext';
import { StatusContext } from './components/Context/statusContext';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [adminStatus, setAdminStatus] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';


  useEffect(() =>{
      const token = localStorage.getItem('token');
      if(token !== null){
        const myDecodedToken = decodeToken(token);
      setDecodedToken(myDecodedToken.id);
      setAdminStatus(myDecodedToken.isAdmin);
      setIsLoggedIn(true);
      const getDetails = async () => {
        if(isLoggedIn === true){
            try{
              const response = await axios.get(`http://localhost:4000/employee/${decodedToken}`);
              setCurrentUser(response.data);
            } catch(err){
              console.log("Cannot get details", err);
            }
          }

      }
      getDetails()
    }
      else{
        return;
      };
      }, [isLoggedIn, adminStatus, setIsLoggedIn, setAdminStatus]);

    return (
      <div className="App">
          <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <StatusContext.Provider value={{adminStatus, setAdminStatus}}>
              {isLoginPage ? null : <MyNavbar /> }
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/signup' element={<SignupForm/>} />
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
                <Route path='/fellowemployees' element={<ViewFellowEmployees/>}/>
                <Route path='/messenger' element={<Messenger/>}/>
                <Route path='/call' element={<VideoCall/>}/>
             </Routes>     
          </StatusContext.Provider>
          </UserContext.Provider>   
      </div>
    );
}

export default App;
