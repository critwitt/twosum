import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPeopleGroup,
  faComment,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar-background">
      <div className="navbar">
        <div className="navbar-left">
          <li>
            <img src="" className="navbar-logo"></img>
          </li>

          <li>
            <FontAwesomeIcon className="navbar-icon" icon={faHeart} />
            Explore
          </li>
          <li>
            <FontAwesomeIcon className="navbar-icon" icon={faPeopleGroup} />
            Matches
          </li>
          <li>
            {" "}
            <FontAwesomeIcon className="navbar-icon" icon={faComment} />
            Messages
          </li>
        </div>
        <div className="navbar-right">
          <li>
            {" "}
            <FontAwesomeIcon className="navbar-icon" icon={faUser} />
            Profile
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
