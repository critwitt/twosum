import React, { useState, useEffect } from "react";
import "./MatchModal.css";
const MatchModal = ({ currentUserId, matchedUserId, show, onClose }) => {
  const [matchedUser, setMatchedUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:9292/users/${matchedUserId}`)
      .then((r) => r.json())
      .then((user) => setMatchedUser({ ...user }));
    fetch(`http://localhost:9292/users/${currentUserId}`)
      .then((r) => r.json())
      .then((user) => setCurrentUser({ ...user }));
  }, []);
  console.log(currentUser);
  if (!show) return null;

  return (
    <div className={`match-modal`}>
      <h1>It's a Match!</h1>
      <h2>You and {matchedUser.first_name} have liked each other.</h2>
      <img className="image-of-you" src={currentUser.profile_img}></img>
      <img className="image-of-match" src={matchedUser.profile_img}></img>
      <div className="button-container">
        <button onClick={onClose}>Keep Swiping</button>
      </div>
    </div>
  );
};

export default MatchModal;
