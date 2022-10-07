import logo from "../images/png/logo-no-background.png";
import { useState, useEffect } from "react";
function Conversation({ data, raiseClick }) {
  const match = data[0];
  const messages = data[1];
  const reciever = data[2];
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9292/matches/${data[0]["id"]}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.length > 0) {
          setLastMessage(data[data.length - 1].message);
        } else {
          setLastMessage("Start the conversation!");
        }
      });
  }, []);

  return (
    <div
      onClick={() => raiseClick(messages, match.id, reciever)}
      className="conversation"
    >
      <img
        alt="twosum logo"
        className="conversation-image"
        src={reciever.profile_img || logo}
      />
      <div className="conversation-description">
        <h1>
          {reciever.first_name} {reciever.last_name}
        </h1>
        <h2>{lastMessage}</h2>
      </div>
    </div>
  );
}

export default Conversation;
