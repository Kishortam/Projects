import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()){
      toast.error("Please enter title and content");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/notes", { title, content });
      // console.log(response.data);
      toast.success("Note created successfully");
      navigate("/");
      // setNotes(response.data);
      // setLoading(false);
    } catch (error) {
      console.log("Error creating note:", error);
      if (error.response?.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.",{
          duration: 4000,
          icon: '🚨',
        });
      }
      else{
        toast.error("Error creating note"); 
      }
      toast.error("Error creating note");
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5' />
          Back to Notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2-xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type='text'
                  className='input input-bordered'
                  placeholder='Note Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                </div>

                <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  className='textarea textarea-bordered h-32'
                  placeholder='What is on your mind?'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                </div>

                <div className='card-actions justify-end'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
                </div>
                </form>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage