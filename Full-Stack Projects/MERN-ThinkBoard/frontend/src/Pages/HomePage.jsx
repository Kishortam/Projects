
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI';
import NoteCard from '../Components/NoteCard';


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/notes");
        console.log(response.data);
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching notes:', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }
        else {
          toast.error('Error fetching notes');
        }
      } finally{
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage