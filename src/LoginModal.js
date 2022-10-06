import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/png/logo-black.png";
import "./LoginModal.css"
import Cookies from 'universal-cookie';

const LoginModal =  (props) =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const cookies = new Cookies()
    const user = {
      username: username,
      password: password
    }

    function handleSubmit(e){
      e.preventDefault()
      fetch(`http://localhost:9292/users/login`, {
        method : "POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
      })
      .then(r => r.json())
      .then(data => {
        console.log(data);
        cookies.set('userId', data.id, {path: "/"})
        navigate('/browse')
      })
    
    
    }
    
    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) props.onClose();
      };
      if (!props.userLogin) {
        return null;
      }
      
    return(
        <div className = {`modal ${props.userLogin ? "show" : ""}`}
      onClick={props.onClose}
    >
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-btn-container">
          <button className="delete-btn" onClick={props.onClose}>
            X
          </button>
        </div>

        <div className="modal-header">
          <img src={logo} className="login-logo"></img>
          <h4>Log In</h4>
         </div>
        <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="username" placeholder="Username" value={username}onChange={(e) => setUsername(e.target.value)}></input>
          <input type="text" name="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)}></input>
          <button type="submit">Log In</button>
        </form>
      </div>
  </div>
    )
}

export default LoginModal;