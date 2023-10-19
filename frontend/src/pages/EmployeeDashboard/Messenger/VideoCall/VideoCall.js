import React, { useEffect, useState, useRef, useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "../../../../components/Context/userContext";
import Peer from "simple-peer";
import './VideoCall.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { makeCall , incomingCall} from "../../../../assets/assets";
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const socket = io.connect("http://localhost:8900");

function VideoCall() {
  const navigate = useNavigate();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallerAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [otherSocketId, setOtherSocketId] = useState("");


  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [otherUserId, setOtherUserId] = useState();
  const [thisUserName, setThisUsersName] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on("me", (id) => {
      // console.log("setting my socket ID", id)
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);


  useEffect(() => {
    if(currentUser?._id !== null){
      setName(currentUser?.username)
    socket.emit("addVidUser", currentUser?._id);
    socket.on("getVidUsers",vidUsers => {
        // console.log("vidUser", vidUsers);
        setOnlineUsers(vidUsers);
        // console.log(onlineUsers);

    })
}
},[currentUser]);



useEffect(() => {
  if(onlineUsers.length > 1){
  // console.log("onlineUsers", onlineUsers);
    const userWithDifferentId = onlineUsers.find(user => user.userId !== currentUser._id);
    setOtherSocketId(userWithDifferentId.socketId)
    setOtherUserId(userWithDifferentId.userId);
  }
}, [onlineUsers]);





  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log("data",data);
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallerAccepted(true);
      peer.signal(signal);
    });
    if(connectionRef.current){
    connectionRef.current = peer;
}
  };

  const answerCall = () => {
    setCallerAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    if (callerSignal) {
      peer.signal(callerSignal);
      connectionRef.current = peer;
    }
  };



  const leaveCall = () => {
    console.log("leaveCall");
    navigate("/messenger")
    window.location.reload();
    // setCallEnded(true);
    // connectionRef.current.destroy();
  };


  const [userNamesCache, setUserNamesCache] = useState({});




  useEffect(() => {
    // Iterate through onlineUsers and call getEmpName for each user
    onlineUsers.forEach(onlineUser => {
      if (!userNamesCache[onlineUser.userId]) {
        getEmpName(onlineUser.userId)
          .then(userName => {
            // Once the user name is fetched, it will be stored in userNamesCache
            setUserNamesCache(prevCache => ({
              ...prevCache,
              [onlineUser.userId]: userName,
            }));
          });
      }
    });
  }, [onlineUsers, userNamesCache]);
  

// useEffect(() => {
//   window.location.reload();
// },[]);



  const getEmpName = async (userId) => {
    try {
      if (userNamesCache[userId]) {
        // If the user name is already cached, return it
        return userNamesCache[userId];
      } else {
        const userData = await axios.get(`http://localhost:4000/employee/${userId}`);
        const userName = userData.data.username;
        
        // Cache the user name
        setUserNamesCache(prevCache => ({
          ...prevCache,
          [userId]: userName,
        }));
  
        return userName;
      }
    } catch (error) {
      console.log(error);
      return ''; // Return a default value or handle the error as needed
    }
  };









  return (
    <>
      <h1 style={{justifyContent:'center',
    backgroundColor: 'gainsboro',
    display: 'flex',
    marginBottom: '2px',
    
    }}>Video Calling</h1>

      <div className="_container" style={{backgroundColor: 'gainsboro', height:'80vh'}}>
      <Container>
      <Row style={{ width: '100vw'}}>
        <Col sm={8} lg={'auto'} style={{borderRight: 'solid 5px darkgray', height:'80vh'}}>
        <div className="video-container">
          <Row>
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "50vw", borderRadius: '20px' }}
              />
            )}
          </div>
          </Row>
          <Row>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "50vw" , borderRadius: "20px"}}
              />
            ) : null}
          </div>
          </Row>
        </div>
        </Col>

<Col  style={{backgroundColor: 'seashell'}}>
        <div>
          {currentUser? 
          <>
          <div style={{border: 'solid 1px darkgray', borderRadius: '5px', height: '50px', alignItems:'center'}}>
          {currentUser.username}{"(You)"}<br/>
          </div>
          Online Users <br/>
          </>
          :<></>
          }

          <div className="callBtn">
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall}>End Call</button>
            ) : (

              onlineUsers.length > 1 &&
              onlineUsers.filter(onlineU => onlineU.userId !== currentUser._id).map((onlineU, index) => {  
              return <Button variant="outline-success" key={index} onClick={() => callUser(onlineU.socketId)}>
              {makeCall}&nbsp;&nbsp;{userNamesCache[onlineU.userId] || 'Loading...'}</Button>
            })
              
            )}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div>
              <h2>{name} Incoming</h2>
              <Button variant="outline-success" onClick={answerCall}>{incomingCall}&nbsp;&nbsp;Answer</Button>
            </div>
          ) : null}
        </div>
        </Col>
        </Row>
      </Container>
      </div>

    </>
  );
}

export default VideoCall;