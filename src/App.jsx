import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Component/signup.jsx";
import Admin from "./Component/adminpage.jsx";
import Login from "./Component/Login.jsx";
import  Frontpage from "./Component/frontpage.jsx"; 
import Events from "./Component/event.jsx";
import Memberapprove from "./Component/memapprove.jsx";
import "./App.css";
import "./login.css";
import "./sign.css";
import "./event.css";
function App() {
  return (
    <>
    <title>Community Management System</title>
      <Router>
        <Routes>
          <Route path="/" element={<Frontpage />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/memapprove" element={<Memberapprove />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
  
    </>
  );
}
export default App;
