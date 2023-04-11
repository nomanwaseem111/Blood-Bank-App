
import SignIn from "./Components/Signin/Signin";
import SignUp from "./Components/Signup/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Donor from './Components/Donor/Donor'
import Register from "./Components/RegisterDonor/Register";
import {ProtectedRoute} from './Route/PrivateRoute'
import Dashboard from "./Components/DashBoard/Dashboard";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (
    <>

      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoute/>}>
          <Route path="/donor" element={<Donor />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

</Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
