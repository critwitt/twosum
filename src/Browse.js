import React, { useEffect, useState } from "react";
import "./Browse.css";
import { useNavigate } from "react-router-dom";
import { getConnections, getAUser } from "./services/backendServices";
import logo from "./images/png/logo-no-background.png";
import Conversation from "./components/Conversation";
import ConnectionModal from "./components/ConnectionModal";
import ChatModal from "./components/ChatModal";
import Cookies from "universal-cookie";
import MatchModal from "./MatchModal";

const Browse = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState([]);

  const [viewingChat, setViewingChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [matchInView, setMatchInView] = useState(0);
  const [reciever, setReciever] = useState(0);
  const [recieverName, setRecieverName] = useState("");

  const [refresh, setRefresh] = useState(0);
  const [matches, setMatches] = useState([]);
  const [isShowingConversations, setIsShowingConversations] = useState(true);
  const [justMatchedId, setJustMatchedId] = useState(null);
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    // ensures there is a user even signed in
    if (!userId) {
      navigate("/");
    }

    // GET USER
    fetch(`http://localhost:9292/users/${userId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setCurrentUser(data);
      });

    // GET USER MATCHES
    fetch(`http://localhost:9292/matches/user/${userId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setMatches(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then((r) => r.json())
      .then((data) => {
        setUser(data[Math.floor(Math.random() * (data.length - 1))]);
      });
  }, [refresh]);

  // used to get a specific user for matching
  // useEffect(() => {
  //   fetch("http://localhost:9292/users/73")
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setUser(data);
  //     });
  // }, [refresh]);

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
    })
      .then((r) => r.json())
      //NOW THIS RESULT WILL TRIGGER SOMETHING. WHEN ACCEPTED, THE RESULT IS GOING TO BE THE STRING THAT IS RETURNED. NOW, WE CAN DO SOMETHING WITH THIS STRING!
      .then((result) => {
        let results = result.split(" ");
        setJustMatchedId(parseInt(results[results.length - 1]));
        if (results[results.length - 1]) {
          setShowMatch(true);
          return;
        }
      });

    setRefresh((refresh) => refresh + 1);
  }

  function handleConversationClick() {
    setIsShowingConversations(!isShowingConversations);
  }

  function onViewChat(messages, matchId, reciever) {
    console.log(reciever);

    setViewingChat(true);
    setMessages(messages);
    setMatchInView(matchId);
    setReciever(reciever.id);
    setRecieverName(reciever.first_name);
  }

  return (
    <div className="browse">
      {/* matching modal */}
      {justMatchedId && (
        <MatchModal
          currentUserId={currentUser.id}
          matchedUserId={justMatchedId}
          show={showMatch}
          onClose={() => {
            setShowMatch(false);
          }}
        />
      )}

      <div className="browse-matches">
        <div className="profile" onClick={() => navigate("/profile")}>
          <img src={logo} alt="here is some alt text" className="profile-img" />
          <img
            src={currentUser.profile_img}
            alt="profile pic"
            className="profile-img"
          ></img>
          <h1>{currentUser.first_name + " " + currentUser.last_name}</h1>
        </div>
        <div className="conversations">
          <div
            className="conversations-dropdown"
            onClick={handleConversationClick}
          >
            <span className="dropdown-arrow">↑</span> Conversations{" "}
            <span className="recent">(Recent)</span>
          </div>
          <div
            className={`conversations  ${
              isShowingConversations ? "" : "hidden"
            }`}
          >
            {matches.map((data) => (
              <Conversation data={data} raiseClick={onViewChat} />
            ))}
          </div>
        </div>
      </div>
      <div className="browse-right">
        {viewingChat ? (
          <ChatModal
            raiseClick={() => setViewingChat(false)}
            matchId={matchInView}
            senderId={parseInt(userId)}
            recieverId={reciever}
            senderName={currentUser.first_name}
            recieverName={recieverName}
          />
        ) : (
          <ConnectionModal
            user={user}
            onDislike={handleDislike}
            onLike={handleLike}
          />
        )}
      </div>
    </div>
  );
};

export default Browse;
