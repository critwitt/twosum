import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/png/logo-black.png";
import "./LoginModal.css"

const LoginModal =  (props) =>{
    const navigate = useNavigate();


    function handleSubmit(e){
      e.preventDefault()

    
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
          <input type="text" name="username" placeholder="Username"></input>
          <input type="text" name="password" placeholder="Password"></input>
          <button type="submit">Log In</button>
        </form>
      </div>
  </div>
    )
}

export default LoginModal;