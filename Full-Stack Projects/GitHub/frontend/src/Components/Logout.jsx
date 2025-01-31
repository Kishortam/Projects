import { MdLogout } from "react-icons/md";
// import { useAuthContext } from "../context/AuthContext";
// import { toast } from "react-hot-toast";
// TODO Implement Logout functionality

const Logout = () => {
	// const { authUser, setAuthUser } = useAuthContext();

	// const handleLogout = async () => {
	// 	try {
	// 		const res = await fetch("/api/auth/logout", { credentials: "include" });
	// 		const data = await res.json();
	// 		console.log(data);
	// 		setAuthUser(null);
	// 	} catch (error) {
	// 		toast.error(error.message);
	// 	}
	// };

	return (
		<>
			{/* <img src={authUser?.avatarUrl} className='w-10 h-10 rounded-full border border-gray-800' /> */}
            <img src={"https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"} alt="" 
            className="w-10 h-10 rounded-full border border-gray-800"/>

			<div className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'>
				<MdLogout size={22} />
			</div>
		</>
	);
};

export default Logout;