import React, { useEffect, useState } from "react";
import "./Browse.css";
import { useNavigate } from "react-router-dom";
import { getConnections } from "./services/backendServices";
import logo from "./images/png/logo-no-background.png";
import Conversation from "./components/Conversation";
import ConnectionModal from "./components/ConnectionModal";
import ChatModal from "./components/ChatModal";



const Browse = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [connections, setConnections] = useState([]);
  const [viewingChat, setViewingChat] = useState(false);
  
  useEffect(() => {
    fetch("http://localhost:9292/last-user")
    .then((r) => r.json())
    .then((user) => setCurrentUser({ ...user }));
    
    getConnections(10)
    .then(setConnections)

  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then((r) => r.json())
      .then((data) => {
        setUser(data[Math.floor(Math.random() * (data.length - 1))]);
      });
  }, [refresh]);

  function handleDislike() {
    //add user as both disliked and visited
    fetch(`http://localhost:9292/users-rejections/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rejected_person_id: user.id,
      }),
    }).then((r) => r.json());

    setRefresh((refresh) => refresh + 1);
  }

  function handleLike() {
    //add user as liked and visited
    fetch(`http://localhost:9292/users-likes/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        liked_person_id: user.id,
      }),
    }).then((r) => r.json());

    setRefresh((refresh) => refresh + 1);
  }
  return (
    <div className="browse">
      <div className="browse-matches">
        
        <div className="profile" onClick={() => navigate("/profile")}>
          <img src={logo} alt="here is some alt text" className="profile-img"/>
          {/* FILL THIS UP DYNAMICALLY */}
          <h1>John Smith</h1>
        </div>
        
        <div className="conversations-dropdown">
          {/* FILL THIS DROPDOWN ARROW DYNAMICALLY */}
          <span className="dropdown-arrow">^</span> Conversations{" "}
          <span className="recent">(Recent)</span>
        </div>
        
        <div className="conversations">
          {
            connections.map(data => <Conversation data={data} raiseClick={() => setViewingChat(true)} />)
          }
        </div>
      
      </div>
      
      <div className="browse-right">
        {
          viewingChat ? 
          <ChatModal
            raiseClick={() => setViewingChat(false)}
          />
          :
          <ConnectionModal
            user={user}
            onDislike = {handleDislike}
            onLike = {handleLike}
          /> 
        }
      </div>
    </div>
  );
};

export default Browse;
