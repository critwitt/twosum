import logo from "../images/png/logo-no-background.png"

function Conversation({ data, raiseClick }) {
  const {first_name, last_name, profile_img} = data;
  
  console.log(data);
    return (
        <div onClick={raiseClick} className="conversation">
        <img alt="twosum logo" className="conversation-image" src={profile_img || logo} />
        <div className="conversation-description">
          {/* FILL THIS UP DYNAMICALLY */}
          <h1>{first_name} {last_name}</h1>
          {/* FILL THIS UP DYNAMICALLY */}
          <h2>hey, what are you up to?</h2>
        </div>
      </div>
    );
}

export default Conversation;