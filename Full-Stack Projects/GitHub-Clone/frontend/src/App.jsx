import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Sidebar from "./Components/Sidebar"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import ExplorePage from "./Pages/ExplorePage"
import LikesPage from "./Pages/LikesPage"
import { useAuthContext } from "../Context/AuthContext"



function App() {
  const {authUser, loading} = useAuthContext();
  console.log("Authenticated user:", authUser);

  if(loading) return null;

  return (
    <div className="flex">
      <Sidebar/>

      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/likes" element={<LikesPage />} /> */}

          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/explore" element={authUser ? <ExplorePage /> : <Navigate to="/login" />} />
          <Route path="/likes" element={authUser ? <LikesPage /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster/>
      </div>
    </div>
  )
}

export default App
