import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <img
        className="hero-profile"
        // WE HAVE TO CHANGE THE SOURCE BASED ON WHICH USER IS LOGGED IN
        src="https://res.cloudinary.com/teepublic/image/private/s--UymRXkch--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1570281377/production/designs/6215195_0.jpg"
      ></img>
      {/* THIS HAS TO BE CHANGED TO USER'S NAME WHEN THEY LOG IN */}
      <h1 className="hero-main-text">Welcome to TwoSum, User!</h1>
    </div>
  );
};

export default Hero;
