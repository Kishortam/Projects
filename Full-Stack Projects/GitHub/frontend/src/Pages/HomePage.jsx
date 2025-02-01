
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

    const getUserProfileAndRepos = useCallback(async (userName = "Kishortam") => {
        setLoading(true);
        try {
            // get user profile
            const userRes = await fetch(`https://api.github.com/users/${userName}`);
            const userProfile = await userRes.json(); // convert response to json
            setUserProfile(userProfile);

            // get user repos
            const reposRes = await fetch(userProfile.repos_url);
            const repos = await reposRes.json(); // convert response to json
            setRepos(repos);

            return {userProfile, repos};

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


    // search functinality
    const onSearch = async(e, userName) => {
        e.preventDefault();

        setLoading(true);
        setRepos([]);
        setUserProfile(null);
        
        // get userprofile and repos of given username
        const {userProfile, repos} = await getUserProfileAndRepos(userName);
        setUserProfile(userProfile);
        setRepos(repos);
        setLoading(false);
    }

    // sort functionality
    const onSort = (sortType) => {
        if(sortType === "recent"){
            repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // descending order, recent first
        }
        else if(sortType === "stars"){
            repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // descending order, most stars first
        }
        else if(sortType === "forks"){
            repos.sort((a, b) => b.forks_count - a.forks_count); // descending order, most forks first
        }
        setSortType(sortType);
        setRepos([...repos]);
    }

  return (
    <div className='m-4'>

        <Search onSearch={onSearch}/>

        {/* sort repos */}
        {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}

        <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>

            {/* profile info */}
            {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

            {/* repos */}
            {!loading && <Repos repos={repos} />}


            {/* spinner component to show loading */}
			{loading && <Spinner />}
        </div>
    </div>
  )
}

export default HomePage