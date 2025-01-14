import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/auth/Home/Homepage";
import SignUpPage from "./pages/auth/Signup/SignUpPage";
import LoginPage from "./pages/auth/Login/LoginPage";
import Sidebar from "./components/common/SideBar";
import RightPanel from "./components/common/RightPanel";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationPage from "./pages/auth/notification/NotificationPage";
import { Toaster } from "react-hot-toast";
import { useQueries, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {

  const {data:authUser, isLoading} = useQuery({
    // we use querykey to give a unique name to our query and refer to it later
    queryKey : ["authUser"],
    queryFn : async () =>{
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok){
          throw new Error(data.Error || "Something went wrong");
        }
        console.log("authUser is here: ", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry : false,
  });

  // if is loading
  if(isLoading){
    return(
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg"/>
      </div>
    )
  }

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* common component, because it is not wrapped with the routes */}
      {authUser && <Sidebar/>}
      <Routes>
        {/* if user is authenticated navigate it to home page else login page */}
        <Route path='/' element={authUser ? <Homepage/> : <Navigate to="/login"/> }/>
        {/* if user is not authenticated navigate it to signup page else homepage*/}
				<Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to="/"/> } />
        {/* if user is not authenticated navigate it to login page else homepage*/}
				<Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/> } />
        {/* if user is authenticated navigate it to notification page else login page*/}
        <Route path="/notifications" element={authUser ? <NotificationPage/> : <Navigate to="/login"/>}/>
        {/* if user is authenticated navigate it to profile page else login page*/}
        <Route path='/profile/:username' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
      </Routes>
      {authUser && <RightPanel/>}
        {/* if user is authenticated navigate it to notification page else login page*/}
      <Toaster/>
    </div>
  );
}

export default App;
