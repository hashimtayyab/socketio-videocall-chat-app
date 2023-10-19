import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { UserContext } from '../../Context/userContext';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate } from 'react-router-dom';


function VerificationWait() {
    const [userVerified, setUserVerified] = useState(false)
    
    useEffect(() => {
        const verifyFunc = async () => {
            try {
                var email = localStorage.getItem('email');
                const verified = await axios.get(`http://localhost:4000/checkverified/${email}`)
                if (verified) {
                    setUserVerified(res.data.isVerified);
                }
                // .then((res) => {
                //     // console.log(res.data.isVerified);
                //     setUserVerified(res.data.isVerified);
                // })
            } catch (error) {
                console.log(error);
            }
        };

        verifyFunc();
        const intervalId = setInterval(verifyFunc, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, [])




  return (
    <>
    {!userVerified ? 
    (
    <div>
        <Spinner className='spin' animation='border' variant='primary'/>
    </div>)
    :
    (
    <div>
        {localStorage.removeItem('email')}
        <Navigate to='/login' replace={true}/>
    </div>
    )
    }
    </>
  )
}

export default VerificationWait; 