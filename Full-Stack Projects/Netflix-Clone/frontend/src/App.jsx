import { Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./Pages/Home/HomePage"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import Footer from "./Components/Footer"

import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./Store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import WatchPage from "./Pages/WatchPage"
import SearchPage from "./Pages/SearchPage"
import SearchHistoryPage from "./Pages/HistoryPage"
import NotFoundPage from "./Pages/404"



function App() {

  const {user, isCheckingAuth, authCheck} = useAuthStore();
  console.log("auth user is here: ", user);

  useEffect(()=>{
    authCheck();
  },[authCheck]);

  // if it is checking auth then show loader
  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center h-full bg-black">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      {/* if user is not authenticated then show signup and login else navigate to homepage */}
      <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to="/"/>}/>
      <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
      <Route path="/watch/:id" element={user ? <WatchPage/> : <Navigate to="/login"/>}/>
      <Route path="/search" element={user ? <SearchPage/> : <Navigate to="/login"/>}/>
      <Route path="/history" element={user ? <SearchHistoryPage/> : <Navigate to="/login"/>}/>
      <Route path="/*" element={<NotFoundPage/>}/>
    </Routes>

    <Footer/>

    <Toaster/>
    </>
  )
}

export default App
