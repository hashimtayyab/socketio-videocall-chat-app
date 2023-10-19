import React, {useContext, useEffect, useRef, useState} from 'react';
import  Container  from 'react-bootstrap/Container';
import  Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css';
import axios from 'axios';
import {UserContext} from '../../../components/Context/userContext';
import {io} from 'socket.io-client';
import { sendArrow } from '../../../assets/assets';
import SideNavBar from '../Sidebar/Sidebar';
import ViewFellowEmployees from '../ViewFellowEmployees/ViewFellowEmployees';
import { downLeftArrow } from '../../../assets/assets';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Messenger() {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [onlineUsers, setOnlineUsers] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data =>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    },[]);

    useEffect(() => {
        arrivalMessage && currentChat.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage])
    },[arrivalMessage, currentChat]);


    useEffect(() => {
        if(currentUser?._id !== null){
        socket.current.emit("addUser", currentUser?._id);
        socket.current.on("getUsers",users => {
            // console.log(users);
            setOnlineUsers(users);
        })
    }
    },[currentUser]);


    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[messages]);





    useEffect(() => {
        const getConversation = async () => {
            try {
                if (currentUser){
                const con = await axios.get(`http://localhost:4000/conversation/${currentUser?._id}`);
                setConversation(con.data)}
            } catch (error) {
                console.log(error);
            }
        }
        getConversation();
    }, [currentUser])

    useEffect(() => {
        const getMessages = async () => {
            try {
                if(currentChat){
                    const res = await axios.get(`http://localhost:4000/getmessage/${currentChat?._id}`);
                    setMessages(res.data);
                }    
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser._id,
            text :newMessages,
            conversationId: currentChat._id,
        }
        const receiverId = currentChat.members.find(member => member !== currentUser._id);
        socket.current.emit("sendMessage", {
            senderId :currentUser._id,
            receiverId,
            text: newMessages
        });
        try {
            const sendMessage = await axios.post(`http://localhost:4000/sendmessage`, message);
            setMessages([...messages, sendMessage.data]);
            setNewMessages("");
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        
        <Container className='messenger-container'>
       
            <Row style={{height: '90vh'}}>
                {conversation? (
                <Col className='converse-col' xs={3}>
                    {currentUser?
                    <div className='current-user'>
                        <img style={{borderRadius: '50px'}} src={ currentUser.imageUrl}
                        height='50px'
                        width='50px'
                        />

                        {currentUser.username}
                        <div>
                            <span style={{fontSize:'13px', fontWeight:'500'}}>Active Chats</span>
                        </div>
                    </div>
                    :<></>
                    }
                {
                conversation.map((c) =>(
                    <div key={c._id} onClick={() => setCurrentChat(c)}>
                    <Conversation  conversation={c} currentUser={currentUser}/>
                    </div>
                ))}
                </Col>):(
                    <Col></Col>
                )
                }
                <Col className='chat-col' xs={8}>
                    {/* <div style={{backgroundColor: 'blue'}}>
                   
                    <Link to={"/call"} state={ onlineUsers } >
                        <button style={{backgroundColor:'green'}}>
                            Call
                            </button>
                    </Link>
                    </div> */}
                    
                    {currentChat?(
                    <div className='chatboxWrapper'>
                                  <div style={{justifyContent: 'end', backgroundColor: "gainsboro", marginBottom:'10px'}}>
                                    <Link to={"/call"}>
                                     <Button variant='success' >Call</Button>
                                    </Link>
                                  </div>

                        <div className='chatBoxTop'>
                        {messages.map((m) => (
                            <div key={m._id} ref={scrollRef}>
                            <Message message={m} own = {m.sender === currentUser._id}/>
                            </div>
                        ))}

                        </div>
                        <div className='textarea-container'>
                                <textarea onChange = {(e) => setNewMessages(e.target.value)} 
                                className='writeMessage' placeholder='Write something..'></textarea>
                                <span className="send-button" onClick={handleSubmit}
                                style={{fontSize: "20px"}}
                                >Send {sendArrow}</span>
                            </div>
                    </div>)
                    :
                    (<div
                    style={{
                        fontSize: "50px",
                        color: 'lightgray',
                        textAlign: 'center',
                        alignItems: 'center',
                        marginTop: '20vh'
                        }}
                    >Open a conversation
                    <br/>
                    {downLeftArrow}
                    </div>)
                    }

                </Col>  
                <Col xs={1}>   
                <span style={{fontSize: '15px', fontWeight:'600'}}>People</span>
                    <ViewFellowEmployees/>
                </Col>  
            </Row>    
        </Container>
    </div>
  )
}

export default Messenger;