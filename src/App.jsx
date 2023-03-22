import { useState } from 'react'
import './App.css'
import SignIn from './Components/Signin/Signin'
import SignUp from './Components/Signup/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     {/* <SignUp/> */}
    <SignIn/>
    </div>
  )
}

export default App
