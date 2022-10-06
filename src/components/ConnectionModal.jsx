import logo from "../images/png/logo-no-background.png"
import ProfileCard from "../ProfileCard";

function ConnectionModal({user, onDislike, onLike}) {
    return (
        <div>
        {/* MAKE THIS DROP DOWN TO A POPUP MODAL THAT SHOWS FILTERS */}
        <button>Filters</button>
        <img src={logo} alt="twosum logo" className="two-sum-logo"></img>
        <div className="profile-card">
          <ProfileCard user={user} />
          {/* FILL THIS UP DYNAMICALLY WITH ACTUAL PEOPLE AND THEIR INFO */}
        </div>
        <div className="browse-buttons">
          <button className="dislike" onClick={onDislike}>
            X
          </button>
          <button className="like" onClick={onLike}>
            ✓
          </button>
        </div>
        </div>
    );
}

export default ConnectionModal;