import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../components/Context/userContext';
import {Card, Table} from 'react-bootstrap';
import {StatusContext} from '../../../components/Context/statusContext';
import axios from 'axios';
import './ViewFellowEmployees.css'

function ViewFellowEmployees() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {adminStatus, setAdminStatus} = useContext(StatusContext);
    const [fellow, setFellow] = useState();
    // const [isLoaded, setIsLoaded] = useState(false);
    const [empList, setEmpList] = useState([]);
  
    useEffect(() => {
    const getList = async () => {
      if(currentUser && !adminStatus){
        const r = await axios.get(`http://localhost:4000/fellowemployees/${currentUser.companyName}`)
        .then((res) => {
            setEmpList(res.data);
        })}
    }
    getList();
  }, [currentUser]);

  const newConversation = async (empId) => {
    try {
        await axios.post("http://localhost:4000/conversation/", {
            senderId: currentUser._id,
            receiverId: empId,
        })
    } catch (error) {
        
    }
  }

  return (
    <div>
        {empList?(
        <>
            {empList.map(emp => {
            return (
                <div key={emp._id}>
            <img style={{borderRadius: '50px'}} src={emp.imageUrl}
                height='50'
                width='50'
            /><br/>
            {emp.username}
            </div>
            )})}
            
        </>
        ):(
        <>
            No other employees are here :D
        </>
        ) 
    }
    </div>
  )
}

export default ViewFellowEmployees;