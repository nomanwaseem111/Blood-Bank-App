
import SignIn from "./Components/Signin/Signin";
import SignUp from "./Components/Signup/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Donor from "./Components/Donor's/Donor";
import Profile from "./Components/Profile/Profile";
import NavBar from './Components/NavBar/NavBar'
import DashBoard from './Components/DashBoard/DashBoard'


function App() {

  return (
    <>

      <BrowserRouter>
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/donor" element={<Donor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<DashBoard />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
