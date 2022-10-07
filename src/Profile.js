import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [desiredSex, setDesiredSex] = useState("");
  const [values, setValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });
  let fileInput = React.createRef();
  useEffect(() => {
    fetch(`http://localhost:9292/last-user`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  function handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let infile = e.target.files[0];
    reader.onloadend = () => {
      setValues({ ...values, picFile: infile, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(infile);
  }
  function handleEditProfileSubmit(e) {
    e.preventDefault();
    console.log(values.imagePreviewUrl);
    fetch(`http://localhost:9292/users-edit-profile/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile_img: values.imagePreviewUrl
          ? values.imagePreviewUrl
          : userData.profile_img,
        first_name: e.target["first_name"].value,
        last_name: e.target["last_name"].value,
        age: e.target["age"].value,
        bio: e.target["bio"].value,
        desired_sex: desiredSex,
      }),
    });
  }
  function handleDesiredSexBtnClick(e) {
    setDesiredSex(e.target.value);
  }
  function handleDeleteAccount() {
    fetch(`http://localhost:9292/users/${userData.id}`, {
      method: "DELETE",
      "Content-Type": "application/json",
    }).then((r) => r.json());
    navigate("/");
  }
  return (
    <div className="edit-profile">
      <div className="edit-profile-sidebar">
        <div className="profile" onClick={() => navigate("/browse")}>
          <div> &#60;</div>
          <img
            src={
              values.imagePreviewUrl
                ? values.imagePreviewUrl
                : userData.profile_img
            }
            alt="No logo"
            className="profile-img"
          ></img>
          {/* FILL THIS UP DYNAMICALLY */}
          <h1>{userData.first_name + " " + userData.last_name}</h1>
        </div>
        <div className="edit-profile-sidebar-buttons">
          <div className="edit-profile-btn active">Edit Profile</div>
          <div className="log-out-btn" onClick={() => navigate("/")}>
            Log Out
          </div>
          <div className="delete-account-btn" onClick={handleDeleteAccount}>
            Delete Account
          </div>
        </div>
      </div>
      <div className="edit-profile-right">
        <h1>EDIT PROFILE</h1>
        <div
          className="edit-profile-right-picture"
          onClick={() => fileInput.current.click()}
        >
          <img
            src={
              values.imagePreviewUrl
                ? values.imagePreviewUrl
                : userData.profile_img
            }
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="edit-profile-right-content">
          <form onSubmit={handleEditProfileSubmit}>
            <p>First: </p>
            <input
              type="text"
              name="first_name"
              defaultValue={userData.first_name}
            ></input>
            <p>Last: </p>
            <input
              type="text"
              name="last_name"
              defaultValue={userData.last_name}
            ></input>
            <p>Age: </p>
            <input type="number" name="age" defaultValue={userData.age}></input>
            <p>Bio: </p>
            <input type="text" name="bio" defaultValue={userData.bio}></input>
            <p>Into: </p>
            <div className="desired-sexes">
              <button
                className="desired-sex"
                value="male"
                onClick={handleDesiredSexBtnClick}
              >
                MEN
              </button>
              <button
                className="desired-sex"
                value="female"
                onClick={handleDesiredSexBtnClick}
              >
                WOMEN
              </button>
              <button
                className="desired-sex"
                value="all"
                onClick={handleDesiredSexBtnClick}
              >
                ALL
              </button>
            </div>
            <input
              type="text"
              name="looking-for"
              defaultValue={userData.desired_sex}
            ></input>
            <button type="submit">Add Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
