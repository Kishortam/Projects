import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa"
import { useAuthContext } from "../../Context/AuthContext";


const LikeProfile = ({userProfile}) => {

    const {authUser} = useAuthContext();

    // check if user is authenticated and if it is own profile
    const isOwnProfile = authUser?.username === userProfile.login;

    const handleLikeProfile = async() =>{
        // send request to our server
        try {
            const res = await fetch(`/api/users/like/${userProfile.login}`,{
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

// if it is not authenticated or it is own profile then return null
    if(!authUser || isOwnProfile) return null;

  return (
    <button 
    className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
    onClick={handleLikeProfile}
    >
      <FaHeart size={16} />
      Like Profile
    </button>
  )
}

export default LikeProfile