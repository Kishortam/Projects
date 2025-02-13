import { Route, Routes } from "react-router-dom"

import HomePage from "./Pages/Home/HomePage"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import Footer from "./Components/Footer"



function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>

    <Footer/>
    </>
  )
}

export default App
