
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI';
import NoteCard from '../Components/NoteCard';
import api from '../Lib/axios';
import NotesNotFound from '../Components/NotesNotFound';


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // after creating the api instance, we can use it to make the request
        // const response = await axios.get("http://localhost:5001/api/notes");  // old code, we have created the api instance 
        const response = await api.get("/notes");
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

        {/* if no notes found */}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage