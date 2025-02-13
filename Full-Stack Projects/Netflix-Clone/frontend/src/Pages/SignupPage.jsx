import React from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <div className='h-screen w-full hero-bg'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
            <Link to={"/"}>
            <img src='/netflix-logo.png' alt='logo' className='w-52' />
            </Link>
        </header>

        <div className='flex justify-center items-center mt-20 mx-3'>
            <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                <h1 className='text-center text-white text-2xl font-bold mb-4'>
                    Sign Up
                </h1>
            </div>
        </div>
    </div>
  )
}

export default SignupPage