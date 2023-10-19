import React, {useContext, useEffect, useState} from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from '../../components/Context/userContext';
import { StatusContext } from '../../components/Context/statusContext'
import Login from '../../components/Login/LoginForm';
import './HomePage.css'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function HomePage() {
  var navigate = useNavigate();
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {adminStatus, setAdminStatus} = useContext(StatusContext)


  useEffect(() => {
    if(currentUser){
      setIsLoggedIn(true);
      // console.log('Admin Status: ' + adminStatus)
;    }
  }, [currentUser, adminStatus, setAdminStatus]);
  return (
    <div className='login_page'>
        
        {!isLoggedIn ?
          (
          <Container className='home_page'>
            <Row>
            {/* <h3>Welcome To HRMS</h3> */}
              <Col sm>
                
              </Col>
              <Col lg={true} className='login-field'><br/>
                <Login/><br/><br/>
                <p style={{fontSize:'15px'}}>Don't have an account?
              <br/>
                <Link to="/signup" style={{color: 'darkturquoise'}}>Sign Up</Link><br/><br/></p>
              </Col>
              <Col sm className='image'></Col>
            </Row><br/>

           </Container>
          ):(
          <>
          {adminStatus ?(
              <>
              <Navigate to="/dashboard" replace={true} />
              </>
            ):(
              <>
                 <Navigate to="/employeedashboard" replace={true} />
              </>
            )
          }
          </>
          )
        }
          
    </div>
  )
}

export default HomePage;