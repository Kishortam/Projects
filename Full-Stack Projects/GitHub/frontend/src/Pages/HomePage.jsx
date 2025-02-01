
import Search from '../Components/Search'
import SortRepos from '../Components/SortRepos'
import ProfileInfo from '../Components/ProfileInfo'
import Repos from '../Components/Repos'
import Spinner from '../Components/Spinner'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [sortType, setSortType] = useState("forks");

    const getUserProfileAndRepos = useCallback(async () => {
        setLoading(true);
        try {
            // get user profile
            const userRes = await fetch("https://api.github.com/users/Kishortam");
            const userProfile = await userRes.json(); // convert response to json
            setUserProfile(userProfile);
            console.log(userProfile);

            // get user repos
            const reposRes = await fetch(userProfile.repos_url);
            const repos = await reposRes.json(); // convert response to json
            setRepos(repos);
            console.log(repos);

        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }, [])


    useEffect(()=>{
        getUserProfileAndRepos();
    },[getUserProfileAndRepos])

  return (
    <div className='m-4'>
        <Search/>
        <SortRepos/>

        <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
            {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

            {repos.length > 0 && !loading && <Repos repos={repos} />}


            {/* spinner component to show loading */}
			{loading && <Spinner />}
        </div>
    </div>
  )
}

export default HomePage