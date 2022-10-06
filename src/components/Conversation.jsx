import logo from "../images/png/logo-no-background.png";

function Conversation({ data, raiseClick }) {
  const match = data[0];
  const messages = data[1];
  const reciever = data[2];

  function renderFinalMessage() {
    return "Start the conversation!";
  }
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
        {/* FILL THIS UP DYNAMICALLY */}
        <h1>
          {reciever.first_name} {reciever.last_name}
        </h1>
        {/* FILL THIS UP DYNAMICALLY */}
        <h2>{renderFinalMessage()}</h2>
      </div>
    </div>
  );
}

export default Conversation;
