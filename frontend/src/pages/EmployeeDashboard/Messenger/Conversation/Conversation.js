import React, { useEffect, useState } from 'react';
import './Conversation.css';
import axios from 'axios';

function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () =>{
      const res = await axios.get(`http://localhost:4000/employee/${friendId}`);
      setUser(res.data, setLoaded(true));
    }
    getUser();
  }, [currentUser, conversation])


  return (
    <div className='conversation'>      
        {loaded?(
          <>
         <img style={{borderRadius: '50px'}} src={user.imageUrl}
          height='50'
          width='50'
          />
          </>
        ):(
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU'/>
        )}
        {user? (
        <span className='conversationUsername' style={{
          fontSize:'20px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100px',
          whiteSpace: 'nowrap',
          }}>
          {user.username}
          </span>
         ):(
          <span></span>
         ) } 
   </div>
  )
}

export default Conversation