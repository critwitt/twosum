import React, { useState } from "react";
import "./CreateAccount.css";
import logo from "./images/png/logo-color.png";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [mm, setMm] = useState("");
  const [dd, setDd] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState("");
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    imagePreviewUrl: "",
    picFIle : null
  })

  let fileInput = React.createRef()

  function handleShowMeClick(e) {
    e.preventDefault();
    setInterests(e.target.value);
  }

  function handleGenderClick(e) {
    e.preventDefault();
    setGender(e.target.value);
  }

  function addPics(){
    fileInput.current.click();
  }

function handleImageChange(e){
  e.preventDefault();
  let reader = new FileReader();
  let infile = e.target.files[0];
  reader.onloadend = () =>{
    setValues({ ...values,
      picFIle: infile,
      imagePreviewUrl : reader.result

    })
  }
  reader.readAsDataURL(infile);
}

  function handleSubmit(newUser) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    fetch("", options)
      .then((r) => r.json())
      .then((data) => console.log(data));

    console.log(newUser);
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
            onSubmit={() => {
              const newUser = {
                id: "",
                firstName: firstName,
                birthday: `${mm}/${dd}/${yyyy}`,
                gender: gender,
                showMe: interests,
                email: email,
              };
              handleSubmit(newUser);
            }}
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
              <button onClick={(e) => { handleGenderClick(e)}} value="man">
                Man
              </button>
              <button onClick={(e) => { handleGenderClick(e)}} value="woman">
                Woman
              </button>
              <button onClick={(e) => { handleGenderClick(e)}} value="other">
                Other
              </button>
            </div>
            <p className="create-account-text-label">Show Me</p>
            <div className="group-inputs">
              <button onClick={(e) => { handleShowMeClick(e)}} value="men">
                Men
              </button>
              <button onClick={(e) => {handleShowMeClick(e)}} value="women">
                Women
              </button>
              <button onClick={(e) => { handleShowMeClick(e)}} value="everyone">
                Everyone
              </button>
            </div>
            <p className="create-account-text-label">Email Address</p>
            <input
              type="text"
              name="email"
              placeholder="theemailyousubmitted@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </form>
          <form className=" create-account-right-form">
            <p className="create-account-text-label">Profile Photo</p>
            <div className="pictures"  onClick={() => addPics()}>
              <input
              className="picture"
              type="file"
              accept="image/*"
              onChange = {handleImageChange}
              ref={fileInput}
              />
              <img
              src={values.imagePreviewUrl }
              alt='...'/>
              <input
              className="picture"
              type="file"
              accept="image/*"
              onChange = {handleImageChange}
              ref={fileInput}/>
               {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
              className="picture"
              type="file"
              accept="image/*"
              onChange = {handleImageChange}
              ref={fileInput}/>
               {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
              className="picture"
              type="file"
              accept="image/*"
              onChange = {handleImageChange}
              ref={fileInput}/>
               {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
              className="picture"
              type="file"
              accept="image/*"
              onChange = {handleImageChange}
              ref={fileInput}/>
               {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}
              <input
              className="picture"
              type="file"
              accept="image/*"
              onChange = {handleImageChange}
              ref={fileInput}/>
               {/* <img
              src={imagePreviewUrl}
              alt='...'/> */}

            </div>
            <p className="pictures-description">
              Add at least one photo to continue
            </p>
          </form>
        </div>
        <button
          className="submit-create-account-btn"
          onClick={() => navigate("/browse")}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
