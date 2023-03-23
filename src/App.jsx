import { useState } from "react";
import "./App.css";
import SignIn from "./Components/Signin/Signin";
import SignUp from "./Components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";




function App() {
 
  return (
    <>
    
    <BrowserRouter>
  
      <Header />
     <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
