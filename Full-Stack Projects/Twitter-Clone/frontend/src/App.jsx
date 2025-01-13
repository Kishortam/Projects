import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/auth/Home/Homepage";
import SignUpPage from "./pages/auth/Signup/SignUpPage";
import LoginPage from "./pages/auth/Login/LoginPage";
import Sidebar from "./components/common/SideBar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/auth/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* common component, because it is not wrapped with the routes */}
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
				<Route path='/signup' element={<SignUpPage/>} />
				<Route path='/login' element={<LoginPage/>} />
        <Route path="/notifications" element={<NotificationPage/>}/>
        <Route path='/profile/:username' element={<ProfilePage/>} />

      </Routes>
      <RightPanel/>
    </div>
  );
}

export default App;
