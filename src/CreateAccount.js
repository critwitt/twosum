import React, { useState, useEffect } from "react";
import "./CreateAccount.css";
import logo from "./images/png/logo-color.png";
import { useNavigate } from "react-router-dom";

const CreateAccount = ({ currentUser }) => {
  useEffect(() => {
    fetch(`http://localhost:9292/users-data/${currentUser.email}`)
      .then((r) => r.json())
      .then((id) => {
        currentUser.id = id;
      });
  }, []);

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [mm, setMm] = useState("");
  const [dd, setDd] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [gender, setGender] = useState("");
  const [desiredSex, setDesiredSex] = useState("");
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

  function handleSubmit(e) {
    e.preventDefault();
    currentUser["first_name"] = firstName;
    currentUser["age"] = 14;
    currentUser["gender"] = gender;
    currentUser["desired_sex"] = desiredSex;
    fetch(`http://localhost:9292/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    }).then((r) => r.json());
    navigate("/browse");
  }

  return (
    <div className="create-account">
      {/* MAKE SURE TO HAVE THIS FORM BE USED TO CREATE A NEW USER IN BACKEND*/}
      <div className="create-account-navbar">
        <img src={logo} alt="TwoSum" className="create-account-logo"></img>
      </div>
      <div className="create-account-content">
        <h1 className="create-account-header">CREATE ACCOUNT</h1>
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <p className="create-account-text-label">Birthday</p>
            <div className="group-inputs">
              <input
                type="text"
                name="month"
                placeholder="MM"
                className="group-input"
                value={mm}
                onChange={(e) => setMm(e.target.value)}
              ></input>
              <input
                type="text"
                name="day"
                placeholder="DD"
                className="group-input"
                value={dd}
                onChange={(e) => setDd(e.target.value)}
              ></input>
              <input
                type="text"
                name="year"
                placeholder="YYYY"
                className="group-input"
                value={yyyy}
                onChange={(e) => setYyyy(e.target.value)}
              ></input>
            </div>
            <p className="create-account-text-label">Gender</p>
            <div className="group-inputs">
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="man"
              >
                Man
              </button>
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="woman"
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
              placeholder={currentUser.email}
              value={currentUser.email}
              disabled
            ></input>
            <p className="create-account-text-label">Profile Photo</p>
            <div className="pictures" onClick={() => addPics()}>
              <input
                className="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
              />
              <img src={values.imagePreviewUrl} alt="..." />
              <input
                className="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
              />
              {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
                className="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
              />
              {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
                className="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
              />
              {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
                className="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
              />
              {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
                className="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
              />
              {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
            </div>
            <p className="pictures-description">
              Add at least one photo to continue
            </p>
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
