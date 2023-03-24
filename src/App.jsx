
import SignIn from "./Components/Signin/Signin";
import SignUp from "./Components/Signup/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Components/DashBoard/Dashboard";


function App() {

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
