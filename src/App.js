import React from "react";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Browse from "./Browse";
import Chat from "./Chat";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path="/browse"
          element={
            <>
              <Browse />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Chat />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
