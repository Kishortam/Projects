import { useState } from "react";
import { useContentStore } from "../Store/content";
import Navbar from "../Components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../Utils/constants";


const SearchPage = () => {
    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");

    const [results, setResults] = useState([]);
    const {setContentType} = useContentStore();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === "movie" ? setContentType("movie") : setContentType("tv");
        setResults([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            setResults(response.data.content);
        } catch (error) {
            if(error.response.status === 404) {
                toast.error("Nothing found, make sure you are searching under the right category");
            }
            else{
                toast.error("An error occurred, please try again");
            }
        }
    };

    console.log(results);

  return (
    <div className="bg-black min-h-screen text-white">
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center gap-3 mb-4">
                {/* Tab buttons */}
                <button
                    className={`px-4 py-2 rounded-md ${
                        activeTab === "movie" ? "bg-red-600" : "bg-gray-600"
                    }`}
                    onClick={() => handleTabClick("movie")}
                >
                    Movies
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${
                        activeTab === "tv" ? "bg-red-600" : "bg-gray-600"
                    }`}
                    onClick={() => handleTabClick("tv")}
                >
                    TV Shows
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${
                        activeTab === "person" ? "bg-red-600" : "bg-gray-600"
                    }`}
                    onClick={() => handleTabClick("person")}
                >
                    Person
                </button>
            </div>

            {/* Search bar */}
            <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
                <input type="text" 
                placeholder={"Search..." + activeTab} 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full p-2 rounded-md bg-gray-800 text-white" 
                />
                 <button className=" bg-red-600 hover:big-red-700 p-2 text-white rounded">
                <Search className="size-6"/>
                </button>
            </form>

            {/* Search results */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{results.map((result) => {
						if (!result.poster_path && !result.profile_path) return null; // if there is no poster or profile path then return null

						return (
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='max-h-96 rounded mx-auto'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>
           
        </div>
    </div>
  )
}

export default SearchPage;