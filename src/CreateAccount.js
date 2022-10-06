import React, { useState, useEffect } from 'react';
import "./CreateAccount.css";
import logo from "./images/png/logo-color.png";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { createUser } from "./services/backendServices";

const CreateAccount = ({ user }) => {

  useEffect(() => {
    if(!user.password || !user.email) {
      navigate("/");
    }
  }, [])

  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [desiredSex, setDesiredSex] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState(user.password)
  const [email, setEmail] = useState(user.email)
  
  const [values, setValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });

  let fileInput = React.createRef();

  function handleShowMeClick(e) {
    e.preventDefault();
    setDesiredSex(e.target.value);
  }

  function handleGenderClick(e) {
    e.preventDefault();
    setGender(e.target.value);
  }

  function addPics() {
    fileInput.current.click();
  }

  function handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let infile = e.target.files[0];
    reader.onloadend = () => {
      setValues({ ...values, picFile: infile, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(infile);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      gender,
      email,
      age,
      bio,
      profile_img: values.imagePreviewUrl,
      desired_sex: desiredSex,
      username,
      password,
    }

    fetch('http://localhost:9292/users', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(r => r.json())
    .then(data => {
      cookies.set('userId', data.id, {path: "/"})
      navigate('/browse')
    })
  }

  return (
    <div className="create-account">
      {/* MAKE SURE TO HAVE THIS FORM BE USED TO CREATE A NEW USER IN BACKEND*/}
      <div className="create-account-navbar">
        <img src={logo} alt="TwoSum" className="create-account-logo"></img>
      </div>
      <div className="create-account-content">
        <h1 className="create-account-header">CREATE ACCOUNT FOR {username}</h1>
        <div className="create-account-forms">
          <form
            className="create-account-left-form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <p className="create-account-text-label">First Name</p>
            <input
              type="text"
              name="first-name"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>

            <p className="create-account-text-label">Last Name</p>
            <input
              type="text"
              name="last-name"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>

            <p className="create-account-text-label">Age</p>
            <div className="group-inputs">
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="group-input"
                onChange={(e) => setAge(e.target.value)}
              ></input>
            </div>

            <p className="create-account-text-label">Gender</p>
            <div className="group-inputs">
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="male"
              >
                Man
              </button>
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="female"
              >
                Woman
              </button>
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="other"
              >
                Other
              </button>
            </div>
            <p className="create-account-text-label">Show Me</p>
            <div className="group-inputs">
              <button
                onClick={(e) => {
                  handleShowMeClick(e);
                }}
                value="men"
              >
                Men
              </button>
              <button
                onClick={(e) => {
                  handleShowMeClick(e);
                }}
                value="women"
              >
                Women
              </button>
              <button
                onClick={(e) => {
                  handleShowMeClick(e);
                }}
                value="everyone"
              >
                Everyone
              </button>
            </div>
            <p className="create-account-text-label">Email Address</p>
            <input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              // disabled
            ></input>
            <p className="create-account-text-label">Add Bio</p>
            <input
              type="text"
              name="add-bio"
              placeholder="A little bit about yourself"
              onChange={(e) => setBio(e.target.value)}
            ></input>
            <p className="pictures-description">Add a profile picture</p>

            <p className="create-account-text-label" style={{ textAlign : "center" }}>Click The Square To Add A Profile Photo</p>

            <div className="pictures" onClick={() => addPics()}>
              <img className="picture" src={values.imagePreviewUrl} alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
                style={{ display: "none" }}
              />
            </div>

            <button className="submit-create-account-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
